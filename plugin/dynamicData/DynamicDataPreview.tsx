import React from 'react';
import PluginModel from "@/models/PluginModel";
import { getPluginProps } from "@/helpers/PluginsHelper";
import { DynamicDataProperties } from "./DynamicDataProperties";

interface Props {
    plugin: PluginModel
}



const DynamicDataPreview = ({ plugin }: Props) => {
    const props = getPluginProps<DynamicDataProperties>(plugin);
    return <>{props?.jsonData ? "[ WITH JSON DATA ]" : "[ EMPTY DATA ]"}</>;
};

export default DynamicDataPreview;
