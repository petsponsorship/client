import React from 'react';
import styles from './DetailContents.module.css';
import { getCookie } from '../../../hook/cookies';
import { useRouter } from 'next/router';

function DetailContents({ contents, deleteMutate }) {
  const { content, userId, id } = contents;
  const isWriter = Number(getCookie('userId')) === userId;
  const router = useRouter();

  return (
    <>
      {isWriter && (
        <div className={styles.buttons}>
          <button onClick={() => router.push(`/edit/${id}`)}>수정</button>
          <button onClick={() => deleteMutate(id)}>삭제</button>
        </div>
      )}
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );
}

export default DetailContents;
