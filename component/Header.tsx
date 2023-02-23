import React, { useState } from "react";
import styles from "../styles/Header.module.css"
import Link from 'next/link';
import { useRouter } from "next/router";
import { getCookie, removeCookie } from "../hook/cookies";

function Header (){
    const router = useRouter();
    const pathname = router.pathname;
    const [headerLoginBtn, setHeaderLoginBtn] = useState(getCookie("Authorization") ? true : false);
    console.log(headerLoginBtn);


    return (<header className={styles.container}>
    <Link href="/" className={styles.title}>
        댕도네냥
        </Link>
    <div className={styles.btnbox}>
    <button className={styles.bellbtn}>🔔</button>
        { headerLoginBtn ? 
           <button className={styles.loginbtn}>
           로그아웃
           </button>
        :
 
        <Link href="/login" className={styles.loginbtn}>
        <button className={styles.loginbtn}>
            로그인
            </button>
            </Link>
    }
    <Link href="/write"><button className={styles.postbtn}>{pathname ==="/write" ? "글작성완료" : "글쓰기" }</button></Link>
    </div>
    </header>)
}

export default Header;