import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.css"
import Link from 'next/link';
import { useRouter } from "next/router";
import { getCookie, removeCookie } from "../hook/cookies";
import { logoutApi } from "../apis/auth";

function Header (){
    const router = useRouter();
    const pathname = router.pathname;
    const [headerLoginBtn, setHeaderLoginBtn] = useState<boolean>();

    useEffect(()=>{
        if(!getCookie("Authorization")){ return setHeaderLoginBtn(false)}
        else {
            setHeaderLoginBtn(true)
        }
        
    },[pathname])

    const logout = async() =>{

        await logoutApi().then((res)=>{
            return alert(res.data.message);
        })
        removeCookie("userId",{});
        removeCookie("Authorization",{});
        removeCookie("refreshToken",{});
    }

  return (
    <header className={styles.container}>
      <Link href="/" className={styles.title}>
        댕도네냥

        </Link>
    <div className={styles.btnbox}>
    <button className={styles.bellbtn}>🔔</button>
    <div>
        { headerLoginBtn ? 
           <div className={styles.loginbtn} onClick={()=>logout()}>
           로그아웃
           </div>
        :
 
        <Link href="/login" className={styles.loginbtn}>
        <div className={styles.loginbtn}>
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
