import { start } from "repl";

export const dateForm = (date: string) : number => {

    const dateArr = date.substring(0,10).split("-") //받은날짜 자른거
    const startDate = new Date(+dateArr[0], +dateArr[1]-1, +dateArr[2])
    const a = new Date(+dateArr[0], +dateArr[1]-1, +dateArr[2])
    const endDate = new Date(a.setDate(a.getDate()+13))
    const btMs = endDate.getTime() - startDate.getTime();
    var btDay = btMs / (1000*60*60*24) ;
    return btDay;
}

