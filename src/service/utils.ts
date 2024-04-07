import {CategoryMapping} from "@/data/category";
import {LocationMapping} from "@/data/location";
import {HomeTypeInformation, TypeList} from "@/data/type";

export const ConvertUTCDateToLocalDate=(date: string|undefined)=> {
    if (date===undefined){
        return "0000-00-00 00:00:00"
    }
    const newDate = new Date(date);
    const newDateValue = new Date(newDate.getTime());
    const offset = newDate.getTimezoneOffset() / 60;
    const hours = newDate.getHours();
    newDateValue.setHours(hours - offset);

    const year=String(newDateValue.getFullYear())
    const month=newDateValue.getMonth()+1<10?"0"+(newDateValue.getMonth()+1):String(newDateValue.getMonth()+1)
    const day=newDateValue.getDate()<10?"0"+newDateValue.getDate():String(newDateValue.getDate())
    const hour=newDateValue.getHours()<10?"0"+newDateValue.getHours():String(newDateValue.getHours())
    const minute=newDateValue.getMinutes()<10?"0"+newDateValue.getMinutes():String(newDateValue.getMinutes())
    const second=newDateValue.getSeconds()<10?"0"+newDateValue.getSeconds():String(newDateValue.getSeconds())

    return year+"-"+month+'-'+day+" "+hour+":"+minute+":"+second
}

export const GetTypeRouteFormCategory=(category:string|undefined):string=>{
    if (category===undefined){
        return HomeTypeInformation.route
    }
    if (category in CategoryMapping){
        // @ts-ignore
        return TypeList[CategoryMapping[category].index].route
    }
    return HomeTypeInformation.route
}
export const FormatCategory=(category:string|undefined):string=>{
    if (category===undefined){
        return CategoryMapping.ALL_CATEGORY.value
    }
    if (category in CategoryMapping){
        // @ts-ignore
        return CategoryMapping[category].value
    }
    return CategoryMapping.ALL_CATEGORY.value
}
export const FormatLocation=(location:string):string=>{
    if (location in LocationMapping){
        // @ts-ignore
        return LocationMapping[location]
    }
    return LocationMapping.ALL_LOCATION
}