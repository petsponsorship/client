import React from "react";
import styles from "../styles/Signup.module.css"

function signup() {
    return(
    <section className={styles.signupcontainer}>
        <h1>이메일 간편가입</h1>
        <form className={styles.signupform}>
            <label>이메일</label>
            <div>
                <input className={styles.email}/>
                <button className={styles.emailcheck}>인증하기</button>
            </div>
            <label>이름</label>
            <input />
            <label>비밀번호</label>
            <input />
            <input />
            <button>완료</button>
        </form>
    </section>)
}

export default signup;