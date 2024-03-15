import React from 'react';
import PluginModel from "@/models/PluginModel";
import { getPluginProps } from "@/helpers/PluginsHelper";
import { HtmlProperties } from "./HtmlProperties";

interface Props {
    plugin: PluginModel
}



const HtmlPreview = ({ plugin }: Props) => {
    const props = getPluginProps<HtmlProperties>(plugin);
    return <div dangerouslySetInnerHTML={{ __html: props?.body ?? "" }} />;
};

export default HtmlPreview;
