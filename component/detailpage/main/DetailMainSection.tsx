import React from 'react';
import styles from '../main/DetailMainSection.module.css';
import ProgressBar from '../../ui/progressbar/ProgressBar';

function DetailMainSection() {
  const bar = 30;
  return (
    <main className={styles.container}>
      <div>
        <img
          alt="대표 이미지"
          className={styles.thumbnail}
          src="https://www.wooripet.co.kr/data/file/come3/thumb-1948775479_b24FmajJ_EF1D7C03-7C6C-4B6C-8C4E-C364005AFA68-74120D00-ED9F-463E-8221-7E53CEBBDE93_1400x933.jpg"
        />
      </div>
      <section className={styles.rightsection}>
        <div className={styles.flexdiv}>
          <h2>치타</h2>
          <span>후원기간 2022-02-01 ~ 2022-02-15</span>
        </div>
        <div className={styles.text}>
          <p>3살, 여아, 아비시니안</p>
          <p>중성화 완료</p>
        </div>
        <div className={styles.flexdiv}>
          <p>의료비 후원</p>
          <p>300,000원</p>
        </div>
        <ProgressBar value={bar} />
        <div className={styles.donationText}>
          <span>70명이 후원했어요!</span>
          <p>{bar}% 달성</p>
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
            <button className={styles.circleBtn}>
              <span>👏</span>
            </button>
            <span>응원하기</span>
          </div>
          <button>후원하기</button>
          <button>입양문의</button>
        </section>
      </section>
    </main>
  );
}

export default DetailMainSection;
