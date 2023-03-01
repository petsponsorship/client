import React from 'react';
import DetailMainSection from '../../component/detailpage/main/DetailMainSection';
import DetailContents from '../../component/detailpage/contents/DetailContents';
import { useRouter } from 'next/router';
import { getPostDataApi } from '../../apis/posts';
import { useQuery } from '@tanstack/react-query';

function Detail() {
  const router = useRouter();
  const id = router.asPath.replace(/[^0-9]/g, '');

  const { data: detailData } = useQuery(['detail', id], () => getPostDataApi(id));

  console.log('detailData', detailData);
  return (
    <>
      {detailData && <DetailMainSection detailData={detailData} />}
      <hr />
      {detailData && <DetailContents contents={detailData['data']['post']['content']} />}
    </>
  );
}

export default Detail;
