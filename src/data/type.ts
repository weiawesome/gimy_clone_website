import {AnimateCategory, Category, MovieCategory, TvSeriesCategory, VarietyShowsCategory} from "@/data/category";
import {
  AnimateLocation,
  LocationInformation,
  MovieLocation,
  TvSeriesLocation,
  VarietyShowsLocation
} from "@/data/location"

export type TypeInformation ={
  QUERY_TYPE:string
  index:number
  route:string
  value:string
  category:Category[]|null
  location:LocationInformation[]|null
}
export const HomeTypeInformation:TypeInformation={
  QUERY_TYPE:"HOME",
  index:0,
  route:"/",
  value:"首頁",
  category:null,
  location:null
}
export const TvSeriesTypeInformation:TypeInformation={
  QUERY_TYPE:"TV_SERIES",
  index:1,
  route:"/resource/tv-series",
  value:"電視劇",
  category:TvSeriesCategory,
  location:TvSeriesLocation
}
export const AnimateTypeInformation:TypeInformation={
  QUERY_TYPE:"ANIMATE",
  index:2,
  route:"/resource/animate",
  value:"動畫",
  category:AnimateCategory,
  location:AnimateLocation
}
export const MovieTypeInformation:TypeInformation={
  QUERY_TYPE:"MOVIE",
  index:3,
  route:"/resource/movies",
  value:"電影",
  category:MovieCategory,
  location:MovieLocation
}
export const VarietyShowsTypeInformation:TypeInformation={
  QUERY_TYPE:"VARIETY_SHOWS",
  index:4,
  route:"/resource/variety-shows",
  value:"綜藝",
  category:VarietyShowsCategory,
  location:VarietyShowsLocation
}
export const RankingsTypeInformation:TypeInformation={
  QUERY_TYPE:"RANKINGS",
  index:5,
  route:"/resource/rankings",
  value:"排行",
  category:null,
  location:null
}

export const TypeList:TypeInformation[]=[HomeTypeInformation,TvSeriesTypeInformation,AnimateTypeInformation,MovieTypeInformation,VarietyShowsTypeInformation,RankingsTypeInformation]
