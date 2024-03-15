import BaseModel from "./BaseModel";

interface BaseSeoModel extends BaseModel {
    title: string
    description: string
    logoPath: string
}

export default BaseSeoModel;
