import Image from "next/image";
import styles from "./WriteCard.module.css"
import logo from "../../public/Image/logo.png"
import ProgressBar from "../ui/progressbar/ProgressBar";

function WriteCard () {
    return(<div className={styles.container}>
        <Image alt="대표사진" src={logo} width={180} height={300} className={styles.img}/>
        <div  className={styles.contentDiv}>
            <div  className={styles.name}>
            <h2>콩떡이</h2>
               <span className={styles.detail}>1개월, 여아</span>
            </div>
        <span className={styles.participant}>2명 참여</span>
        <ProgressBar value={50}/>
        <span className={styles.price}>22 만원</span>

        <div className={styles.btnbox}>
            <button className={styles.endbtn}>후원 종료하기</button>
            <button className={styles.extendbtn}>후원 연장하기</button>
        </div>
        </div>
        </div>)
}

export default WriteCard;