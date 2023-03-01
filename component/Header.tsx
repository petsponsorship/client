import React from 'react';
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();
  const pathname = router.pathname;

  const logout = () => {
    confirm('로그아웃하시겠습니까?');
    localStorage.removeItem('token');
  };

  return (
    <header className={styles.container}>
      <Link href="/" className={styles.title}>
        댕도네냥
      </Link>
      <div className={styles.btnbox}>
        <button className={styles.bellbtn}>🔔</button>
        {/* {localStorage.getItem("token") ? <button className={styles.loginbtn} onClick={logout}>로그아웃</button>:     
    <Link href="/login" className={styles.loginbtn}>
        <button className={styles.loginbtn}>
            로그인
            </button>
            </Link>} */}
        <Link href="/login" className={styles.loginbtn}>
          <button className={styles.loginbtn}>로그인</button>
        </Link>
        {pathname === '/write' ? (
          <button className={styles.postbtn} form="write">
            작성 완료
          </button>
        ) : (
          <Link href="/write">
            <button className={styles.postbtn}>글쓰기</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
