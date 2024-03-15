import BaseModel from "./base/BaseModel";

export default interface PostHierarchyModel extends BaseModel {
    parentId?: string,
    metaTitle: string,
    menuTitle: string,
    publishStatus: ("Draft" | "Waiting" | "Published" | "Rejected"),
    children: PostHierarchyModel[],
}
