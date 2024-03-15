import FileUploadModel from "@/models/base/FileUploadModel";

export interface AlbumProperties {
    items: AlbumItem[]
}

export interface AlbumItem {
    href?: string,
    title?: string,
    description?: string,
    mainFile?: FileUploadModel,
    thumbnail?: FileUploadModel,
}
