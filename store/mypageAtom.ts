import { atom } from "recoil";

export const userName = atom({
    key:"name",
    default: "",
})

export const isWriteCard = atom({
    key: "isWriteCard",
    default: ""
})