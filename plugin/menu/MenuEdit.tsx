import React, { useState } from 'react';
import PluginModel from "@/models/PluginModel";
import { getPluginProps } from "@/helpers/PluginsHelper";
import Loading from "@/components/ui/Loading";
import Select, { initSelectData } from "@/components/forms/fields/Select";
import { MenuProperties } from "./MenuProperties";
import ApiDataModel from '@/models/base/ApiDataModel';
import WebsiteModel from '@/models/WebsiteModel';
import PostHierarchyModel from '@/models/PostHierarchyModel';

interface Props {
    plugin: PluginModel,
    useWebsites: () => ApiDataModel<WebsiteModel[]> | undefined,
    useHierarchyPosts: (websiteId?: string) => ApiDataModel<PostHierarchyModel[]> | undefined
}



const MenuEdit = ({ plugin, useWebsites, useHierarchyPosts }: Props) => {
    const props = getPluginProps<MenuProperties>(plugin);
    const websites = useWebsites();

    const [website, setWebsite] = useState<string | undefined>(props?.websiteId)

    const posts = useHierarchyPosts(website ?? props?.websiteId);

    if (!websites) {
        return <Loading>Wait for websites</Loading>
    }

    if (props?.websiteId && !posts) {
        return <Loading>Wait for posts</Loading>
    }

    return <>
        <Select name="parsedProperties.websiteId"
            className="mb-3"
            items={initSelectData(websites?.data, 'id', ['title', 'culture', 'route'])}
            onChange={websiteId => setWebsite(websiteId)} />

        <Select name="parsedProperties.parentPostId"
            className="mb-3"
            items={initSelectData(posts?.data, 'id', 'menuTitle')} />
    </>;
};

export default MenuEdit;
