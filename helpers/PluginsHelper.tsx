import React, { ReactElement } from "react";
import AlbumEdit from "@/plugin/album/AlbumEdit";
import ArchiveEdit from "@/plugin/archive/ArchiveEdit";
import BackToParentEdit from "@/plugin/backToParent/BackToParentEdit";
import BreadcrumbEdit from "@/plugin/breadcrumb/BreadcrumbEdit";
import CalendarEdit from "@/plugin/calendar/CalendarEdit";
import CategoryTreeEdit from "@/plugin/categoryTree/CategoryTreeEdit";
import CultureEdit from "@/plugin/culture/CultureEdit";
import DataTableEdit from "@/plugin/dataTable/DataTableEdit";
import HtmlEdit from "@/plugin/html/HtmlEdit";
import MenuEdit from "@/plugin/menu/MenuEdit";
import PostAuthorEdit from "@/plugin/postAuthor/PostAuthorEdit";
import PostChildrenEdit from "@/plugin/postChildren/PostChildrenEdit";
import PostTitleEdit from "@/plugin/postTitle/PostTitleEdit";
import ScriptEdit from "@/plugin/script/ScriptEdit";
import TopPostsEdit from "@/plugin/topPosts/TopPostsEdit";
import WebserviceEdit from "@/plugin/webservice/WebserviceEdit";
import AlbumPreview from "@/plugin/album/AlbumPreview";
import ArchivePreview from "@/plugin/archive/ArchivePreview";
import BackToParentPreview from "@/plugin/backToParent/BackToParentPreview";
import BreadcrumbPreview from "@/plugin/breadcrumb/BreadcrumbPreview";
import CalendarPreview from "@/plugin/calendar/CalendarPreview";
import CategoryTreePreview from "@/plugin/categoryTree/CategoryTreePreview";
import CulturePreview from "@/plugin/culture/CulturePreview";
import DataTablePreview from "@/plugin/dataTable/DataTablePreview";
import HtmlPreview from "@/plugin/html/HtmlPreview";
import MenuPreview from "@/plugin/menu/MenuPreview";
import PostAuthorPreview from "@/plugin/postAuthor/PostAuthorPreview";
import PostChildrenPreview from "@/plugin/postChildren/PostChildrenPreview";
import PostTitlePreview from "@/plugin/postTitle/PostTitlePreview";
import ScriptPreview from "@/plugin/script/ScriptPreview";
import TopPostsPreview from "@/plugin/topPosts/TopPostsPreview";
import WebservicePreview from "@/plugin/webservice/WebservicePreview";
import LoginStatusEdit from "@/plugin/loginStatus/LoginStatusEdit";
import LoginStatusPreview from "@/plugin/loginStatus/LoginStatusPreview";
import DynamicDataEdit from "@/plugin/dynamicData/DynamicDataEdit";
import DynamicDataPreview from "@/plugin/dynamicData/DynamicDataPreview";
import SearchViewEdit from "@/plugin/searchView/SearchViewEdit";
import SearchViewPreview from "@/plugin/searchView/SearchViewPreview";
import SearchEdit from "@/plugin/search/SearchEdit";
import SearchPreview from "@/plugin/search/SearchPreview";

import PluginModel from "@/models/PluginModel";
import PostModel from "@/models/PostModel";
import ApiMessageModel from "@/models/base/ApiMessageModel";
import ApiDataModel from "@/models/base/ApiDataModel";
import WebsiteModel from "@/models/WebsiteModel";
import PostHierarchyModel from "@/models/PostHierarchyModel";
import TemplatePageModel from "@/models/TemplatePageModel";

export const getPluginFromPost = (post: PostModel | undefined, pluginId?: string | undefined): PluginModel | undefined => {
    if (!post) return undefined;
    if (!pluginId) return undefined;
    let currentPlugin: PluginModel | undefined = undefined;
    post.plugins?.forEach(plugin => {
        if (plugin.id === pluginId) {
            currentPlugin = plugin;
        }
    });
    return currentPlugin;
}


export const getPluginFromTemplate = (post: TemplatePageModel | undefined, pluginId?: string | undefined): PluginModel | undefined => {
    if (!post) return undefined;
    if (!pluginId) return undefined;
    let currentPlugin: PluginModel | undefined = undefined;
    post.plugins?.forEach(plugin => {
        if (plugin.id === pluginId) {
            currentPlugin = plugin;
        }
    });
    return currentPlugin;
}



export type PluginsProps = {
    content: string[],
    culture: string[],
    post: string[],
    user: string[],
    posts: string[],
    navigation: string[],
    advance: string[],
    search: string[],
}

export const plugins: PluginsProps = {
    content: [
        "html", "album", "script"
    ],
    culture: [
        "culture", "calendar"
    ],
    user: [
        "loginStatus"
    ],
    post: [
        "postTitle", "postAuthor"
    ],
    posts: [
        "topPosts", "postChildren"
    ],
    navigation: [
        "categoryTree", "menu", "archive", "backToParent", "breadcrumb"
    ],
    advance: ["webservice", "dataTable", "dynamicData"],
    search: ["searchView", "search"]
};


