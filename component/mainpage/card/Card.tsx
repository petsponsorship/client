import React from "react";
import styles from "./Card.module.css"
import ProgressBar from "../../ui/progressbar/ProgressBar"
import Link from "next/link";
import { dateForm } from "../../../util/dateForm";
import { priceForm } from "../../../util/priceForm"
import Image from "next/image";
import MedicalImg from "../../../public/Image/medical.png"
import FoodImg from "../../../public/Image/food.png"
import Funeral from "../../../public/Image/funeral.png"
import product from "../../../public/Image/product.png"



function Card({list}) {

    const purposegoal = (purpose):React.ReactElement<any, string | React.JSXElementConstructor<any>> => {
        switch (purpose){
            case "medical" :
               return <Image src={MedicalImg} alt="의료비" width={30} height={30}></Image>
            case "food" :
                return <Image src={FoodImg} alt="사료비" width={30} height={30}></Image>
            case "care" : 
               return  <Image src={product} alt="용품비" width={30} height={30}></Image>
            case "funeral" : 
            return <Image src={Funeral} alt="장례비" width={30} height={30}></Image>

            default: "";

        }

        
    }

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
        {list?.expired === 0 ? 
        <Link href={{
            pathname: `/post/${list.id}`
        }}>
            
    <div className={styles.cardContainer}> 
    
        <img
        className={styles.titleimg}
        alt="preview"
        src={list.thumbnail}
        />
        <div className={styles.purposeIcon}>{purposegoal(list.purpose)}</div>
        <div>
            <span className={styles.participation}>{list.sponsor}명 참여</span>
            <span className={styles.period}> {dateForm(list.createdAt)}일 남음</span>
            <ProgressBar value={progressbarAmount(list.targetAmount, list.amount)}/>
            <span className={styles.amount}>{priceForm(list.targetAmount)} 만원</span>
        </div>
        <div className={styles.infobox}>
            <p className={styles.info}>{list.sex === 0 ? "남아" : "여아"}&nbsp;&nbsp;</p>
            <p className={styles.info}>{list.age=== -1 ? "모름" : list.age + "세"} &nbsp;&nbsp;</p>
            <p className={styles.name}>{list.name}&nbsp;</p>
            <div>{speciesIcon(list.species)}</div>
        </div>
    </div>
    </Link> :
    <> 
    <Link href={{
            pathname: `/post/${list.id}`
        }}>
             <div className={styles.cardContainer}> 
            <section className = {styles.dateContainer}>
        <img
        className={styles.titleimg}
        alt="preview"
        src={list.thumbnail}
        />
        <div  className={styles.noticeexpire}>
        <p>후원종료</p>
        <p className = {styles.expirereson}>(사유: {list?.expiredDesc ==="amount"? "목표금액달성" : "후원기간종료"})</p>
        </div>
               
        <div>
            <span className={styles.participation}>{list.sponsor}명 참여</span>
            <span className={styles.period}>{dateForm(list.createdAt)}남음</span>
            <ProgressBar value={progressbarAmount(list.targetAmount, list.amount)}/>
            <span className={styles.amount}>{priceForm(list.targetAmount)}원</span>
        </div>
        <div className={styles.infobox}>
            <p className={styles.info}>{list.sex === 0 ? "남아" : "여아"}&nbsp;&nbsp;</p>
            <p className={styles.info}>{list.age=== -1 ? "모름" : list.age}세 &nbsp;&nbsp;</p>
            <p className={styles.name}>{list.name}&nbsp;</p>
            <div>{speciesIcon(list.species)}</div>
        </div>
    </section>
    </div>
    </Link> 
    </>
    }
        
    </>)
}

export default Card; 