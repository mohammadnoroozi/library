import React from 'react';
import PluginModel from "@/models/PluginModel";
import Ace from "@/components/forms/fields/Ace";

interface Props {
    plugin: PluginModel
}



const DynamicDataEdit = ({ plugin }: Props) => {
    return <Ace mode="json" name="parsedProperties.jsonData" />;
};

export default DynamicDataEdit;
