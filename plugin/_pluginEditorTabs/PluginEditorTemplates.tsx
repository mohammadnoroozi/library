import React from 'react';
import PluginModel from "@/models/PluginModel";
import Ace from "@/components/forms/fields/Ace";

interface Props {
    plugin: PluginModel,
    needTemplateHelper: boolean
}



const PluginEditorTemplates = ({ plugin, needTemplateHelper }: Props) => {

    return <>
        <Ace mode="html" name='template' />
        {needTemplateHelper && <Ace mode="html" name='templateHelper' />}
    </>;
};

export default PluginEditorTemplates;
