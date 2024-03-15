import React from 'react';
import PluginModel from "@/models/PluginModel";
import ApiDataModel from "@/models/base/ApiDataModel";
import WebsiteModel from "@/models/WebsiteModel";
import Loading from "@/components/ui/Loading";
import Select, { initSelectData } from "@/components/forms/fields/Select";

interface Props {
    plugin: PluginModel,
    useWebsites: () => ApiDataModel<WebsiteModel[]> | undefined,
}



const SearchEdit = ({ plugin, useWebsites }: Props) => {
    const websites = useWebsites();

    if (!websites) {
        return <Loading>Wait for websites</Loading>
    }

    return <>
        <Select name="parsedProperties.searchOnThisWebsiteId"
            className="mb-3"
            items={initSelectData(websites?.data, 'id', ['title', 'culture', 'route'])} />
    </>;
};

export default SearchEdit;
