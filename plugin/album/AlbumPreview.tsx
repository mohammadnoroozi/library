import React from 'react';
import PluginModel from "@/models/PluginModel";
import { getPluginProps } from "@/helpers/PluginsHelper";
import { AlbumItem, AlbumProperties } from "./AlbumProperties";
import ImageView from '@/components/ui/ImageView';

interface Props {
    plugin: PluginModel
}



const AlbumItemPreview = ({ item }: ({ item: AlbumItem })) => {
    return <div className="col-auto">
        <div className="border text-center bg-white px-3 py-2" title={item.title}>
            {item.mainFile && <ImageView src={item.mainFile?.keyName} className="d-block image-thumbnail" alt={item.title} />}
            <div className='text-truncate mw-100'>
                {item.title && item.href && <a className='link-dark d-block' href={item.href}>{item.title}</a>}
                {item.title && !item.href && <b className='d-block'>{item.title}</b>}
            </div>
        </div>
    </div>
}

const AlbumPreview = ({ plugin }: Props) => {
    const props = getPluginProps<AlbumProperties>(plugin);
    return <div className='row g-2 align-items-end'>
        {props?.items.map(item => <AlbumItemPreview key={item.mainFile?.keyName + "-" + item.href + "-" + item.title} item={item} />)}
    </div>;
};

export default AlbumPreview;
