import React from 'react';
import styles from '../main/DetailMainSection.module.css';
import ProgressBar from '../../ui/progressbar/ProgressBar';
import { dataConverter } from '../functions';
import { instance } from '../../../apis/client';
import { useRouter } from 'next/router';

function DetailMainSection({ data }) {
const router = useRouter();
const postId = router.query;
  const detail = data?.data.post;
  const {
    adopt,
    age,
    amount,
    createdAt,
    etcDetail,
    expired,
    name,
    neutered,
    purpose,
    sex,
    species,
    sponsor,
    targetAmount,
    thumbnail,
  } = detail;

  const clickSupport = () => {
    instance.post("/like", postId).then((res)=>{
      console.log(res)
    })
  }

  return (
    <main className={styles.container}>
      <div>
        <img alt="대표 이미지" className={styles.thumbnail} src={thumbnail} />
        <div className={styles.editSection}>
          <p>수정</p>
          <span>|</span>
          <p>삭제</p>
        </div>
      </div>
      <section className={styles.rightsection}>
        <div className={styles.flexdiv}>
          <h2>{name}</h2>
          <span>후원기간 2022-02-01 ~ 2022-02-15</span>
        </div>
        <div className={styles.text}>
          <p>
            {dataConverter.age(age)}, {dataConverter.sex(sex)}, {dataConverter.species(species, etcDetail)}
          </p>
          <p>{neutered ? '중성화 완료' : '중성화 필요'}</p>
        </div>
        <div className={styles.flexdiv}>
          <p>{dataConverter.purpose(purpose)} 후원</p>
          <p>{dataConverter.targetAmount(targetAmount)}원</p>
        </div>
        <ProgressBar value={dataConverter.progress(amount, targetAmount)} />
        <div className={styles.donationText}>
          <span>{sponsor}명이 후원했어요!</span>
          <p>{dataConverter.progress(amount, targetAmount)}% 달성</p>
        </div>
        <section className={styles.btnSection}>
          <div className={styles.btn}>
            <button className={styles.circleBtn}>URL</button>
            <span>주소복사</span>
          </div>
          <div className={styles.btn}>
            <img src="/kakaologo.png" alt="카카오 로고" />
            <span>공유하기</span>
          </div>
          <div className={styles.btn}>
            <button className={styles.circleBtn} onClick={()=>clickSupport()}>
              <span>👏</span>
            </button>
            <span onClick={()=>clickSupport()}>응원하기</span>
          </div>
          <button>후원하기</button>
          {adopt ? <button>입양문의</button> : null}
        </section>
      </section>
    </main>
  );
}

export default DetailMainSection;
