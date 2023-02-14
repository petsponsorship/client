import React from "react";
import styles from "../styles/Header.module.css"
import Link from 'next/link'

function Header (){
    return (<header className={styles.container}>
    <Link href="/" className={styles.title}>
        댕도네냥
        </Link>
    <div className={styles.btnbox}>
    <button className={styles.bellbtn}>🔔</button>
    <Link href="/login" className={styles.loginbtn}>
        <button className={styles.loginbtn}>
            로그인
            </button>
            </Link>
    <button className={styles.postbtn}>글쓰기</button>
    </div>
    </header>)
}

export default Header;