import React from "react";
import PluginModel from "@/models/PluginModel";
import PluginEditorTemplates from "./_pluginEditorTabs/PluginEditorTemplates";
import PluginEditorCss from "./_pluginEditorTabs/PluginEditorCss";
import PluginEditorJs from "./_pluginEditorTabs/PluginEditorJs";
import PluginEditorFiles from "./_pluginEditorTabs/PluginEditorFiles";
import { getPluginEditor } from "@/helpers/PluginsHelper";
import ApiMessageModel from "@/models/base/ApiMessageModel";
import ApiDataModel from "@/models/base/ApiDataModel";
import WebsiteModel from "@/models/WebsiteModel";
import { t } from "@/components/Translations";
import PostHierarchyModel from "@/models/PostHierarchyModel";
import PluginEditorAdvance from "./_pluginEditorTabs/PluginEditorAdvance";

interface Props {
    tabName: string,
    needTemplateHelper: boolean,
    updatePlugin: (data: FormData) => Promise<ApiMessageModel | null>,
    deletePluginFiles: (path: string) => Promise<ApiMessageModel | null>,
    plugin: PluginModel,
    useWebsites: () => ApiDataModel<WebsiteModel[]> | undefined,
    useHierarchyPosts: (websiteId?: string) => ApiDataModel<PostHierarchyModel[]> | undefined
}



const PluginEditorContainer = ({
    plugin, tabName, needTemplateHelper, updatePlugin, deletePluginFiles, useWebsites, useHierarchyPosts
}: Props) => {

    return <>
        <input type="hidden" name='pluginId' value={plugin?.id || ''} />
        <input type="hidden" name='tabName' value={tabName} />
        <input type="text" name='title' defaultValue={plugin.title} className='form-control mb-3' placeholder={t("Plugin.title")} />
        {tabName === "default" && getPluginEditor(plugin, updatePlugin, useWebsites, useHierarchyPosts)}
        {tabName === "templates" && <PluginEditorTemplates plugin={plugin}
            needTemplateHelper={needTemplateHelper} />}
        {tabName === "css" && <PluginEditorCss plugin={plugin} />}
        {tabName === "js" && <PluginEditorJs plugin={plugin} />}
        {tabName === "files" && <PluginEditorFiles deletePluginFiles={deletePluginFiles} plugin={plugin} />}
        {tabName === "advance" && <PluginEditorAdvance plugin={plugin} />}
    </>;
};

export default PluginEditorContainer;
