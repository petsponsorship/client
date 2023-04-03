import React, { useState } from 'react';
import EditMainSection from '../../component/writepage/edit/EditMainSection';
import { IFormInput } from '../../component/writepage/write/WriteMainSection';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editApi, getPostDataApi } from '../../apis/posts';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('../../component/writepage/contents/QuillEditor'), { ssr: false });

function EditPage() {
  const router = useRouter();
  const id = router.asPath.replace(/[^0-9]/g, '');
  const queryClient = useQueryClient();
  const [html, setHtml] = useState('');
  const { data: detailData } = useQuery(['detail', id], () => getPostDataApi(id), {
    onSuccess({ data }) {
      if (!html) setHtml(data.post.content);
    },
  });

  const api = async (data: IFormInput) => {
    data = { ...data, content: html };
    return await editApi(id, data);
  };

  const { mutate } = useMutation(api, {
    onSuccess: (res) => {
      alert('글 수정에 성공하였습니다.');
      queryClient.invalidateQueries(['detail', id]);
      router.push(`/post/${res.data.id}`);
    },
    onError: (error) => console.log(error),
  });

  return (
    <>
      {detailData && <EditMainSection mutate={mutate} detailData={detailData} />}
      <hr />
      <button type="submit" form="edit">
        수정 테스트 중
      </button>
      <QuillEditor setHtml={setHtml} html={html} />
    </>
  );
}

export default EditPage;
