import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Card from '../component/Card.tsx';
import axios from 'axios';

function Main() {
  async function fetchData() {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`).then((res) => setCards(res.data));
  }

  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  console.log('card===', cards);

  return (
    <article>
      <div className={styles.adbox}>슬라이드</div>
      <section>
        <div className={styles.categorybox}>
          <ul className={styles.list}>
            <li>
              <button className={styles.categorybtn}>전체</button>
            </li>
            <li>
              <button className={styles.categorybtn}>강아지</button>
            </li>
            <li>
              <button className={styles.categorybtn}>고양이</button>
            </li>
            <li>
              <button className={styles.categorybtn}>기타</button>
            </li>
          </ul>
        </div>

        <div className={styles.selectDiv}>
          <h2 className={styles.fillterTitle}>전체</h2>
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
      </section>
      <section className={styles.cardsection}>
        {cards?.map((card) => (
          <Card key={card.id} list={card} />
        ))}
      </section>
    </article>
  );
}

export default Main;
