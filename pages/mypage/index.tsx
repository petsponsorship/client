import React, { useEffect, useState } from "react";
import { getMySupportListApi, getMylikeListApi, getMyWriteListApi, getAllNumDataApi } from "../../apis/mypage";
import { getCookie } from "../../hook/cookies";
import styles from "../../styles/Mypage.module.css";
import { priceForm } from "../../util/priceForm"
import Link from "next/link";
import floating from "../../public/Image/floating.png"
import Image from "next/image";

import  WriteCard from "../../component/mypage/WriteCard"
import Card from "../../component/mainpage/card/Card";


function Mypage ({cookie}) {

  const userId = getCookie("userId")

  const [cardNumData, setCardNumData] = useState({});
  const [cardData, setCardData] = useState([]);
  const [writeCardData, setWriteCardData] = useState([]);
  const [isWriteList, setIsWriteList] = useState(false);
  console.log("카드데이터", cardData)
  console.log("isWriteList", isWriteList)
  console.log("작성카드데이터", writeCardData)

  
  const Numdata = () => {
    getAllNumDataApi().then((res)=>{
      setCardNumData(res.data);
    })
  }

  useEffect(()=>{

    if(cookie){    
      // getSupportList();
      Numdata();} 
      else if(!cookie) {
        return;
      }
  },[])



  

  const getSupportList = async() => {
   await getMySupportListApi().then((res)=>
    setCardData(res.data.supportList))
    setIsWriteList(false)
  }

  const getLikeList = async () => {
   await getMylikeListApi().then((res)=>
    setCardData(res.data))
    setIsWriteList(false)
  }

  const getWriteList = async () => {
    setIsWriteList(true)
    await getMyWriteListApi(userId).then((res)=> 
    setWriteCardData(res.data),
    
    )
   
    setCardData([])
  }



    return(
      <>
      {cookie ? 
       <>
      <section className={styles.mypageSection}>
      <section className={styles.myInfoContainer}>
        <div className={styles.profilBox}>
          <div className={styles.profilImg}/>
            <p className = {styles.profilName}>{cardNumData?.userNmae} 님</p>
        </div>

        <div className={styles.myDataBox} onClick={()=>getSupportList()}>
          <div className={styles.pricebox}>
          <p className={styles.price}>{cardNumData?.supportCnt}</p>
          <span className={styles.ment}>후원한</span>
          </div>

          <div className={styles.pricebox} onClick={()=>getLikeList()}>
          <p className={styles.price}>{cardNumData?.likeCnt}</p>
          <span className={styles.ment}>응원한</span>
          </div>

          <div className={styles.pricebox} onClick={()=>getWriteList()}>
          <p className={styles.price}>{cardNumData?.postCnt}</p>
          <span className={styles.ment}>작성글</span>
          </div>

          <div className={styles.pricebox}>
          <p className={styles.price}>{priceForm(cardNumData?.supportTotalAmount) }</p>
          <span className={styles.ment}>후원금액</span>
          </div>
        </div>
      </section>
      <>
      {!isWriteList ? <>{cardData.map((card)=> {
        // console.log("맴함수안에서", card)
        <div className={styles.carddiv}>
        <Card list={card} key={card.postId}/>
        </div>
        // <div>{card.postId}</div>
      })}</>
      : 
      <>
      {writeCardData.map((card)=>
      <div className={styles.carddiv}>
        <WriteCard card={card} key={card.id}/>
        </div>
      )}
      </>
      }     
       
      </>
    </section>
    
     <Link href="/write"><Image alt="floating write btn" src={floating} width={70} height={70} className={styles.floatingbtn} /></Link>
    </>
     : 
    <>
    <h2 className={styles.plzlogin}>로그인이 필요한페이지 입니다.</h2>
    <p className={styles.gologin}><Link href="/login">로그인 페이지로 이동</Link></p>
    </>}
    </>
    );

    }
export default Mypage;

//서버사이드랜더링으로 토큰 확인하거나 받아오기
//만약 토큰이 없는경우 재할당통해 토큰이 없음을 띄워주기 null 

export async function getServerSideProps(context) {
    const iscookie = context.req ? context.req.headers.cookie : null;
  const cookie = iscookie ? iscookie : null;

  return {
    props: {cookie:cookie},
  };
};
