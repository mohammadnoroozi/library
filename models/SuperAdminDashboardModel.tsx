import BaseModel from "./base/BaseModel";
import WebsiteListModel from "./WebsiteListModel";

interface SuperAdminDashboardModel extends BaseModel {
    websites: WebsiteListModel[],
}

export default SuperAdminDashboardModel;
