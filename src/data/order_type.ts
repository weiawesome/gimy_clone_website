export type OrderType={
    value:string
    index:number
    QUERY_ORDER_TYPE:string
}

export const OrderTypeUpdateTime:OrderType={
    value:"按更新排序",
    index:0,
    QUERY_ORDER_TYPE:"UpdateTime"
}

const OrderTypeUploadTime:OrderType={
    value:"按上架排序",
    index:1,
    QUERY_ORDER_TYPE:"UploadTime"
}
const OrderTypeWeeklyPopularity:OrderType={
    value:"周人氣排序",
    index:2,
    QUERY_ORDER_TYPE:"WEEKLY_POPULARITY"
}
const OrderTypeTotalPopularity:OrderType={
    value:"總人氣排序",
    index:3,
    QUERY_ORDER_TYPE:"TOTAL_POPULARITY"
}

export const OrderTypeList:OrderType[]=[
    OrderTypeUpdateTime,OrderTypeUploadTime,OrderTypeWeeklyPopularity,OrderTypeTotalPopularity
]