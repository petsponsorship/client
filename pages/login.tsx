import React from "react";
import styles from "../styles/Login.module.css"


function login () {
    return (
    <div className={styles.logincontainer}>

        <form className={styles.loginform}>
        <h1 className={styles.title}>로그인</h1>
            <div className={styles.email}>
                <input type="email" placeholder="이메일 입력" className={styles.emailinput}/>
                {/* <em>이메일 형식이 올바르지 않습니다.</em> */}
            </div>
            <div className={styles.password}>
                <input type="password" placeholder="비밀번호 입력" className={styles.passwordinput}/>
                {/* <p> 등록되지 않은 아이디거나, 아이디 또는 비밀번호가 회원정보와 일치하지 않습니다.</p> */}
            </div>
        <button className={styles.loginbtn}>로그인</button>
        <button className={styles.loginbtn}>카카오로그인</button>
        </form>

        {/* <p>아직 댕도네냥 계정이 없나요?</p>
        <a>회원가입</a> */}
    </div>)
}

export default login; 