import React from 'react';
import PluginModel from "@/models/PluginModel";
import FileUpload from "@/components/forms/fields/FileUpload";

interface Props {
    plugin: PluginModel
}



const DataTableEdit = ({ plugin }: Props) => {
    return <FileUpload name="parsedProperties.file" />;
};

export default DataTableEdit;
