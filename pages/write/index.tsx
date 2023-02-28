import React, { useState } from 'react';
import WriteMainSection from '../../component/writepage/write/WriteMainSection';
import QuillEditor from '../../component/writepage/contents/QuillEditor';
import { IFormInput } from '../../component/writepage/write/WriteMainSection';
import { useMutation } from '@tanstack/react-query';
<<<<<<< HEAD
import { parseCookies } from "../../helpers"
import { cookieStringToObject } from '../../util/cookieStringToObject';
=======
import { writeApi } from '../../apis/posts';
import { useRouter } from 'next/router';
>>>>>>> 9cf108804f7656d90014cf89be533c54d4247097

function WritePage({token}) {
  console.log(token)
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

