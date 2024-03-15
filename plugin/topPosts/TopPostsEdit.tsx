import React, { useState } from 'react';
import PluginModel from "@/models/PluginModel";
import { getPluginProps } from "@/helpers/PluginsHelper";
import Loading from "@/components/ui/Loading";
import Select, { initSelectData } from "@/components/forms/fields/Select";
import { TopPostsProperties } from "./TopPostsProperties";
import { t } from "@/components/Translations";
import Input from "@/components/forms/fields/Input";
import ApiDataModel from '@/models/base/ApiDataModel';
import WebsiteModel from '@/models/WebsiteModel';
import PostHierarchyModel from '@/models/PostHierarchyModel';

interface Props {
    plugin: PluginModel,
    useWebsites: () => ApiDataModel<WebsiteModel[]> | undefined,
    useHierarchyPosts: (websiteId?: string) => ApiDataModel<PostHierarchyModel[]> | undefined

}



const TopPostsEdit = ({ plugin, useWebsites, useHierarchyPosts }: Props) => {
    const props = getPluginProps<TopPostsProperties>(plugin);
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

        <Select name="parsedProperties.mode"
            className="mb-3"
            items={[
                { value: "new", label: t("Plugin.topPosts.mode.new") },
                { value: "mostViewed", label: t("Plugin.topPosts.mode.mostViewed") },
            ]} />

        <Input name="parsedProperties.skipCount"
            type="number"
            className="mb-3"
            validation={{ required: true }} />

        <Input name="parsedProperties.takeCount"
            type="number"
            className="mb-3"
            validation={{ required: true }} />
    </>;
};

export default TopPostsEdit;
