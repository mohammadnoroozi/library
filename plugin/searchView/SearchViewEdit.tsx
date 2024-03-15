import React, { useState } from 'react';
import PluginModel from "@/models/PluginModel";
import ApiDataModel from '@/models/base/ApiDataModel';
import WebsiteModel from '@/models/WebsiteModel';
import PostHierarchyModel from '@/models/PostHierarchyModel';
import Loading from "@/components/ui/Loading";
import Select, { initSelectData } from "@/components/forms/fields/Select";
import { SearchViewProperties } from "./SearchViewProperties";
import { getPluginProps } from "@/helpers/PluginsHelper";

interface Props {
    plugin: PluginModel,
    useWebsites: () => ApiDataModel<WebsiteModel[]> | undefined,
    useHierarchyPosts: (websiteId?: string) => ApiDataModel<PostHierarchyModel[]> | undefined
}



const SearchViewEdit = ({ plugin, useWebsites, useHierarchyPosts }: Props) => {
    const props = getPluginProps<SearchViewProperties>(plugin);
    const websites = useWebsites();

    const [website, setWebsite] = useState<string | undefined>(props?.resultWebsiteId)

    const posts = useHierarchyPosts(website ?? props?.resultWebsiteId);

    if (!websites) {
        return <Loading>Wait for websites</Loading>
    }

    if (props?.resultWebsiteId && !posts) {
        return <Loading>Wait for posts</Loading>
    }

    return <>
        <Select name="parsedProperties.resultWebsiteId"
            className="mb-3"
            items={initSelectData(websites?.data, 'id', ['title', 'culture', 'route'])}
            onChange={websiteId => setWebsite(websiteId)} />

        <Select name="parsedProperties.resultPostId"
            className="mb-3"
            items={initSelectData(posts?.data, 'id', 'menuTitle')} />

    </>;
};

export default SearchViewEdit;
