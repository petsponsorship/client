import { atom, selector } from "recoil";
import { fetchCategoryData } from "../apis/getMaindata";

export const categoryFilterState = atom({
 key: "category",
 default:"전체"
})

