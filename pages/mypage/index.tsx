import React, { useEffect, useState } from "react";
import { getMySupportListApi, getMylikeListApi, getMyWriteListApi, getAllNumDataApi } from "../../apis/mypage";
import { getCookie } from "../../hook/cookies";
import styles from "../../styles/Mypage.module.css";
import { priceForm } from "../../util/priceForm"
import Link from "next/link";
import floating from "../../public/Image/floating.png"
import Image from "next/image";

import  WriteCard from "../../component/mypage/WriteCard"
import { useQuery } from "@tanstack/react-query";
import Mycard from "../../component/mypage/mycard/Mycard";
import Myprofile from "../../component/mypage/myprofile/Myprofile";
import { useRecoilState } from "recoil";
import { isWriteCard, userName } from "../../store/mypageAtom";


function Mypage ({cookie}) {

  const userId = getCookie("userId")


  const [likecardData, setLikeCardData] = useState([]);
  const [supportcardData, setSupportCardData] = useState([])
  const [writeCardData, setWriteCardData] = useState([]);
  const [isWriteList, setIsWriteList] = useRecoilState(isWriteCard);
  const [name, setName] = useRecoilState(userName)

  const {data: myNumData} = useQuery(["mypage"], ()=> {return getAllNumDataApi()}, {onSuccess: (data)=> setName(data.data.userNmae)})
  const { data:supportList } = useQuery(["mypage", "supportlist"], ()=>{return getMySupportListApi()},{ onSuccess: (data)=> setSupportCardData(data.data.supportList)})
  const { data: likelist } = useQuery(["mypage", "likelist"], ()=>{return getMylikeListApi()}, { onSuccess: (data)=> setLikeCardData(data.data) })
  const {data: writelist} = useQuery(["mypage", "writelist"], ()=>{return getMyWriteListApi(userId)}, { onSuccess:(data)=> (setWriteCardData(data.data))})

  useEffect(()=>{
    if(cookie){    
      myNumData;} 
      else if(!cookie) {
        return;
      }
  },[])

  

  const switchCardcomponent = (isWriteList):React.ReactElement<any, string | React.JSXElementConstructor<any>> => {
    switch (isWriteList) {
      case "write" :
      return <>
       <h4 className={styles.cardWnotice}>{writeCardData?.length === 0 ? "작성하신 글이 없습니다.": name+"님의 작성글 목록입니다. "}</h4>
        {writeCardData.map((card)=>
       ( 
          <WriteCard card={card} key={card.id}/>
        )
        )}
        </>
      case "like" : 
       return   <>
         <h4 className={styles.cardnotice}>{likecardData?.length === 0 ? "아직 응원하지 않으셨습니다.": name+"님의 응원목록입니다."}</h4>
         <div className={styles.carddiv}>
        {likecardData && likecardData.map((list)=> 
         ( <Mycard list={list} key={list.postId}/>)
        )}
        </div>
        </>
      case "support" :
      return <>
      <h4  className={styles.cardnotice}>{supportcardData.length === 0 ? "아직 후원을 하지 않으셨습니다.": "000님의 후원목록입니다."}</h4>
      {supportcardData && supportcardData.map((list)=>
          <div className={styles.carddiv}>
          <Mycard list={list} key={list.postId}/>
          </div>
      )}
      </>
      default:""
    }
  }



    return(
      <>
      {cookie ? 
       <>
      <section className={styles.mypageSection}>
        <Myprofile data={myNumData}/>
     {switchCardcomponent(isWriteList)}  
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
