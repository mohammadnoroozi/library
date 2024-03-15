import React from 'react';
import PluginModel from "@/models/PluginModel";
import { getPluginProps } from "@/helpers/PluginsHelper";
import ApiDataModel from "@/models/base/ApiDataModel";
import WebsiteModel from "@/models/WebsiteModel";
import PostModel from "@/models/PostModel";
import { SearchViewProperties } from "./SearchViewProperties";

interface Props {
    plugin: PluginModel,
    useWebsite: (websiteId?: string | undefined) => ApiDataModel<WebsiteModel> | undefined,
    usePost: (postId?: string | undefined) => ApiDataModel<PostModel> | undefined
}



const SearchViewPreview = ({ plugin, useWebsite, usePost }: Props) => {
    const props = getPluginProps<SearchViewProperties>(plugin);
    const website = useWebsite(props?.resultWebsiteId);
    const post = usePost(props?.resultPostId);
    return <>{website?.data?.title} - {post?.data?.metaTitle}</>;
};

export default SearchViewPreview;