export const getPluginEditor = (plugin: PluginModel,
    updatePlugin: (data: FormData) => Promise<ApiMessageModel | null>,
    useWebsites: () => ApiDataModel<WebsiteModel[]> | undefined,
    useHierarchyPosts: (websiteId?: string) => ApiDataModel<PostHierarchyModel[]> | undefined): ReactElement<any, any> => {
    switch (plugin.name) {
        case "Album":
            return <AlbumEdit plugin={plugin} updatePlugin={updatePlugin} />
        case "Archive":
            return <ArchiveEdit plugin={plugin} useWebsites={useWebsites} useHierarchyPosts={useHierarchyPosts} />
        case "BackToParent":
            return <BackToParentEdit plugin={plugin} />
        case "Breadcrumb":
            return <BreadcrumbEdit plugin={plugin} />
        case "Calendar":
            return <CalendarEdit plugin={plugin} />
        case "CategoryTree":
            return <CategoryTreeEdit plugin={plugin} useWebsites={useWebsites} useHierarchyPosts={useHierarchyPosts} />
        case "Culture":
            return <CultureEdit plugin={plugin} />
        case "LoginStatus":
            return <LoginStatusEdit plugin={plugin} />
        case "DataTable":
            return <DataTableEdit plugin={plugin} />
        case "DynamicData":
            return <DynamicDataEdit plugin={plugin} />
        case "Html":
            return <HtmlEdit plugin={plugin} />
        case "Menu":
            return <MenuEdit plugin={plugin} useWebsites={useWebsites} useHierarchyPosts={useHierarchyPosts} />
        case "PostAuthor":
            return <PostAuthorEdit plugin={plugin} />
        case "PostChildren":
            return <PostChildrenEdit plugin={plugin} useWebsites={useWebsites} useHierarchyPosts={useHierarchyPosts} />
        case "PostTitle":
            return <PostTitleEdit plugin={plugin} />
        case "Script":
            return <ScriptEdit plugin={plugin} />
        case "TopPosts":
            return <TopPostsEdit plugin={plugin} useWebsites={useWebsites} useHierarchyPosts={useHierarchyPosts} />
        case "Webservice":
            return <WebserviceEdit plugin={plugin} />
        case "SearchView":
            return <SearchViewEdit plugin={plugin} useWebsites={useWebsites} useHierarchyPosts={useHierarchyPosts} />
        case "Search":
            return <SearchEdit plugin={plugin} useWebsites={useWebsites} />
        default:
            return <div>Editor not found</div>;
    }
}

export const getPluginPreview = (plugin: PluginModel,
    useWebsite: (websiteId?: string | undefined) => ApiDataModel<WebsiteModel> | undefined,
    usePost: (postId?: string | undefined) => ApiDataModel<PostModel> | undefined): ReactElement<any, any> => {
    switch (plugin.name) {
        case "Album":
            return <AlbumPreview plugin={plugin} />
        case "Archive":
            return <ArchivePreview plugin={plugin} useWebsite={useWebsite} usePost={usePost} />
        case "BackToParent":
            return <BackToParentPreview plugin={plugin} />
        case "Breadcrumb":
            return <BreadcrumbPreview plugin={plugin} />
        case "Calendar":
            return <CalendarPreview plugin={plugin} />
        case "CategoryTree":
            return <CategoryTreePreview plugin={plugin} useWebsite={useWebsite} usePost={usePost} />
        case "Culture":
            return <CulturePreview plugin={plugin} />
        case "LoginStatus":
            return <LoginStatusPreview plugin={plugin} />
        case "DataTable":
            return <DataTablePreview plugin={plugin} />
        case "DynamicData":
            return <DynamicDataPreview plugin={plugin} />
        case "Html":
            return <HtmlPreview plugin={plugin} />
        case "Menu":
            return <MenuPreview plugin={plugin} useWebsite={useWebsite} usePost={usePost} />
        case "PostAuthor":
            return <PostAuthorPreview plugin={plugin} />
        case "PostChildren":
            return <PostChildrenPreview plugin={plugin} useWebsite={useWebsite} usePost={usePost} />
        case "PostTitle":
            return <PostTitlePreview plugin={plugin} />
        case "Script":
            return <ScriptPreview plugin={plugin} />
        case "TopPosts":
            return <TopPostsPreview plugin={plugin} useWebsite={useWebsite} usePost={usePost} />
        case "Webservice":
            return <WebservicePreview plugin={plugin} />
        case "SearchView":
            return <SearchViewPreview plugin={plugin} useWebsite={useWebsite} usePost={usePost} />
        case "Search":
            return <SearchPreview plugin={plugin} useWebsite={useWebsite} />
        default:
            return <div>Viewer not found</div>;
    }
}

export function getPluginProps<T>(plugin: PluginModel): T | undefined {
    if (!plugin) {
        return undefined;
    }
    if (!plugin.properties) {
        return undefined;
    }
    return JSON.parse(plugin.properties) as T;
}

export function parsePluginProps<T>(plugin: PluginModel): PluginModel | undefined {
    if (!plugin) {
        return undefined;
    }
    if (!plugin.properties) {
        return undefined;
    }

    plugin.parsedProperties = JSON.parse(plugin.properties) as T;

    return plugin;
}
