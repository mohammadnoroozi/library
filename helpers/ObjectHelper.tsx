import fastCompare from "react-fast-compare"


export const isEqual = (obj1: any, obj2: any) => fastCompare(obj1, obj2);
