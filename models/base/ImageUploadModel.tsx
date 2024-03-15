import FileUploadModel from "./FileUploadModel";

interface ImageUploadModel {
    href?: string,
    title?: string,
    description?: string,
    thumbnail?: FileUploadModel,
    mainFile?: FileUploadModel,
}

export default ImageUploadModel;
