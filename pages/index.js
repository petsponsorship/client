import React, { useRef } from 'react';
import styles from '../styles/Home.module.css';

function Main() {
  // const btnRef = useRef();
  // let btn = getElementsByClassName('btn');
  // const handleClick = (e) => {
  //   if (e.target.classList[1] === 'clicked') {
  //     e.target.classList.remove('clicked');
  //   } else {
  //     for (let i = 0; i < btnRef.length; i++) {
  //       btnRef[i].classList.remove('clicked');
  //     }
  //     e.target.classList.add('clicked');
  //   }
  // };

  // const init = () => {
  //   for (let i = 0; i < btnRef.length; i++) {
  //     btnRef[i].addEventListener('click', handleClick);
  //   }
  // };

  // init();
  return (
    <>
      <div className={styles.adbox}>슬라이드</div>
      <div className={styles.categorybox}>
        <ul className={styles.list}>
          <li>
            <span className={styles.categorybtn} ref={btnRef}>
              강아지
            </span>
          </li>
          <li>
            <span className={styles.categorybtn} ref={btnRef}>
              고양이
            </span>
          </li>
          <li>
            <span className={styles.categorybtn} ref={btnRef}>
              기타
            </span>
          </li>
        </ul>
        <hr className={styles.line} />
      </div>
    </>
  );
}

export default Main;
