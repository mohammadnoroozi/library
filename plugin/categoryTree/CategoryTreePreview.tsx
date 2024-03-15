import React from 'react';
import PluginModel from "@/models/PluginModel";
import { getPluginProps } from "@/helpers/PluginsHelper";
import { t } from "@/components/Translations";
import { CategoryTreeProperties } from "./CategoryTreeProperties";
import ApiDataModel from '@/models/base/ApiDataModel';
import WebsiteModel from '@/models/WebsiteModel';
import PostModel from '@/models/PostModel';

interface Props {
    plugin: PluginModel,
    useWebsite: (websiteId?: string | undefined) => ApiDataModel<WebsiteModel> | undefined,
    usePost: (postId?: string | undefined) => ApiDataModel<PostModel> | undefined
}



const CategoryTreePreview = ({ plugin, useWebsite, usePost }: Props) => {
    const props = getPluginProps<CategoryTreeProperties>(plugin);
    const website = useWebsite(props?.websiteId);
    const post = usePost(props?.parentPostId);
    return <>{website?.data?.title} - {post?.data?.metaTitle ?? t("Not selected")}</>;
};

export default CategoryTreePreview;
