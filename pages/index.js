import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Card from '../component/Card.tsx';
import axios from 'axios';
import CategoryTag from '../component/CategoryTag.jsx';
import { useRecoilState } from 'recoil';
import { categoryFilterState } from '../store/CategoryList.ts';

function Main() {
  const [cards, setCards] = useState([]);

  async function fetchcateData(species) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts?species=${species}`);
    setCards(res.data);
  }

  useEffect(() => {
    fetchcateData('전체');
  }, []);

  const [category, setCategory] = useRecoilState(categoryFilterState);
  const onSelect = useCallback((cateName) => {
    setCategory(cateName);
    fetchcateData(cateName);
  }, []);

  return (
    <article>
      <div className={styles.adbox}>슬라이드</div>
      <section>
        <CategoryTag category={category} onSelect={onSelect} />
        <div className={styles.selectDiv}>
          <h2 className={styles.filterTitle}>{category}</h2>
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
