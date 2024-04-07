export type FilmSearch ={
    id:string
    state:string
    title:string
    resource:string
    category:string
    actors:string[]
    directors:string[]
    location:string
    language:string
    release_year:number
    update_time:string
    introduction:string
}
export type ResponseFilmsSearch ={
    search_films:FilmSearch[]
}