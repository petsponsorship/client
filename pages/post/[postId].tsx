import React from 'react';
import DetailMainSection from '../../component/detailpage/main/DetailMainSection';
import DetailContents from '../../component/detailpage/contents/DetailContents';
import { useRouter } from 'next/router';
import { getPostDataApi } from '../../apis/posts';
import { useQuery } from '@tanstack/react-query';
import floating from "../../public/Image/floating.png"
import Image from 'next/image';
import styles from "../../styles/Detail.module.css"
import Link from 'next/link';

function Detail() {
  const router = useRouter();
  const id = router.asPath.replace(/[^0-9]/g, '');

  const { data: detailData } = useQuery(['detail', id], () => getPostDataApi(id));

  return (
    <>
      {detailData && <DetailMainSection detailData={detailData} />}
      <hr />
      {detailData && <DetailContents contents={detailData['data']['post']['content']} />}
      <Link href="/write"><Image  alt="floating write btn" src={floating} width={70} height={70} className={styles.floatingbtn} /></Link>
    </>
  );
}

export default Detail;
