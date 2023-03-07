import React from "react"
import styles from "./Support.module.css"

type price = 
    {name : string, text: string}


function Supportmodal() {
    const selectPrice : price[] = [
        { name: '1000', text: '1,000 원' },
        { name: '5000', text: '5,000 원' },
        { name: '10000', text: '10,000 원' },
        { name: '30000', text: '30,000 원' },
        { name: '50000', text: '50,000 원' },
        { name: "etc", text: "직접 입력"}
      ];
    return (<div className={styles.container}>
        <>
        <h1>후원 금액 선택하기</h1>
            {selectPrice.map((price)=>{
                <button
                type="button"
                className={styles.pricebtn}
                key={price.name}
                >{price.text}</button>
            })}
</>
    </div>)
}

export default Supportmodal;