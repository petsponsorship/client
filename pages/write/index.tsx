import React, { useState } from 'react';
import WriteMainSection from '../../component/writepage/write/WriteMainSection';
import QuillEditor from '../../component/writepage/contents/QuillEditor';
import { IFormInput } from '../../component/writepage/write/WriteMainSection';
import { useMutation } from '@tanstack/react-query';
import { parseCookies } from "../../helpers"
import { cookieStringToObject } from '../../util/cookieStringToObject';

function WritePage({token}) {
  console.log(token)
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

//토큰이 있는지 확인합니다.
// export const getServerSideProps = async (context) => {
//   const cookie = context.req ? context.req.headers.cookie : "";
//   const token = cookieStringToObject(cookie);

//   const accessToken = token.Authorization;
//   const refreshToken = token.refreshToken;

//   if(accessToken === !null) {
//     const refreshTokenBycookie = token.refreshToken || "";
//   }

//   return {
//     props : {
//       token
//     }
//   }
  // const data = parseCookies(req)
  
  //  if (res) {
  //   if (Object.keys(data).length === 0 && data.constructor === Object) {
  //     res.writeHead(301, { Location: "/" })
  //     res.end()
  //   }
  // }
  
  // return {
  //   data: data && data,
  // }
// }

