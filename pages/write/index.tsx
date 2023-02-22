import React, { useState } from 'react';
import WriteMainSection from '../../component/writepage/write/WriteMainSection';
import QuillEditor from '../../component/writepage/contents/QuillEditor';
import { IFormInput } from '../../component/writepage/write/WriteMainSection';
import { useMutation } from '@tanstack/react-query';

function WritePage() {
  const [html, setHtml] = useState('');

  const api = (form: IFormInput) => {
    console.log({ ...form, content: html });
  };

  return (
    <>
      <WriteMainSection jebal={api} />
      <hr />
      <button type="submit" form="write" style={{ width: '100vw' }}>
        onSubmit
      </button>
      <QuillEditor setHtml={setHtml} />
    </>
  );
}

export default WritePage;
