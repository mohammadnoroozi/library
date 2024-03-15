import React from 'react';
import PluginModel from "@/models/PluginModel";
import { getPluginProps } from "@/helpers/PluginsHelper";
import { t, tf } from "@/components/Translations";
import ApiDataModel from '@/models/base/ApiDataModel';
import WebsiteModel from '@/models/WebsiteModel';
import PostModel from '@/models/PostModel';
import { TopPostsProperties } from "./TopPostsProperties";

interface Props {
    plugin: PluginModel,
    useWebsite: (websiteId?: string | undefined) => ApiDataModel<WebsiteModel> | undefined,
    usePost: (postId?: string | undefined) => ApiDataModel<PostModel> | undefined
}



const TopPostsPreview = ({ plugin, useWebsite, usePost }: Props) => {
    const props = getPluginProps<TopPostsProperties>(plugin);
    const website = useWebsite(props?.websiteId);
    const post = usePost(props?.parentPostId);
    return <>{website?.data?.title} - {post?.data?.metaTitle ?? t("Not selected")} {tf("Plugin.topPosts.range")(props)}</>;
};

export default TopPostsPreview;
