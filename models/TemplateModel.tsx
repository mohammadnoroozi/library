import BaseModel from "@/models/base/BaseModel";
import TemplatePageModel from "./TemplatePageModel";

interface TemplateModel extends BaseModel {
    name: string,
    logoPath: string,
    previewImagePath: string,
    defaultTemplate: boolean,
    master: TemplatePageModel,
    sms: TemplatePageModel,
    email: TemplatePageModel,
    default: TemplatePageModel,
    pages: TemplatePageModel[],
}

export default TemplateModel;
