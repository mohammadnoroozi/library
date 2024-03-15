import React from 'react';
import PluginModel from "@/models/PluginModel";
import ApiDataModel from "@/models/base/ApiDataModel";
import WebsiteModel from "@/models/WebsiteModel";
import { getPluginProps } from "@/helpers/PluginsHelper";
import { SearchProperties } from './SearchProperties';

interface Props {
    plugin: PluginModel,
    useWebsite: (websiteId?: string | undefined) => ApiDataModel<WebsiteModel> | undefined,
}




const SearchPreview = ({ plugin, useWebsite }: Props) => {
    const props = getPluginProps<SearchProperties>(plugin);
    const website = useWebsite(props?.searchOnThisWebsiteId);
    return <>{website?.data?.title}</>;
};

export default SearchPreview;
