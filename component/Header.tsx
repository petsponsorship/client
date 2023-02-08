import React from "react";
import styles from "../styles/Header.module.css"


function Header (){
    return (<header className={styles.container}>
    <h1 className={styles.title}>댕도네냥</h1>
    {/* 아이콘 갖다쓸려하는데 react-icon / mui 뭐가 좋을까 */}
    <div className={styles.btnbox}>
    <button className={styles.bellbtn}>🔔</button>
    <button className={styles.loginbtn}>로그인</button>
    <button className={styles.postbtn}>글쓰기</button>
    </div>
    </header>)
}

export default Header;