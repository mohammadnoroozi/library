import React from 'react';
import PluginModel from "@/models/PluginModel";
import { getPluginProps } from "@/helpers/PluginsHelper";
import { DataTableProperties } from "./DataTableProperties";

interface Props {
    plugin: PluginModel
}



const DataTablePreview = ({ plugin }: Props) => {
    const props = getPluginProps<DataTableProperties>(plugin);
    return <>{props?.fileName}</>;
};

export default DataTablePreview;
