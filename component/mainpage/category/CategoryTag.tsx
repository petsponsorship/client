import React from 'react';
import styles from './CategoryTage.module.css';

function CategoryTag({ category, onSelect }) {
  const categories = [
    { name: 'all', text: '전체' },
    { name: 'dog', text: '강아지' },
    { name: 'cat', text: '고양이' },
    { name: 'etc', text: '기타' },
  ];
  return (
    <div className={styles.list}>
      {categories.map((cate) => (
        <button
          className={category === cate.text ? styles.pickcategory : styles.categorybtn}
          key={cate.name}
          onClick={() => {
            onSelect(cate.text);
          }}>
          {cate.text}
        </button>
      ))}
    </div>
  );
}

export default CategoryTag;
