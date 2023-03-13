import React from 'react';
import styles from './DetailContents.module.css';
import { getCookie } from '../../../hook/cookies';

function DetailContents({ contents, deleteMutate }) {
  const { content, userId, id } = contents;
  const isWriter = Number(getCookie('userId')) === userId;

  return (
    <>
      {isWriter && (
        <div className={styles.buttons}>
          <button>수정</button>
          <button onClick={() => deleteMutate(id)}>삭제</button>
        </div>
      )}
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );
}

export default DetailContents;
