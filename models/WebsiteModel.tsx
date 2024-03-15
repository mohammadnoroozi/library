import BaseModel from "./base/BaseModel";

interface WebsiteModel extends BaseModel {
    culture: string,
    route: string,
    title: string,
    isDefault: boolean,
    headSection: string,
    bodyEndSection: string,
    managerUserIdList: string[]
}

export default WebsiteModel;
