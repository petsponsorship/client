import Image from "next/image";
import styles from "./WriteCard.module.css"
import { progressbarAmount } from "../../util/progressbarAmount"
import ProgressBar from "../ui/progressbar/ProgressBar";


function WriteCard ({card}) {


    return(
    <div className={styles.container}>
        <Image alt="대표사진gg" src={card.thumbnail} width={210} height={200} className={styles.img}/>
        <div  className={styles.contentDiv}>
            <div  className={styles.name}>
            <h2>{card.name}</h2>
               <span className={styles.detail}>{card.age}세, {card.sex === 0 ? "남아" : "여아"}</span>
            </div>
        <span className={styles.participant}>{card.sponsor}명 참여</span>

        <ProgressBar value={progressbarAmount(card.targetAmount, card.amount)}/>

        <span className={styles.price}>{card.targetAmount} 만원</span>

        <div className={styles.btnbox}>
            <button className={styles.endbtn}>후원 종료하기</button>
            <button className={styles.extendbtn}>후원 연장하기</button>
        </div>
        </div>
        </div>)
}

export default WriteCard;