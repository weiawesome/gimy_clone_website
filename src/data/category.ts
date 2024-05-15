export type Category={
    value:string
    QUERY_CATEGORY:string
}

export const enum QueryMode {"TYPE"= "TYPE", "CATEGORY"="CATEGORY","RECOMMEND"="RECOMMEND"}

export const CategoryMapping={
        "ALL_CATEGORY": {
            value: "全部",
            index: 0
        },
        "TV_SERIES_CN_SERIES": {
            value: "陸劇",
            index:1
        },
        "TV_SERIES_KR_SERIES": {
            value: "韓劇",
            index: 1
        },
        "TV_SERIES_US_SERIES": {
            value: "美劇",
            index: 1
        },
        "TV_SERIES_JP_SERIES": {
            value: "日劇",
            index: 1
        },
        "TV_SERIES_TW_SERIES": {
            value: "台劇",
            index: 1
        },
        "TV_SERIES_HK_SERIES": {
            value: "港劇",
            index: 1
        },
        "TV_SERIES_OVERSEAS_SERIES": {
            value: "海外劇",
            index: 1
        },
        "TV_SERIES_DOCUMENTARY_SERIES": {
            value: "紀錄片線上看",
            index: 1
        },
        "ANIMATE_ANIMATE": {
            value: "動漫",
            index: 2
        },
        "MOVIE_DRAMA": {
            value: "劇情片",
            index: 3
        },
        "MOVIE_ACTION": {
            value: "動作片",
            index: 3
        },
        "MOVIE_SCI_FI": {
            value: "科幻片",
            index: 3
        },
        "MOVIE_COMEDY": {
            value: "喜劇片",
            index: 3
        },
        "MOVIE_HORROR": {
            value: "動作片",
            index: 3
        },
        "MOVIE_ROMANCE": {
            value: "愛情片",
            index: 3
        },
        "MOVIE_WAR": {
            value: "戰爭片",
            index: 3
        },
        "MOVIE_ANIMATED": {
            value: "動畫電影",
            index: 3
        },
        "VARIETY_SHOW_VARIETY_SHOW": {
            value: "綜藝",
            index: 4
        }
    }

export const AllCategory:Category={
        value: "全部",
        QUERY_CATEGORY: "ALL_CATEGORY"
    }

const TvSeriesCNSeries:Category= {
    value: "陸劇",
    QUERY_CATEGORY:"TV_SERIES_CN_SERIES"
}
export const TvSeriesKRSeries:Category= {
    value: "韓劇",
        QUERY_CATEGORY: "TV_SERIES_KR_SERIES"
}
export const TvSeriesUSSeries:Category= {
    value: "美劇",
        QUERY_CATEGORY:"TV_SERIES_US_SERIES"
}
export const TvSeriesJPSeries:Category= {
    value: "日劇",
        QUERY_CATEGORY:"TV_SERIES_JP_SERIES"
}
export const TvSeriesTWSeries:Category= {
    value: "台劇",
        QUERY_CATEGORY:"TV_SERIES_TW_SERIES"
}
export const TvSeriesHKSeries:Category= {
    value: "港劇",
        QUERY_CATEGORY:"TV_SERIES_HK_SERIES"
}
const TvSeriesOverSeasSeries:Category= {
    value: "海外劇",
        QUERY_CATEGORY:"TV_SERIES_OVERSEAS_SERIES"
}
const TvSeriesDocumentarySeries= {
    value: "紀錄片線上看",
        QUERY_CATEGORY:"TV_SERIES_DOCUMENTARY_SERIES"
}
export const TvSeriesCategory:Category[]=[
    AllCategory,TvSeriesCNSeries,TvSeriesKRSeries,TvSeriesUSSeries,
    TvSeriesJPSeries,TvSeriesTWSeries,TvSeriesHKSeries,TvSeriesOverSeasSeries,TvSeriesDocumentarySeries
]

export const AnimateAnimate:Category={
    value: "動漫",
    QUERY_CATEGORY:"ANIMATE_ANIMATE"
}

export const AnimateCategory:Category[]=[
    AllCategory,AnimateAnimate
]

export const MovieDrama:Category= {
    value: "劇情片",
        QUERY_CATEGORY:"MOVIE_DRAMA"
}

const MovieAction:Category= {
    value: "動作片",
        QUERY_CATEGORY: "MOVIE_ACTION"
}
const MovieSciFi:Category= {
    value: "科幻片",
        QUERY_CATEGORY:"MOVIE_SCI_FI"
}
const MovieComedy:Category= {
    value: "喜劇片",
        QUERY_CATEGORY:"MOVIE_COMEDY"
}
const MovieHorror:Category= {
    value: "恐怖片",
        QUERY_CATEGORY:"MOVIE_HORROR"
}
const MovieRomance:Category= {
    value: "愛情片",
        QUERY_CATEGORY:"MOVIE_ROMANCE"
}
const MovieWar:Category= {
    value: "戰爭片",
        QUERY_CATEGORY:"MOVIE_WAR"
}
const MovieAnimated:Category= {
    value: "動畫電影",
        QUERY_CATEGORY:"MOVIE_ANIMATED"
}
export const MovieCategory:Category[]=[
    AllCategory,MovieDrama,MovieAction,MovieSciFi,MovieComedy,MovieHorror,MovieRomance,MovieWar,MovieAnimated
]

const VarietyShowsVarietyShows:Category={
    value: "綜藝",
    QUERY_CATEGORY:"VARIETY_SHOW_VARIETY_SHOW"
}
export const VarietyShowsCategory:Category[]=[
    AllCategory,VarietyShowsVarietyShows
]