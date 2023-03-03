import React, { useEffect, useState } from "react";
import { getMySupportListApi, getMylikeListApi, getMyWriteListApi } from "../../apis/mypage";
import { parseCookies } from "../../helpers"
import { getCookie } from "../../hook/cookies";
import styles from "../../styles/Mypage.module.css"

  //1. 전역관리를 한다
  //useRecoilState 3개 생성해서 api 콜 할때마다 setState 저장. 버튼 누를때마다 useRecoilState값을 React.useState에 넣어줌
  
  //2.api콜
  //첫 랜더링시 3개 api 콜 모두함.
  //후원한 게시글만 setState 사용해서 state에 저장함
  //버튼 누를때마다 api콜 state 바꿔줌

function Mypage () {
  const userId = getCookie("userId");
  const [cardData, setCardData] = useState([]);


  console.log(userId);
  const getAllData = async () => {
    getMyWriteListApi(userId).then((res)=>console.log("내가작성한글 -->", res.data))
    getMySupportListApi().then((res)=>console.log("내가 후원한 리스트-->", res.data.supportList))
    getMylikeListApi().then((res)=>console.log("내가좋아요한 리스트-->", res))
  }



  const getWriteList =() =>{
    getMyWriteListApi(userId).then((res)=>
    setCardData(res.data)
    )
  }

  const getSupportList = () => {
    getMySupportListApi().then((res)=>
    console.log("내가 후원한 리스트-->", res.data.supportList))
  }

  const getLiktList = () => {
    getMylikeListApi().then((res)=>
    console.log("내가좋아요한 리스트-->", res))
  }
  useEffect(()=>{
    getAllData();
    getWriteList();
  },[])

    return(<section className={styles.mypageSection}>
      <header className={styles.myInfoContainer}>
        <div className={styles.profilBox}>
          <div className={styles.profilImg}/>
            <p className = {styles.profilName}>조떼떼 님</p>
        </div>

        <div className={styles.myDataBox}>
          <div className={styles.pricebox}>
          <p className={styles.price}>0</p>
          <span className={styles.ment}>후원한</span>
          </div>

          <div className={styles.pricebox}>
          <p className={styles.price}>0</p>
          <span className={styles.ment}>응원한</span>
          </div>

          <div className={styles.pricebox}>
          <p className={styles.price}>0</p>
          <span className={styles.ment}>작성글</span>
          </div>

          <div className={styles.pricebox}>
          <p className={styles.price}>0</p>
          <span className={styles.ment}>후원금액</span>
          </div>
        </div>
      </header>
    </section>)
}

export default Mypage;


// Mypage.getServerSideProps = async ({ req, res }) => {
//     const data = parseCookies(req)
    
//      if (res) {
//       if (Object.keys(data).length === 0 && data.constructor === Object) {
//         res.writeHead(301, { Location: "/" })
//         res.end()
//       }
//     }
    
//     return {
//       data: data && data,
//     }
//   }