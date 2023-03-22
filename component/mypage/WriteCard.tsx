import Image from "next/image";
import styles from "./WriteCard.module.css"
import { progressbarAmount } from "../../util/progressbarAmount"
import ProgressBar from "../ui/progressbar/ProgressBar";
import Link from "next/link";
import { putPostEndApi } from "../../apis/mypage";


function WriteCard ({card}) {

    const {thumbnail, name, age, sex, sponsor, targetAmount, amount, id } = card;



    const sponsorEnd = async(id: number) => {
        if(confirm("후원을 종료하시겠습니까?")){
            return await putPostEndApi(id).then((res)=> console.log(res))
        } else{
            return; 
        }
      
    }


    return(
        <Link href={{
            pathname: `/post/${id}`
        }}>
    <div className={styles.container}>
        <Image alt="대표사진gg" src={thumbnail} width={210} height={200} className={styles.img}/>
        <div  className={styles.contentDiv}>
            <div  className={name}>
            <h2>{card.name}</h2>
               <span className={styles.detail}>{age}세, {sex === 0 ? "남아" : "여아"}</span>
            </div>
        <span className={styles.participant}>{sponsor}명 참여</span>

        <ProgressBar value={progressbarAmount(targetAmount, amount)}/>

        <span className={styles.price}>{targetAmount} 만원</span>

        <div className={styles.btnbox}>
            <button className={styles.endbtn} onClick={()=>sponsorEnd(id)}>후원 종료하기</button>
            <button className={styles.extendbtn}>후원 연장하기</button>
        </div>
        </div>
        </div>
        </Link>)
}

export default WriteCard;