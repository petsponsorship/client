import React from 'react';
import styles from './DetailContents.module.css';

function DetailContents({ contents }) {
  return <div className={styles.content} dangerouslySetInnerHTML={{ __html: contents }}></div>;
}

export default DetailContents;
