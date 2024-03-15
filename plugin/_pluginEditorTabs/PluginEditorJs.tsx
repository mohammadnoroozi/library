import React from 'react';
import PluginModel from "@/models/PluginModel";
import Ace from "@/components/forms/fields/Ace";

interface Props { plugin: PluginModel }



const PluginEditorJs = ({ plugin }: Props) => {

  return <Ace mode="javascript" name='js' />;
};

export default PluginEditorJs;
