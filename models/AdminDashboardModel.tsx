import BaseModel from "@/models/base/BaseModel";

interface AdminDashboardModel extends BaseModel {
    usersCount: number,
    templatesCount: number,
    websitesCount: number,
}

export default AdminDashboardModel;
