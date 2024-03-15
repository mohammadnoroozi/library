export interface PostListModel {
    id: string,
    slug: string,
    menuTitle: string,
    parentId?: string,
    publishStatus?: string,
    isDefault: boolean,
    children?: PostListModel[],
}
