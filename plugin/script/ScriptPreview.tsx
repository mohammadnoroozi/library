import React from 'react';
import PluginModel from "@/models/PluginModel";
import { ScriptProperties } from "./ScriptProperties";
import { getPluginProps } from "@/helpers/PluginsHelper";

interface Props {
    plugin: PluginModel
}



const ScriptPreview = ({ plugin }: Props) => {
    const props = getPluginProps<ScriptProperties>(plugin);
    return <div dangerouslySetInnerHTML={{ __html: props?.body ?? "" }} />;
};

export default ScriptPreview;
