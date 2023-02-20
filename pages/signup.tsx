import React from "react";
import styles from "../styles/Signup.module.css"
import useSignForm from "../hook/useSignForm.js"
import axios from "axios";
import { signUpApi } from "../apis/auth";

function signup() {

    const {
        userInfo,
        handleInputValue,
        emailIsAbled,
        emailWarnList,
        passwordIsAbled,
        passwordWarnList,
        nameIsAbled,
        nameWarnList,
        phoneNumberIsAbled,
        phoneNumberWarnList,
      } = useSignForm();

      const handleSignupClick = (e) => {
        e.preventDefault();
        signUpApi(userInfo.email, userInfo.password, userInfo.name, userInfo.phoneNumber)
        .then(()=>{
            e.target.reset();
            alert("회원가입성공")
        })
        .catch((err)=> {
            alert(err)
        })
      }

    return(
    <section className={styles.signupcontainer}>
        <h1>이메일 간편가입</h1>
        <form className={styles.signupform} onSubmit={handleSignupClick}>
            <label>이메일</label>
            <div>
                <input className={styles.email} type="text" onChange={handleInputValue("email")}/>
                <button className={styles.emailcheck}>인증하기</button>
            </div>
            <label>이름</label>
            <input type="text" onChange={handleInputValue("name")}/>
            <label>비밀번호</label>
            <input type="text" onChange={handleInputValue("password")}/>
            <label>휴대폰번호</label>
            <input  type="text" onChange={handleInputValue("phoneNumber")}/>
            <button>완료</button>
            <div>        {emailWarnList?.map((item) => (
          <div key={item}>{item}</div>
        ))}
        {passwordWarnList?.map((item) => (
          <div key={item}>{item}</div>
        ))}</div>
        </form>
    </section>)
}

export default signup;