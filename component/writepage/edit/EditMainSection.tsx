import React, { useState } from 'react';
import styles from '../write/WriteMainSection.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AGE_UNIT_ARRAY, SEX_ARRAY } from '../../../helpers/constants';
import { dataConverter, getImgUpload } from '../../../helpers/functions';
import { IFormInput } from '../write/WriteMainSection';
import { imageApi } from '../../../apis/posts';

function EditMainSection({ mutate, detailData }) {
  const { adopt, age, createdAt, etcDetail, name, neutered, purpose, sex, species, targetAmount, thumbnail } =
    detailData.data.post;
  const [unit, setUnit] = useState<string | undefined>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(thumbnail);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailUrl(URL.createObjectURL(file));
      const resizingFile = await getImgUpload(file);
      const { data } = await imageApi({ img: resizingFile });
      setThumbnailUrl(data.imgUrl);
    }
  };

  const createDay = new Date(createdAt).toISOString().slice(0, 10);
  const { register, handleSubmit, watch } = useForm<IFormInput>({
    defaultValues: {
      name,
      species,
      neutered,
      targetAmount: targetAmount.toLocaleString(),
      purpose,
      adopt,
      etcDetail: etcDetail || '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    data.thumbnail = thumbnailUrl;
    data.age = dataConverter.unit(unit, data.age);
    data.sex = dataConverter.sex(data.sex);
    delete data.targetAmount;
    mutate(data);
  };

  return (
    <form className={styles.container} id="edit" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <img className={styles.thumbnail} src={thumbnailUrl} />
        <div>
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e)} />
        </div>
      </section>
      <section className={styles.rightsection}>
        <div className={styles.flexdiv}>
          <p>등록일</p>
          <input type="date" value={createDay} disabled />
          <span>❗️ 후원은 등록일로부터 2주간 유지됩니다</span>
        </div>
        <div className={styles.flexdiv}>
          <p>이름</p>
          <input {...register('name', { required: true, maxLength: 10 })} />
        </div>
        <div className={styles.flexdiv}>
          <p>나이</p>
          <input
            type="number"
            defaultValue={age !== -1 ? (Number.isInteger(age) ? age : age * 100) : null}
            disabled={unit === '-1'}
            {...register('age', { valueAsNumber: true, max: 30 })}
          />
          <span>
            {AGE_UNIT_ARRAY.map((obj) => (
              <label key={obj.value}>
                <input
                  type="radio"
                  name="unit"
                  value={obj.value}
                  onChange={(e) => setUnit(e.target.value)}
                  defaultChecked={
                    age === -1 ? obj.value === -1 : Number.isInteger(age) ? obj.value === 'year' : obj.value === 'month'
                  }
                  required
                />
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
          {SEX_ARRAY.map((s) => (
            <label key={s.group}>
              <input
                type="radio"
                name="sex"
                value={s.value}
                defaultChecked={sex ? s.value === 1 : s.value === 0}
                {...register('sex')}
                required
              />
              {s.group}
            </label>
          ))}
          <label>
            <input type="checkbox" {...register('neutered')} /> 중성화 여부
          </label>
        </div>
        <div className={styles.flexdiv}>
          <p>목표 금액</p>
          <input {...register('targetAmount', { required: true, valueAsNumber: true, max: 500 })} disabled />
          <span>원</span>
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

export default EditMainSection;
