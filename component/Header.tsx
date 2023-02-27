import React, { useState } from "react";
import styles from "../styles/Header.module.css"
import Link from 'next/link';
import { useRouter } from "next/router";
import { getCookie, removeCookie } from "../hook/cookies";

function Header (){
    const router = useRouter();
    const pathname = router.pathname;
    const [headerLoginBtn, setHeaderLoginBtn] = useState(getCookie("Authorization") ? true : false);


    return (<header className={styles.container}>
    <Link href="/" className={styles.title}>
        댕도네냥
        </Link>
    <div className={styles.btnbox}>
    <button className={styles.bellbtn}>🔔</button>
        { headerLoginBtn ? 
           <div className={styles.loginbtn}>
           로그아웃
           </div>
        :
 
        <Link href="/login" className={styles.loginbtn}>
        <div className={styles.loginbtn}>
            로그인
            </div>
            </Link>
    }
    <Link href="/write"><button className={styles.postbtn}>{pathname ==="/write" ? "글작성완료" : "글쓰기" }</button></Link>
    </div>x
    </header>)
}

export default Header;