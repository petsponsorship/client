import { atom } from "recoil";


export const myCardData = atom({
 key: "mypageCard",
 default: []
})

export const myWriteCardData = atom({
    key: "myWriteCard",
    default: []
})

export const isWriteCard = atom({
    key: "isWriteCard",
    default: ""
})