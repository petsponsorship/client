import React from "react";
import styles from "../styles/Card.module.css"


function Card({list}) {
    const speciesIcon = (species) => {
        if( species === "강아지") {
            return "🐶"
        } else if(species === "고양이") {
            return "😺"
        } else if(species === "기타") {
            return species
        }
    }
    


    return (<div className={styles.cardContainer}> 
        <img
        className={styles.titleimg}
        alt="preview"
        src={list.thumbnail}
        />
        <div>
            <span className={styles.participation}>{list.sponsor}명 참여</span>
            <span className={styles.period}> 10일 남음</span>
            <div className={styles.progress}>
                <div className={styles.dealt}></div>
            </div>
            <span className={styles.amount}>{list.targetAmount}</span>
        </div>
        <div className={styles.infobox}>
            <p className={styles.info}>{list.sex === 0 ? "남아" : "여아"}&nbsp;&nbsp;</p>
            <p className={styles.info}>{list.age}세 &nbsp;&nbsp;</p>
            <p className={styles.name}>{list.name}&nbsp;</p>
            <div>{speciesIcon(list.species)}</div>
        </div>
    </div>)
}

export default Card; 