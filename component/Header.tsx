import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.css"
import Link from 'next/link';
import Image from 'next/legacy/image'
import { useRouter } from "next/router";
import { getCookie, removeCookie } from "../hook/cookies";
import { logoutApi } from "../apis/auth";
import logo from "../public/image/logo.png"

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
       
      <Link href="/" >
      <Image src={logo} width={150} height={100} alt="메인로고 테스트"/>
        </Link>
    <div className={styles.btnbox}>
    <button className={styles.bellbtn}>알림</button>
    {/* <Link href="/mypage" className={styles.bellbtn}><button className={styles.bellbtn}>🏠</button></Link> */}
        
        { headerLoginBtn ? 
           <button className={styles.loginbtn} onClick={()=>logout()}>
           로그아웃
           </button>
        :
 
        <Link href="/login" className={styles.loginbtn}>
        <button className={styles.loginbtn}>
            로그인
            </button>
            </Link>} 


            {pathname === '/write' ? (
          <button className={styles.postbtn} form="write">
            작성 완료
          </button>
        ) : (
          
            <button className={styles.postbtn}><Link href="/write">글쓰기</Link></button>
          
        )}
            </div>
    </header>
)

}

export default Header;
