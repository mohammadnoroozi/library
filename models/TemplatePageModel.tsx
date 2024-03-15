import BaseModel from "./base/BaseModel";
import PluginModel from "./PluginModel";

interface TemplatePageModel extends BaseModel {
    name: string,
    headSection: string,
    content: string,
    bodyEndSection: string,
    css: string,
    js: string,
    files: string[],
    plugins: PluginModel[],
}

export default TemplatePageModel;
