import { useRecoilState } from "recoil";
import { isWriteCard } from "../../../store/mypageAtom";
import { priceForm } from "../../../util/priceForm";
import styles from "./Myprofile.module.css"

function Myprofile({data}){

    const [isWriteList, setIsWriteList] = useRecoilState(isWriteCard)

    return(
      <section className={styles.myInfoContainer}>
        <div className={styles.profilBox}>
          <div className={styles.profilImg}/>
            <p className = {styles.profilName}>{data?.data.userNmae} 님</p>
        </div>

        <div className={styles.myDataBox} onClick={(e)=>{e.stopPropagation(); setIsWriteList("support")}}>
          <div className={styles.pricebox}>
          <p className={styles.price}>{data?.data.supportCnt}</p>
          <span className={styles.ment}>후원한</span>
          </div>

          <div className={styles.pricebox} onClick={(e)=>{e.stopPropagation(); setIsWriteList("like"); }}>
          <p className={styles.price}>{data?.data.likeCnt}</p>
          <span className={styles.ment}>응원한</span>
          </div>

          <div className={styles.pricebox} onClick={(e)=>{e.stopPropagation(); setIsWriteList("write")}}>
          <p className={styles.price}>{data?.data.postCnt}</p>
          <span className={styles.ment}>작성글</span>
          </div>

          <div className={styles.pricebox}>
          <p className={styles.price}>{priceForm(data?.data.supportTotalAmount) }</p>
          <span className={styles.ment}>후원금액</span>
          </div>
        </div>
      </section>
    )
}

export default Myprofile;