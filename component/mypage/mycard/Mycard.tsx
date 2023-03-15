import Link from "next/link";
import { priceForm } from "../../../util/priceForm";
import { progressbarAmount } from "../../../util/progressbarAmount";
import ProgressBar from "../../ui/progressbar/ProgressBar";
import styles from "./Mycard.module.css"
import Image from "next/image";
import MedicalImg from "../../../public/Image/medical.png"
import FoodImg from "../../../public/Image/food.png"
import Funeral from "../../../public/Image/funeral.png"
import product from "../../../public/Image/product.png"
import { dataConverter } from "../../../helpers/functions";

function Mycard({list}) {




    const purposegoal = (purpose: string):React.ReactElement<any, string | React.JSXElementConstructor<any>> => {
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

    return (<Link href={{
        pathname: `/post/${list.postId}`
    }}>
        
<div className={styles.cardContainer}> 
    <img
    className={styles.titleimg}
    alt="preview"
    src={list.thumbnail}
    />
    <div className={styles.purposeIcon}>{purposegoal(list.purpose)}</div>
    <div className={styles.species}>{list.species}</div>
    <div className={styles.nameInfobox}>
        <p>{list.name}&nbsp;</p>
        <p className={styles.info}>{list.sex === 0 ? "남아" : "여아"}&nbsp;&nbsp;{list.age=== -1 ? "모름" : dataConverter.age(list.age)} &nbsp;&nbsp;</p>
    </div>
    <div className={styles.progressBox}>
    <ProgressBar value={progressbarAmount(list.targetAmount, list.amountByPost)}/>
    <span className={styles.amount}>{priceForm(list.targetAmount)}만원</span> 
    </div>
    <div className={styles.infobox}>
        <p className={styles.participation}>{list.sponsor}명 참여</p>
    </div>
</div>
</Link>)
}

export default Mycard;


