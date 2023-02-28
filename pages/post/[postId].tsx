import React from 'react';
import DetailMainSection from '../../component/detailpage/main/DetailMainSection';
import { useRouter } from 'next/router';
import { getPostDataApi } from '../../apis/posts';
import { useQuery } from '@tanstack/react-query';

function Detail() {
  const router = useRouter();
  const id = router.asPath.replace(/[^0-9]/g, '');

  const { data } = useQuery(['detail', id], () => getPostDataApi(id));

  return (
    <>
      {data ? <DetailMainSection data={data} /> : null}
      <hr />
    </>
  );
}

export default Detail;
