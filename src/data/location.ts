export type LocationInformation={
  value:string
  QUERY_LOCATION:string
}
export const LocationMapping={
      "ALL_LOCATION":   "全部",
      "OTHER_LOCATION": "其他",
      "CH":             "中國大陸",
      "MAIN_LAND":      "大陸",
      "KR":             "韓國",
      "JP":             "日本",
      "TW":             "台灣",
      "HK":             "香港",
      "US":             "美國",
      "EU_US":          "歐美",
      "TH":             "泰國",
      "GB":             "英國",
      "FR":             "法國",
      "SG":             "新加玻"
    }
export const AllLocation:LocationInformation={
  value:"全部",
  QUERY_LOCATION:"ALL_LOCATION"
}
const OtherLocation:LocationInformation={
  value:"其他",
  QUERY_LOCATION:"OTHER_LOCATION"
}
const CH:LocationInformation={
  value:"中國大陸",
  QUERY_LOCATION:"CH"
}
const MAIN_LAND:LocationInformation={
  value:"大陸",
  QUERY_LOCATION:"MAIN_LAND"
}
const KR:LocationInformation={
  value:"韓國",
  QUERY_LOCATION:"KR"
}
const JP:LocationInformation={
  value:"日本",
  QUERY_LOCATION:"JP"
}
const TW:LocationInformation={
  value:"台灣",
  QUERY_LOCATION:"TW"
}
const HK:LocationInformation={
  value:"香港",
  QUERY_LOCATION:"HK"
}
const US:LocationInformation={
  value:"美國",
  QUERY_LOCATION:"US"
}
const EU_US:LocationInformation={
  value:"歐美",
  QUERY_LOCATION:"EU_US"
}
const TH:LocationInformation={
  value:"泰國",
  QUERY_LOCATION:"TH"
}
const GB:LocationInformation={
  value:"英國",
  QUERY_LOCATION:"GB"
}
const FR:LocationInformation={
  value:"法國",
  QUERY_LOCATION:"FR"
}
const SG:LocationInformation={
  value:"新加玻",
  QUERY_LOCATION:"SG"
}


export const TvSeriesLocation:LocationInformation[]=[
    AllLocation,CH,MAIN_LAND,KR,JP,TW,HK,US,EU_US,TH,GB,FR,SG,OtherLocation
]
export const AnimateLocation:LocationInformation[]=[
    AllLocation,CH,MAIN_LAND,JP,US,EU_US,TW,HK,KR,
]

export const MovieLocation:LocationInformation[]=[
    AllLocation,US,EU_US,KR,CH,MAIN_LAND,JP,TW,HK,TH,GB,SG,OtherLocation
]
export const VarietyShowsLocation:LocationInformation[]=[
    AllLocation,KR,CH,MAIN_LAND,JP,US,EU_US,TW,HK
]