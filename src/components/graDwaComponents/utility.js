export default function test(tablica){
    tablica = (tablica.sort()).toString().trim("")
    console.log(tablica)
    const winNumbers = [
        [6,7,8],
        [6,3,0],
        [0,1,2],
        [8,5,2],
        [8,4,0],
        [6,4,2],
        [3,4,5],
        [7,4,1],
    ]
    for(let i = 0; i < winNumbers.length; i++){
        let aktualna = (winNumbers[i].sort()).toString().trim("")
        if(tablica.includes(aktualna)){
            return true
        }
    }
    return false
}
