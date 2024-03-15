import React, { Fragment } from 'react'
import { t } from '@/components/Translations'
import { getVariant } from '@/helpers/ColorHelper'
import { plugins, PluginsProps } from '@/helpers/PluginsHelper'
import { humanize } from '@/helpers/StringHelper'

export interface PluginSelectorProps {
    onClick: (plugin: string) => any | void | undefined
}

export default function PluginSelector({ onClick }: PluginSelectorProps) {
    return (
        <>{Object.keys(plugins).map(title => <Fragment key={title}>
            <h2 className={`d-inline-block mt-5 mb-4 border-bottom text-${getVariant()} border-secondary`}>
                {t(`PluginGroup.${title}`)}
            </h2>
            <div className="row g-3">
                {plugins[title as keyof PluginsProps].map(plugin => <div key={`${title}_${plugin}`}
                    className='col-6 col-sm-4 col-md-3 col-lg-2'>
                    <button className={`btn btn-outline-${getVariant()} w-100 py-5 text-nowrap text-truncate`}
                        onClick={() => onClick(plugin)}>
                        {t(`Plugin.${plugin}`)}<br />
                        <small className="text-uppercase">[ {humanize(plugin)} ]</small>
                    </button>
                </div>)}
            </div>
        </Fragment>
        )}</>
    )
}
