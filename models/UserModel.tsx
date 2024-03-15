import BaseModel from "@/models/base/BaseModel";

interface UserModel extends BaseModel {
    roles: string[],
    username: string,
    displayName: string,
    password: string,
    email: string,
    mobile: string,
    disabled: boolean,
    disabledMessage: string,
    disabledTo: Date,
    avatar: string,
}

export default UserModel;
