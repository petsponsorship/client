import React, { useState } from 'react';
import WriteMainSection from '../../component/writepage/write/WriteMainSection';
import { IFormInput } from '../../component/writepage/write/WriteMainSection';
import { useMutation } from '@tanstack/react-query';
import { writeApi } from '../../apis/posts';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('../../component/writepage/contents/QuillEditor'), { ssr: false });

function WritePage() {
  const [html, setHtml] = useState('');
  const router = useRouter();

  const api = async (data: IFormInput) => {
    data = { ...data, content: html };
    console.log('작성api', data);
    return await writeApi(data);
  };

  const { mutate } = useMutation(api, {
    onSuccess: (res) => {
      alert('글 작성에 성공하였습니다.');
      router.push(`/post/${res.data.id}`);
    },
    onError: (error) => console.log(error),
  });

  return (
    <>
      <WriteMainSection mutate={mutate} />
      <hr />
      <button type="submit" form="write">
        onSubmit
      </button>
      <QuillEditor setHtml={setHtml} html={html} />
    </>
  );
}

export default WritePage;
