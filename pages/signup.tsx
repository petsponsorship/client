import React from "react";
import styles from "../styles/Signup.module.css"
import useSignForm from "../hook/useSignForm.js"
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
            <input className={styles.textinput} placeholder="Email" type="text"  onChange={handleInputValue("email")}/>
            <div className={styles.warntext}>{emailWarnList?.map((item) => (
                <div key={item}>{item}</div>
               ))}</div>
            <input className={styles.textinput} placeholder="이름" type="text" onChange={handleInputValue("name")}/>
            <div className={styles.warntext}>{nameWarnList?.map((item) => (
                <div key={item}>{item}</div>
               ))}</div>
            <input className={styles.textinput} placeholder="비밀번호" type="password" onChange={handleInputValue("password")}/>
            <div className={styles.warntext}>{passwordWarnList?.map((item) => (
                <div key={item}>{item}</div>
               ))}</div>
            <input  className={styles.textinput} placeholder="휴대폰번호" type="text" onChange={handleInputValue("phoneNumber")}/>
            <div className={styles.warntext}>{phoneNumberWarnList?.map((item) => (
                <div key={item}>{item}</div>
               ))}</div>
            <button className={styles.signupbtn}>회원가입완료</button>
        </form>
    </section>)
}

export default signup;