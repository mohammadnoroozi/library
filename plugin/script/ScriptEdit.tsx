import React from 'react';
import PluginModel from "@/models/PluginModel";
import Ace from "@/components/forms/fields/Ace";

interface Props {
    plugin: PluginModel
}



const ScriptEdit = ({ plugin }: Props) => {
    return <Ace mode="html" name="parsedProperties.body" />;
};

export default ScriptEdit;
