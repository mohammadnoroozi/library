import PluginModel from "./PluginModel";
import BaseModel from "./base/BaseModel";

export default interface PostModel extends BaseModel {
    showChildrenInMenu: boolean
    showInMenu: boolean
    showInSitemap: boolean,

    websiteId: string,
    templatePageId?: string,
    parentId?: string,

    slug: string,

    metaTitle: string,
    menuTitle?: string,
    metaDescription?: string,

    publishStatus: ("Draft" | "Waiting" | "Published" | "Rejected"),
    publishedOn?: string,
    unPublishedOn?: string,

    displayOrder: number,

    headSection?: string,
    bodyEndSection?: string,

    plugins: PluginModel[],

}
