import React, { useRef } from 'react';
import styles from '../styles/Home.module.css';
import Card from '../component/Card.tsx';

function Main() {
  return (
    <>
      <div className={styles.adbox}>슬라이드</div>
      <div className={styles.categorybox}>
        <ul className={styles.list}>
          <li>
            <span className={styles.categorybtn}>강아지</span>
          </li>
          <li>
            <span className={styles.categorybtn}>고양이</span>
          </li>
          <li>
            <span className={styles.categorybtn}>기타</span>
          </li>
        </ul>
        <hr className={styles.line} />
      </div>
      <div className={styles.selectDiv}>
        <div>
          <input type="checkbox" />
          <span>입양 가능한 아이만 볼래요!</span>
        </div>
        <ul className={styles.selectlist}>
          <li>
            <span className={styles.select}>마감임박순</span>
          </li>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <li>
            <span className={styles.select}> 최신순</span>
          </li>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <li>
            <span className={styles.select}> 응원순</span>
          </li>
        </ul>
      </div>
      <Card />
    </>
  );
}

export default Main;
