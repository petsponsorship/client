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
import Sort from '../component/mainpage/sortTag/Sort';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

function Main({ data }) {
  // const Card = dynamic(() => import('../component/mainpage/card/Card.tsx'), {
  //   suspense: true,
  //   ssr: false,
  // });
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useRecoilState(categoryFilterState);
  const [orginalData, setOriginalData] = useRecoilState(mainCardData);

  const router = useRouter();
  const categoryName = Object.keys(router.query)[0] ? Object.keys(router.query)[0] : category;

  const { data: carddata } = useQuery(
    ['main', categoryName],
    () => {
      return fetchCategoryData(categoryName);
    },
    {
      onSuccess: (data) => {
        setCards(data);
        setOriginalData(data);
      },
      // suspense: true,
      enabled: true,
      // 20 second
      staleTime: 1000 * 20,
      // 40 second
      cacheTime: 1000 * 40,
      refetchOnWindowFocus: false,
    },
  );

  const onSelect = useCallback(async (cateName) => {
    await router.push({
      query: cateName,
    });
    setCategory(cateName);
  }, []);

  return (
    <article>
      <Image alt="mainAd" src={mainAd} width={1200} height={400} className={styles.adbox}></Image>
      <hr className={styles.divline} />
      <section className={styles.selectContainer}>
        <CategoryTag category={category} onSelect={onSelect} />
        <div className={styles.selectDiv}>
          <Sort cards={cards} setCards={setCards} />
        </div>
      </section>
      <section className={styles.cardsection}>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        {cards?.map((card) => (
          <Card key={card.id} list={card} />
        ))}
        {/* </Suspense> */}
      </section>
      <Link href="/write">
        <Image alt="floating write btn" src={floating} width={70} height={70} className={styles.floatingbtn} />
      </Link>
    </article>
  );
}

export default Main;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetchCategoryData(id);
  const data = res;

  return { props: { data } };
}
