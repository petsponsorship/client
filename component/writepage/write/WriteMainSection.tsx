import React, { useState } from 'react';
import styles from '../write/WriteMainSection.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';

function WriteMainSection() {
  interface IFormInput {
    thumbnail: File;
    name: string;
    age: number;
    species: '강아지' | '고양이' | '기타';
    etcDetail?: string;
    sex: '0' | '1' | boolean;
    neutered: boolean;
    targetAmount: number;
    purpose: 'medical' | 'food' | 'care' | 'funeral';
    adopt: boolean;
  }

  const today = new Date().toISOString().slice(0, 10);
  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    //DESC: 나이 모름: -1, 개월: 소수점 단위로 변환하여 서버 전송
    if (unit === '-1') {
      data.age = -1;
    } else if (unit === 'month') {
      data.age = Number(data.age) * 0.01;
    } else {
      data.age = Number(data.age);
    }

    data.sex === '0' ? (data.sex = false) : (data.sex = true);
    data.thumbnail = data.thumbnail[0];

    console.log(data);
  };
  const ageUnitArr = [
    { value: 'month', text: '개월' },
    { value: 'year', text: '만, 세' },
    { value: -1, text: '나이 모름' },
  ];

  const [unit, setUnit] = useState<string | undefined>();

  let url = 'https://liftlearning.com/wp-content/uploads/2020/09/default-image.png';
  if (watch('thumbnail') && watch('thumbnail').length !== 0) url = URL.createObjectURL(watch('thumbnail')[0]);

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <section>
        <img className={styles.thumbnail} src={url} />
        <div>
          <input type="file" accept="image/*" {...register('thumbnail', { required: true })} />
        </div>
      </section>
      <section className={styles.rightsection}>
        <div className={styles.flexdiv}>
          <p>등록일</p>
          <input type="date" value={today} disabled />
          <span>❗️ 후원은 등록일로부터 2주간 유지됩니다</span>
        </div>
        {/* 이름 */}
        <div className={styles.flexdiv}>
          <p>이름</p>
          <input {...register('name', { required: true, maxLength: 10 })} />
        </div>
        {/* 나이 */}
        <div className={styles.flexdiv}>
          <p>나이</p>
          <input type="number" disabled={unit === '-1'} {...register('age', { valueAsNumber: true, max: 30 })} />
          <span>
            {ageUnitArr.map((obj) => (
              <label key={obj.value}>
                <input type="radio" name="unit" value={obj.value} onChange={(e) => setUnit(e.target.value)} required />
                {obj.text}
              </label>
            ))}
          </span>
        </div>
        {/* 축종 */}
        <div className={styles.flexdiv}>
          <p>종 선택</p>
          <select name="species" {...register('species', { required: true })}>
            <option value="">종을 선택해주세요!</option>
            <option value="강아지">강아지</option>
            <option value="고양이">고양이</option>
            <option value="기타">직접 입력</option>
          </select>
          <input name="etcDetail" disabled={watch('species') !== '기타'} {...register('etcDetail')} />
        </div>
        {/* 성별 */}
        <div className={styles.flexdiv}>
          <p>성별</p>
          <label>
            <input type="radio" name="sex" value={0} {...register('sex')} />
            남아
          </label>
          <label>
            <input type="radio" name="sex" value={1} {...register('sex')} />
            여아
          </label>
          {/* 중성화 여부 */}
          <label>
            <input type="checkbox" {...register('neutered')} /> 중성화 여부
          </label>
        </div>
        {/* 목표 금액 */}
        <div className={styles.flexdiv}>
          <p>목표 금액</p>
          <input type="number" {...register('targetAmount', { required: true, valueAsNumber: true, max: 500 })} />
          <span>만 원</span>
        </div>
        {/* 후원 목적 */}
        <div className={styles.flexdiv}>
          <p>후원 목적</p>
          <select name="purpose" {...register('purpose', { required: true })}>
            <option value="">후원목적을 선택해주세요!</option>
            <option value="의료비">의료비</option>
            <option value="사료 및 간식">사료 및 간식</option>
            <option value="용품비">용품비</option>
            <option value="장례비">장례비</option>
          </select>
          {/* 입양 가능 여부 */}
          <label>
            <input type="checkbox" {...register('adopt')} />
            입양문의 받기
          </label>
        </div>
        <input type="submit" />
      </section>
    </form>
  );
}

export default WriteMainSection;
