import Image from "next/image";
import styles from "./WriteCard.module.css"
import { progressbarAmount } from "../../util/progressbarAmount"
import ProgressBar from "../ui/progressbar/ProgressBar";
import Link from "next/link";
import { extendSponsor, putPostEndApi } from "../../apis/mypage";


function WriteCard ({card}) {
    const {thumbnail, name, age, sex, sponsor, targetAmount, amount, id, expired} = card;



    const sponsorEnd = async(id: number) => {
        if(confirm("후원을 종료하시겠습니까?")){
            return await putPostEndApi(id)
        } else{
            return; 
        }
      
    }

    const extendSpon = async(id: number) => {
        if(confirm("2주 연장을 하시겠습니까?")){
            return await extendSponsor(id).then((res)=> console.log(res))
        }
    }




    return(
        <Link href={{
            pathname: `/post/${id}`
        }}>
            {expired === 0? 
             <div className={styles.container}>
             <Image alt="대표사진" src={thumbnail} width={210} height={200}/>
             <div  className={styles.contentDiv}>
                 <div  className={name}>
                 <h2>{card.name}</h2>
                    <span className={styles.detail}>{age}세, {sex === 0 ? "남아" : "여아"}</span>
                 </div>
             <span className={styles.participant}>{sponsor}명 참여</span>
     
             <ProgressBar value={progressbarAmount(targetAmount, amount)}/>
     
             <span className={styles.price}>{targetAmount} 원</span>
     
             <div className={styles.btnbox}>
                 <button className={styles.endbtn} onClick={()=>sponsorEnd(id)}>후원 종료하기</button>
                 <button className={styles.extendbtn} onClick={()=>extendSpon(id)}>후원 연장하기</button>
             </div>
             </div>
             </div>
             :
            
             <div className={styles.container}>
                 <div className={styles.expiredContainer}>
             <Image alt="대표사진gg" src={thumbnail} width={210} height={200} className={styles.img}/>
             <div className={styles.notice}>종료된 후원입니다.</div>
             <div  className={styles.contentDiv}>
                 <div  className={name}>
                 <h2>{card.name}</h2>
                    <span className={styles.detail}>{age}세, {sex === 0 ? "남아" : "여아"}</span>
                 </div>
             <span className={styles.participant}>{sponsor}명 참여</span>
     
             <ProgressBar value={progressbarAmount(targetAmount, amount)}/>
     
             <span className={styles.price}>{targetAmount} 원</span>
     
             <div className={styles.btnbox}>
                 <button className={styles.endbtn}>후원 종료하기</button>
                 <button className={styles.extendbtn}>후원 연장하기</button>
             </div>
             </div>
             </div> 
             </div>
             }
   
        </Link>)
}

export default WriteCard;