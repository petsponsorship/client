import React, { useState } from 'react';
import WriteMainSection from '../../component/writepage/write/WriteMainSection';
import QuillEditor from '../../component/writepage/contents/QuillEditor';
import { IFormInput } from '../../component/writepage/write/WriteMainSection';
import { useMutation } from '@tanstack/react-query';
import { writeApi } from '../../apis/posts';
import { useRouter } from 'next/router';

function WritePage() {
  const [html, setHtml] = useState('');
  const router = useRouter();

  const api = async (data: IFormInput) => {
    data = { ...data, content: html };
    return await writeApi(data);
  };

  const { mutate } = useMutation(api, {
    onSuccess: (res) => {
      alert('글 작성에 성공하였습니다.'); // 모달로 바꾸는 편이 좋을지...
      router.push(`/post/${res.data.id}`);
    },
  });

  return (
    <>
      <WriteMainSection mutate={mutate} />
      <hr />
      <button type="submit" form="write">
        onSubmit
      </button>
      <QuillEditor setHtml={setHtml} />
    </>
  );
}

export default WritePage;
