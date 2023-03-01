import React from "react";
import { useRouter } from "next/router";
import { loginApi } from "../apis/auth";
import useSignForm from "../hook/useSignForm";
import styles from "../styles/Login.module.css"
import {setCookie} from "../hook/cookies"


function login () {


    const router = useRouter();
    const {userInfo,
        handleInputValue,
        emailIsAbled,
        emailWarnList,
        passwordIsAbled,
        passwordWarnList,} = useSignForm();


        const handleLoginClick = () => {
            loginApi(userInfo.email, userInfo.password)
            .then((res)=>{
                setCookie("Authorization", res.data.accessToken, {});
                setCookie("refreshToken", res.data.refreshToken, {})
                setCookie("userId", res.data.userId, {})
                alert("로그인성공");
                router.push("/")
            })
            .catch((err)=> {
                alert(err)
            })
        }
    return (
    <div className={styles.logincontainer}>
        <form className={styles.loginform} onSubmit={(e) => e.preventDefault()}>
        <h1 className={styles.title}>로그인</h1>
            <div className={styles.email}>
                <input type="email" placeholder="이메일 입력" className={styles.emailinput} onChange={handleInputValue("email")}/>
                  {emailWarnList?.map((item) => (
                      <div key={item}>{item}</div>
                      ))}            </div>
            <div className={styles.password}>
                <input type="password" placeholder="비밀번호 입력" className={styles.passwordinput} onChange={handleInputValue("password")}/>
                {passwordWarnList?.map((item) => (
                      <div key={item}>{item}</div>
                      ))}
            </div>
        <button className={styles.loginbtn} onClick={handleLoginClick}>로그인</button>
        <button className={styles.loginbtn}>카카오로그인</button>
        </form>

        <p className={styles.bottomsg}>아직 댕도네냥 계정이 없나요? <a href="/signup" className={styles.signupbtn}>회원가입</a></p>
       
    </div>)
}

export default login; 