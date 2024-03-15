import React from 'react';
import PluginModel from "@/models/PluginModel";
import ApiMessageModel from "@/models/base/ApiMessageModel";
import MultiImageUpload from "@/components/forms/fields/MultiImageUpload";
import { useRouteStringParams } from '@/helpers/RouterHelper';

interface Props {
    plugin: PluginModel,
    updatePlugin: (data: FormData) => Promise<ApiMessageModel | null>
}



const AlbumEdit = ({ updatePlugin }: Props) => {
    const { postId, pluginId } = useRouteStringParams();
    const deleteItem: (path: string) => Promise<ApiMessageModel | null> = (path: string) => {
        const formData = new FormData();
        formData.append('postId', postId ?? "");
        formData.append('pluginId', pluginId ?? "");
        formData.append('tabName', "default");
        formData.append('removed', path);
        return updatePlugin(formData);
    };
    return <MultiImageUpload name="parsedProperties.items" deleteCallback={path => deleteItem(path)} />;
};

export default AlbumEdit;
