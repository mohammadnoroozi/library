import React from 'react';
import PluginModel from "@/models/PluginModel";
import MultiFileUpload from "@/components/forms/fields/MultiFileUpload";
import ApiMessageModel from '@/models/base/ApiMessageModel';

interface Props {
  deletePluginFiles: (path: string) => Promise<ApiMessageModel | null>,
  plugin: PluginModel
}



const PluginEditorFiles = ({ plugin, deletePluginFiles }: Props) => {

  return (
    <MultiFileUpload
      name='files'
      className='mb-3'
      deleteCallback={path => deletePluginFiles(path)} />
  );
};

export default PluginEditorFiles;
