export const enum AdType{
    "UNKNOWN"="UNKNOWN",
    "FILM"="FILM",
    "WEB"="WEB",
    "WEB_BAR"="WEB_BAR",
    "WEB_CORNER"="WEB_CORNER",
}

export type AdTypeInformation={
    type:AdType
    information:string
}
const UnknownAdType:AdTypeInformation={
    type:AdType.UNKNOWN,
    information:"-"
}
const FilmAdType:AdTypeInformation={
    type:AdType.FILM,
    information:"內嵌影片廣告"
}
const WebBarAdType:AdTypeInformation={
    type:AdType.WEB_BAR,
    information:"網頁 GIF 廣告"
}
const WebAdType:AdTypeInformation={
    type:AdType.WEB,
    information:"影片資訊(全螢幕) 右上廣告"
}
const WebCornerAdType:AdTypeInformation={
    type:AdType.WEB_CORNER,
    information:"影片資訊(全螢幕) 右下角落廣告"
}
export const AdTypeList:AdTypeInformation[]=[
    UnknownAdType,FilmAdType,WebBarAdType,WebAdType,WebCornerAdType
]

export type ResponseAdInformation ={
    URL:string
}
