import { atom, selector } from "recoil";
import { fetchCategoryData } from "../apis/getMaindata";

export const categoryFilterState = atom({
 key: "category",
 default:"전체"
})

export const getCardSelector = selector({
    key: "getCardSelector",
    get: async () => {
        const res = await fetchCategoryData("전체");
        return res;
    }
})
