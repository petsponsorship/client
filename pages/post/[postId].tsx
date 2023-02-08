import React from 'react';
import styles from '../../styles/Detail.module.css';

function Detail() {
  const arr = [1, 2, 3, 4];

  return (
    <main className={styles.main}>
      <section>
        <div>
          <img
            alt="대표 이미지"
            className={styles.titleimg}
            src="https://www.wooripet.co.kr/data/file/come3/thumb-1948775479_b24FmajJ_EF1D7C03-7C6C-4B6C-8C4E-C364005AFA68-74120D00-ED9F-463E-8221-7E53CEBBDE93_1400x933.jpg"
          />
        </div>
        <div className={styles.subimgdiv}>
          {arr.map((img) => (
            <img
              key={img}
              alt="추가 이미지"
              className={styles.subimg}
              src="https://blog.kakaocdn.net/dn/ckvsuY/btqTEM8B1TO/NLyNQcc1p2rK14vD7BLG3k/img.png"
            />
          ))}
        </div>
      </section>
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
      </section>
    </main>
  );
}

export default Detail;
