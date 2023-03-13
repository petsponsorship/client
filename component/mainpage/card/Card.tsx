import React from "react";
import styles from "./Card.module.css"
import ProgressBar from "../../ui/progressbar/ProgressBar"
import Link from "next/link";
import { dateForm } from "../../../util/dateForm";
import { priceForm } from "../../../util/priceForm"
import { progressbarAmount } from "../../../util/progressbarAmount"
import Image from "next/image";
import MedicalImg from "../../../public/Image/medical.png"
import FoodImg from "../../../public/Image/food.png"
import Funeral from "../../../public/Image/funeral.png"
import product from "../../../public/Image/product.png"



function Card({list}) {


    const purposegoal = (purpose):React.ReactElement<any, string | React.JSXElementConstructor<any>> => {
        switch (purpose){
            case "medical" :
               return <Image src={MedicalImg} alt="의료비" width={25} height={25}></Image>
            case "food" :
                return <Image src={FoodImg} alt="사료비" width={25} height={25}></Image>
            case "care" : 
               return  <Image src={product} alt="용품비" width={25} height={25}></Image>
            case "funeral" : 
            return <Image src={Funeral} alt="장례비" width={25} height={25}></Image>

            default: "";

        }

        
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
        <div className={styles.experiod}>D-{dateForm(list.expiredAt)}</div>
        <div className={styles.species}>{list.species}</div>
        <div className={styles.nameInfobox}>
            <p>{list.name}&nbsp;</p>
            <p className={styles.info}>{list.sex === 0 ? "남아" : "여아"}&nbsp;&nbsp;{list.age=== -1 ? "모름" : list.age + "세"} &nbsp;&nbsp;</p>
        </div>
        <div className={styles.progressBox}>
        <ProgressBar value={progressbarAmount(list.targetAmount, list.amount)}/>
        <span className={styles.amount}>{priceForm(list.targetAmount)}만원</span> 
        </div>
        <div className={styles.infobox}>
            <p className={styles.participation}>{list.sponsor}명 참여</p>
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
        <div className={styles.purposeIconEnd}>{purposegoal(list.purpose)}</div>
        <div className={styles.experiodEnd}>D-{dateForm(list.expiredAt)}</div>
        <div className={styles.speciesEnd}>{list.species}</div>
        <div className={styles.nameInfoboxEnd}>
            <p>{list.name}&nbsp;</p>
            <p className={styles.info}>{list.sex === 0 ? "남아" : "여아"}&nbsp;&nbsp;{list.age=== -1 ? "모름" : list.age + "세"} &nbsp;&nbsp;</p>
        </div>
        <div className={styles.progressBox}>
        <ProgressBar value={progressbarAmount(list.targetAmount, list.amount)}/>
        <span className={styles.amount}>{priceForm(list.targetAmount)}만원</span> 
        </div>
        <div className={styles.infobox}>
            <p className={styles.participation}>{list.sponsor}명 참여</p>
        </div>
    </section>
    </div>
    </Link> 
    </>
    }
        
    </>)
}

export default Card; 