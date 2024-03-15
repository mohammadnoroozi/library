import React from 'react';
import pluginModel from "@/models/PluginModel";
import { Pencil, Trash, ArrowUp, ArrowDown } from "react-bootstrap-icons";
import Button from "@/components/forms/fields/Button";
import { camelCase, humanize } from "@/helpers/StringHelper";
import { t } from "@/components/Translations";
import ApiDataModel from '@/models/base/ApiDataModel';
import WebsiteModel from '@/models/WebsiteModel';
import PostModel from '@/models/PostModel';
import { getPluginPreview } from '@/helpers/PluginsHelper';
import Link from 'next/link';

interface Props {
    url: string,
    plugin: pluginModel,
    deletePlugin: () => Promise<ApiDataModel<any> | null>,
    setPluginOrder: (up: boolean) => Promise<ApiDataModel<any> | null>,
    useWebsite: (websiteId?: string | undefined) => ApiDataModel<WebsiteModel> | undefined,
    usePost: (postId?: string | undefined) => ApiDataModel<PostModel> | undefined
}

const PluginPreviewContainer = ({
    url, plugin, deletePlugin, setPluginOrder, useWebsite, usePost
}: Props) => {
    return <div className="border mb-3 p-2 rounded">
        <div className="d-flex align-items-center mb-1">
            <h2 className="fw-bold m-0">{t(`Plugin.${camelCase(plugin?.name)}`)}</h2>
            {plugin.title && <div className="ms-3">{plugin.title}</div>}
            <small className="me-2 text-uppercase text-muted ms-auto">[ {humanize(plugin?.name)} ]</small>
            <Button variant="secondary" className="btn-sm me-2" onClick={() => setPluginOrder(true)}><ArrowUp /></Button>
            <Button variant="secondary" className="btn-sm me-2"
                onClick={() => setPluginOrder(false)}><ArrowDown /></Button>
            <Link className="btn btn-sm btn-info me-2"
                href={url}>
                <Pencil />
            </Link>
            <Button variant="danger" className="btn-sm" onClick={() => {
                if (confirm(t("Delete plugin?"))) {
                    return deletePlugin();
                }
            }}><Trash />
            </Button>
        </div>
        {getPluginPreview(plugin, useWebsite, usePost)}
    </div>;
};

export default PluginPreviewContainer;
