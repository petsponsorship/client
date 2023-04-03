import React from 'react';
import DetailMainSection from '../../component/detailpage/main/DetailMainSection';
import DetailContents from '../../component/detailpage/contents/DetailContents';
import { useRouter } from 'next/router';
import { getPostDataApi, likeApi, deleteApi } from '../../apis/posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { options } from '../../apis/options';
import { getCookie } from '../../hook/cookies';
import floating from '../../public/Image/floating.png';
import Image from 'next/image';
import styles from '../../styles/Detail.module.css';
import Link from 'next/link';

function Detail() {
  const router = useRouter();
  const id = router.asPath.replace(/[^0-9]/g, '');
  const queryClient = useQueryClient();

  const { data: detailData } = useQuery(['detail', id], () => getPostDataApi(id), options.eternal);
  const { mutate: likeMutate } = useMutation(likeApi, {
    onMutate: async () => {
      await queryClient.cancelQueries(['detail', id]);
      const previousDetailData = queryClient.getQueryData(['detail', id]);
      queryClient.setQueryData(['detail', id], (prev: any) => {
        if (prev.data.post.userId === +getCookie('userId') || !getCookie('userId')) return;
        const copyedObj = Object.assign({}, prev);
        copyedObj.data.isLike = !copyedObj.data.isLike;
        copyedObj.data.isLike ? (copyedObj.data.post.like += 1) : (copyedObj.data.post.like -= 1);
      });
      return { previousDetailData };
    },
    onError(error, variables, context: any) {
      console.log('error', error);
      queryClient.setQueryData(['detail', id], context.previousDetailData);
    },
  });

  const { mutate: deleteMutate } = useMutation(deleteApi, {
    onSuccess() {
      alert('게시글이 삭제되었습니다.');
      router.push('/');
    },
  });

  console.log('detailData', detailData);

  return (
    <>
      {detailData && <DetailMainSection detailData={detailData} likeMutate={likeMutate} />}
      <hr />
      {detailData && <DetailContents contents={detailData['post']} deleteMutate={deleteMutate} />}
      <Link href="/write">
        <Image alt="floating write btn" src={floating} width={70} height={70} className={styles.floatingbtn} />
      </Link>
    </>
  );
}

export default Detail;
