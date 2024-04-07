export type FilmRanked ={
    id:string
    title:string
    popularity:number
}
export type ResponseFilmsRanked ={
    ranked_films:FilmRanked[]
}