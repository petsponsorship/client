import React, { useEffect, useState } from "react";
import { getMySupportListApi, getMylikeListApi, getMyWriteListApi, getAllNumDataApi } from "../../apis/mypage";
import { getCookie } from "../../hook/cookies";
import styles from "../../styles/Mypage.module.css";
import { priceForm } from "../../util/priceForm"
import Link from "next/link";


function Mypage () {
  const cookietoken = getCookie("Authorization");
  const [cardNumData, setCardNumData] = useState({});
  const [cardData, setCardData] = useState([]);

  useEffect(()=>{
    const Numdata = () => {
      getAllNumDataApi().then((res)=>{
        setCardNumData(res.data);
      })
    }
    if(cookietoken){    
      getSupportList();
      Numdata();} else if(!cookietoken) {
        return;
      }

  },[])



  

  const getSupportList = () => {
    getMySupportListApi().then((res)=>
    setCardData(res.data.supportList))
  }

  const getLiktList = () => {
    getMylikeListApi().then((res)=>
    setCardData(res.data))
  }




    return(
      <>
      {cookietoken ? <section className={styles.mypageSection}>
      <header className={styles.myInfoContainer}>
        <div className={styles.profilBox}>
          <div className={styles.profilImg}/>
            <p className = {styles.profilName}>조떼떼 님</p>
        </div>

        <div className={styles.myDataBox} onClick={()=>getSupportList()}>
          <div className={styles.pricebox}>
          <p className={styles.price}>{cardNumData?.supportCnt}</p>
          <span className={styles.ment}>후원한</span>
          </div>

          <div className={styles.pricebox} onClick={()=>getLiktList()}>
          <p className={styles.price}>{cardNumData?.likeCnt}</p>
          <span className={styles.ment}>응원한</span>
          </div>

          <div className={styles.pricebox}>
          <p className={styles.price}>{cardNumData?.supportCnt}</p>
          <span className={styles.ment}>작성글</span>
          </div>

          <div className={styles.pricebox}>
          <p className={styles.price}>{priceForm(cardNumData?.supportTotalAmount) }</p>
          <span className={styles.ment}>후원금액</span>
          </div>
        </div>
      </header>
      <>     
       {cardData?.map((card)=> {
        return console.log(card)
      })}
      </>
    </section> : 
    <>
    <h2 className={styles.plzlogin}>로그인이 필요한페이지 입니다.</h2>
    <p className={styles.gologin}><Link href="/login">로그인 페이지로 이동</Link></p>
    </>}
    </>
    );

    }
export default Mypage;

