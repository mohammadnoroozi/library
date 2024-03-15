import BaseModel from "./base/BaseModel";

interface WebsiteListModel extends BaseModel {
    id: string,
    postsCount: number,
    route: string,
    title: string,
    culture: string,
}

export default WebsiteListModel;
