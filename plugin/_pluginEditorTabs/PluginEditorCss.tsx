import React from 'react';
import PluginModel from "@/models/PluginModel";
import Ace from "@/components/forms/fields/Ace";

interface Props { plugin: PluginModel }



const PluginEditorCss = ({ plugin }: Props) => {

  return <Ace mode="css" name='css' />;
};

export default PluginEditorCss;
