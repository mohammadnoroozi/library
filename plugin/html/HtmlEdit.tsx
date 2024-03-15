import React from 'react';
import PluginModel from "@/models/PluginModel";
import Wysiwyg from "@/components/forms/fields/Wysiwyg";

interface Props {
    plugin: PluginModel
}



const HtmlEdit = ({ plugin }: Props) => {
    return <Wysiwyg name="parsedProperties.body" />;
};

export default HtmlEdit;
