import React, { useState } from 'react';
import styles from '../write/WriteMainSection.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AGE_UNIT_ARRAY, SEX_ARRAY } from '../../../helpers/constants';
import { dataConverter, getImgUpload } from '../../../helpers/functions';
export interface IFormInput {
  thumbnail: Promise<File> | File;
  name: string;
  age: number;
  species: '강아지' | '고양이' | '기타';
  etcDetail?: string;
  sex: '0' | '1' | '남아' | '여아' | boolean;
  neutered: boolean;
  targetAmount: number;
  purpose: 'medical' | 'food' | 'care' | 'funeral';
  adopt: boolean;
  content: string;
}

function WriteMainSection({ mutate }) {
  let url = 'https://liftlearning.com/wp-content/uploads/2020/09/default-image.png';
  const [unit, setUnit] = useState<string | undefined>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(url);
  const [file, setFile] = useState<File>();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setThumbnailUrl(URL.createObjectURL(file));
    }
  };

  const today = new Date().toISOString().slice(0, 10);
  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    data.thumbnail = await getImgUpload(file);
    data.age = dataConverter.unit(unit, data.age);
    data.sex = dataConverter.sex(data.sex);
    data.targetAmount = data.targetAmount * 10000;
    mutate(data);
  };

  return (
    <form className={styles.container} id="write" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <img className={styles.thumbnail} src={thumbnailUrl} />
        <div>
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e)} />
        </div>
      </section>
      <section className={styles.rightsection}>
        <div className={styles.flexdiv}>
          <p>등록일</p>
          <input type="date" value={today} disabled />
          <span>❗️ 후원은 등록일로부터 2주간 유지됩니다</span>
        </div>
        <div className={styles.flexdiv}>
          <p>이름</p>
          <input {...register('name', { required: true, maxLength: 10 })} />
        </div>
        <div className={styles.flexdiv}>
          <p>나이</p>
          <input type="number" disabled={unit === '-1'} {...register('age', { valueAsNumber: true, max: 30 })} />
          <span>
            {AGE_UNIT_ARRAY.map((obj) => (
              <label key={obj.value}>
                <input type="radio" name="unit" value={obj.value} onChange={(e) => setUnit(e.target.value)} required />
                {obj.text}
              </label>
            ))}
          </span>
        </div>
        <div className={styles.flexdiv}>
          <p>종 선택</p>
          <select name="species" {...register('species')} required>
            <option value="">종을 선택해주세요!</option>
            <option value="강아지">강아지</option>
            <option value="고양이">고양이</option>
            <option value="기타">직접 입력</option>
          </select>
          <input name="etcDetail" disabled={watch('species') !== '기타'} {...register('etcDetail')} />
        </div>
        <div className={styles.flexdiv}>
          <p>성별</p>
          {SEX_ARRAY.map((sex) => (
            <label key={sex.group}>
              <input type="radio" name="sex" value={sex.value} {...register('sex')} required />
              {sex.group}
            </label>
          ))}
          <label>
            <input type="checkbox" {...register('neutered')} /> 중성화 여부
          </label>
        </div>
        <div className={styles.flexdiv}>
          <p>목표 금액</p>
          <input type="number" {...register('targetAmount', { required: true, valueAsNumber: true, max: 500 })} />
          <span>만 원</span>
        </div>
        <div className={styles.flexdiv}>
          <p>후원 목적</p>
          <select name="purpose" {...register('purpose')} required>
            <option value="">후원목적을 선택해주세요!</option>
            <option value="medical">의료비</option>
            <option value="food">사료 및 간식</option>
            <option value="care">용품비</option>
            <option value="funeral">장례비</option>
          </select>
          <label>
            <input type="checkbox" {...register('adopt')} />
            입양문의 받기
          </label>
        </div>
      </section>
    </form>
  );
}

export default WriteMainSection;
