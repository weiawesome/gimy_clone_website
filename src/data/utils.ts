import {TypeInformation} from "@/data/type";
import { Category } from "@/data/category";

export interface CategoryFilmList{
    Category:Category
    FilmList:ResponseFilmList
}
export interface TypeFilmList{
    FilmType:TypeInformation
    FilmList:ResponseFilmList
}
export interface AllFilmListProps {
    serviceUrl:string
    typeList:ResponseFilmList
    categoryList:CategoryFilmList[]
}
export interface HomeFilmListProps {
    homeList:ResponseFilmList
    todayList:ResponseFilmList
    typeList:TypeFilmList[]
}

export interface ClientServiceProps{
    serviceUrl:string
}