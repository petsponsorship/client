

export const dateForm = (endDate: string) : number => {

        let date = new Date();
        let year = date.getFullYear();
        let month = ("0" + (1 + date.getMonth())).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
    
    const now = new Date(+year, +month-1, +day)
    console.log(now)

    const enddateArr =endDate.substring(0,10).split("-");
    const newendDate = new Date(+enddateArr[0], +enddateArr[1]-1, +enddateArr[2])
    
    const btMs = newendDate.getTime() - now.getTime();
    var btDay = btMs / (1000*60*60*24) ;
    return btDay;
}

