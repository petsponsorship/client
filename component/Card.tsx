import React from "react";
import styles from "../styles/Card.module.css"

function Card() {
    return (<div className={styles.cardContainer}> 
        <img
        className={styles.titleimg}
        src="http://image.dongascience.com/Photo/2016/09/14750507361195.jpg"
        />
        <div>
            <span className={styles.participation}>70명 참여</span>
            <span className={styles.period}> 10일 남음</span>
            <div className={styles.progress}>
                <div className={styles.dealt}></div>
            </div>
            <span className={styles.amount}>300,000 원</span>
        </div>
        <div className={styles.infobox}>
            <p className={styles.info}>여아&nbsp;&nbsp;</p>
            <p className={styles.info}>4개월&nbsp;&nbsp;</p>
            <p className={styles.name}>인절미&nbsp;</p>
            <div>🐈</div>
        </div>
    </div>)
}

export default Card; 