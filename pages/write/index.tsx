import React, { useState } from 'react';
import WriteMainSection from '../../component/writepage/write/WriteMainSection';
import QuillEditor from '../../component/writepage/contents/QuillEditor';
import { IFormInput } from '../../component/writepage/write/WriteMainSection';
import { useMutation } from '@tanstack/react-query';
import { writeApi } from '../../apis/write';

function WritePage() {
  const [html, setHtml] = useState('');

  const api = async (data: IFormInput) => {
    data = { ...data, content: html };
    return await writeApi(data);
  };

  const { mutate } = useMutation(api, {
    onSuccess: (a, b, c) => console.log(a, b, c),
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
