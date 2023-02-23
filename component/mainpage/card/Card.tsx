import React from "react";
import styles from "./Card.module.css"
import ProgressBar from "../../ui/progressbar/ProgressBar"
import Link from "next/link";


function Card({list}) {

    console.log("카드데이터", list)

    // expiredDesc: 'date' | 'amount
    // null이 아닐때 삼항연산자 널일때 컨테이너 삼항연산자 보여주기
    const speciesIcon = (species) => {
        if( species === "강아지") {
            return "🐶"
        } else if(species === "고양이") {
            return "😺"
        } else if(species === "기타") {
            return species
        }
    }


const progressbarAmount = (targetAmount, amount) => {
    return (amount/targetAmount) * 100
}

    return (<>
        {list?.expiredDesc === null ? 
        <Link href={{
            pathname: `/post/${list.id}`
        }}>
    <div className={styles.cardContainer}> 
        <img
        className={styles.titleimg}
        alt="preview"
        src={list.thumbnail}
        />
        <div>
            <span className={styles.participation}>{list.sponsor}명 참여</span>
            <span className={styles.period}> 10일 남음</span>
            <ProgressBar value={progressbarAmount(list.targetAmount, list.amount)}/>
            <span className={styles.amount}>{list.targetAmount}</span>
        </div>
        <div className={styles.infobox}>
            <p className={styles.info}>{list.sex === 0 ? "남아" : "여아"}&nbsp;&nbsp;</p>
            <p className={styles.info}>{list.age}세 &nbsp;&nbsp;</p>
            <p className={styles.name}>{list.name}&nbsp;</p>
            <div>{speciesIcon(list.species)}</div>
        </div>
    </div>
    </Link> :
    <div>background grey 가 들어갑니다.</div> 
    }
        
    </>)
}

export default Card; 