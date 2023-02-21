import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Card from '../component/mainpage/card/Card.tsx';
import CategoryTag from '../component/mainpage/category/CategoryTag.jsx';
import { useRecoilState } from 'recoil';
import { categoryFilterState } from '../store/CategoryList.ts';
import { fetchCategoryData } from '../apis/getMaindata.ts';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Main() {
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useRecoilState(categoryFilterState);

  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  useEffect(() => {
    const maindata = async () => {
      const res = await fetchCategoryData('전체');
      setCards(res);
    };
    maindata();
  }, []);

  const onSelect = useCallback(async (cateName) => {
    const res = await fetchCategoryData(cateName);
    setCards(res);
    setCategory(cateName);
  }, []);

  const clickdetail = (id) => {
    router.push(`post/${id}`);
  };
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
