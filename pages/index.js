import React, { Suspense, useCallback, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Card from '../component/mainpage/card/Card.tsx';
import CategoryTag from '../component/mainpage/category/CategoryTag.tsx';
import { useRecoilState } from 'recoil';
import { categoryFilterState } from '../store/CategoryList.ts';
import { mainCardData } from '../store/MainCard.ts';
import { fetchCategoryData } from '../apis/getMaindata.ts';
import { useRouter } from 'next/router';
import floating from '../public/Image/floating.png';
import Image from 'next/image';
import Link from 'next/link';
import mainAd from '../public/Image/mainAd.png';

function Main({ data }) {
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useRecoilState(categoryFilterState);
  const [filterState, setFilterState] = useState();
  const [orginalData, setOriginalData] = useRecoilState(mainCardData);

  const router = useRouter();
  const categoryName = Object.keys(router.query)[0];

  useEffect(() => {
    const maindata = async () => {
      const res = await fetchCategoryData('전체');
      setCategory(categoryName);
      setCards(res);
      setOriginalData(res);
      router.push('?전체');
    };

    maindata();
  }, []);

  const onSelect = useCallback(async (cateName) => {
    await router.push({
      query: cateName,
    });
    const res = await fetchCategoryData(cateName || '전체');
    setCards(res);
    setCategory(cateName);
  }, []);

  //메인 필터링 기능
  //1.최신순정렬
  const newestFilter = () => {
    const sorted = [...cards].slice(0).sort((a, b) => {
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    });
    setCards(sorted);
    setFilterState('newest');
  };

  //오래된순
  const imminentFilter = () => {
    const sort = [...cards].slice(0).sort((a, b) => {
      return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
    });
    setCards(sort);
    setFilterState('imminent');
  };

  //응원순
  const likeFilter = () => {
    const sort = [...cards].slice(0).sort((a, b) => {
      return b.sponsor - a.sponsor;
    });
    setCards(sort);
    setFilterState('like');
  };

  //후원달성률
  const sponsorPerFilter = () => {
    const sort = [...cards].slice(0).sort((a, b) => {
      return b.sponsor - a.sponsor;
    });
    setCards(sort);
    setFilterState('sponsor');
  };

  //입양가능한 아이만 볼래요
  const onlyadopt = (checked, item) => {
    if (checked) {
      const adoptfilter = [...cards].slice(0).filter((data) => data.adopt === 1);
      setCards(adoptfilter);
    } else if (!checked) {
      setCards(orginalData);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <article>
        {/* <div className={styles.adbox}> */}
        <Image alt="mainAd" src={mainAd} width={1200} height={400} className={styles.adbox}></Image>
        {/* </div> */}
        <hr className={styles.divline} />
        <section className={styles.selectContainer}>
          <CategoryTag category={category} onSelect={onSelect} />
          <div className={styles.selectDiv}>
            <div>
              <input type="checkbox" onClick={(e) => onlyadopt(e.target.checked, e.target.value)} />
              <span>입양 가능한 아이만 볼래요!</span>
            </div>
            <ul className={styles.selectlist}>
              <li>
                <span
                  className={filterState === 'imminent' ? styles.isSelected : styles.select}
                  onClick={() => imminentFilter()}>
                  마감임박순
                </span>
              </li>
              <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <li>
                <span
                  className={filterState === 'newest' ? styles.isSelected : styles.select}
                  onClick={() => newestFilter()}>
                  최신순
                </span>
              </li>
              <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <li>
                <span
                  className={filterState === 'like' ? styles.isSelected : styles.select}
                  onClick={() => likeFilter()}>
                  {' '}
                  응원순
                </span>
              </li>
            </ul>
          </div>
        </section>
        <section className={styles.cardsection}>
          {cards?.map((card) => (
            <Card key={card.id} list={card} />
          ))}
        </section>
        <Link href="/write">
          <Image alt="floating write btn" src={floating} width={70} height={70} className={styles.floatingbtn} />
        </Link>
      </article>
    </Suspense>
  );
}

export default Main;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetchCategoryData(id);
  const data = res;

  return { props: { data } };
}
