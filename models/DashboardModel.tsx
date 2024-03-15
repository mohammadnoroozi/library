import BaseModel from "./base/BaseModel";
import WebsiteListModel from "./WebsiteListModel";

interface DashboardModel extends BaseModel {
    websites: WebsiteListModel[],
}

export default DashboardModel;
