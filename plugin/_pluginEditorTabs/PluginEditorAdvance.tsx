import React from 'react';
import PluginModel from "@/models/PluginModel";
import PostHierarchyModel from "@/models/PostHierarchyModel";
import MultiSelect, { MultiSelectOptionProps } from "@/components/forms/fields/MultiSelect";
import { initSelectData } from "@/components/forms/fields/Select";
import Checkbox from "@/components/forms/fields/Checkbox";
import MultiSelectAsync from '@/components/forms/fields/MultiSelectAsync';
import { culturesSelectData } from '@/helpers/CulturesHelper';
import WebsiteServices from '@/extra/_services/_WebsiteServices';
import TagServices from '@/extra/_services/_TagServices';
import PostServices from '@/extra/_services/_PostServices';
import PluginServices from '@/extra/_services/_PluginServices';
import { useRouteStringParams } from '@/helpers/RouterHelper';

interface Props {
  plugin: PluginModel,
}



const PluginEditorAdvance = ({ plugin }: Props) => {
  // this tab is just for admin section, 
  // or if used in contents, data loaded from admin part are read - only, 
  // so we can use admin services directly

  const websites = WebsiteServices.useAll();
  const tags = TagServices.useAll();

  const allSelectedPostIds: string[] = [];
  plugin.justOnPosts?.forEach(p => allSelectedPostIds.push(p));
  plugin.ignoreOnPosts?.forEach(p => allSelectedPostIds.push(p));
  const selectedPosts = PostServices.useData({
    filter: {
      id: { op: 'in', value: allSelectedPostIds },
    }
  });
  const defaultPosts = selectedPosts?.data.map((post: PostHierarchyModel) => {
    return { value: post.id, label: post.menuTitle };
  })

  const usePosts = (
    inputValue: string,
    callback: (options: MultiSelectOptionProps[]) => void
  ) => {
    const data = PostServices.useData({
      filter: {
        metaTitle: { op: 'like', value: inputValue },
      }
    })
    const options = data?.data.map((post: PostHierarchyModel) => {
      return { value: post.id, label: post.menuTitle };
    });
    if (options && callback)
      callback(options)
  };

  const { templateId, pageId } = useRouteStringParams();

  const allSelectedPluginIds: string[] = [];
  plugin.justWithPlugins?.forEach(p => allSelectedPluginIds.push(p));
  plugin.ignoreWithPlugins?.forEach(p => allSelectedPluginIds.push(p));
  const selectedPlugins = PluginServices.useData(templateId, pageId, allSelectedPluginIds, undefined);
  const defaultPlugins = selectedPlugins?.data.map((plugin: PluginModel) => {
    return { value: plugin.id, label: plugin.title };
  })

  const usePlugins = (
    inputValue: string,
    callback: (options: MultiSelectOptionProps[]) => void
  ) => {
    const data = PluginServices.useData(templateId, pageId, undefined, inputValue)
    const options = data?.data.map((plugin: PluginModel) => {
      return { value: plugin.id, label: plugin.title || plugin.id };
    });
    if (options && callback)
      callback(options)
  };

  if (!websites || !tags) return <></>

  if (allSelectedPostIds.length && !defaultPosts) return <></>
  if (allSelectedPluginIds.length && !defaultPlugins) return <></>

  const websiteData = initSelectData(websites?.data, 'id', ['title', 'culture', 'route']);
  const tagsData = initSelectData(tags?.data, undefined, undefined);

  return <>
    <MultiSelect name="ignoreOnWebsites"
      items={websiteData}
      className="mb-3" />
    <MultiSelect name="justOnWebsites"
      items={websiteData}
      className="mb-5" />

    <MultiSelectAsync name="ignoreOnPosts"
      useOptions={usePosts}
      defaultOptions={defaultPosts}
      className="mb-3" />
    <MultiSelectAsync name="justOnPosts"
      useOptions={usePosts}
      defaultOptions={defaultPosts}
      className="mb-5" />

    <MultiSelect name="ignoreOnCultures"
      items={culturesSelectData}
      className="mb-3" />
    <MultiSelect name="justOnCultures"
      items={culturesSelectData}
      className="mb-5" />

    <MultiSelect name="ignoreWithTags"
      items={tagsData}
      className="mb-3" />
    <MultiSelect name="justWithTags"
      items={tagsData}
      className="mb-5" />

    <MultiSelectAsync name="ignoreWithPlugins"
      useOptions={usePlugins}
      defaultOptions={defaultPlugins}
      className="mb-3" />
    <MultiSelectAsync name="justWithPlugins"
      useOptions={usePlugins}
      defaultOptions={defaultPlugins}
      className="mb-5" />

    <Checkbox
      name='ignoreInDefaultPosts'
      className="mb-3" />
    <Checkbox
      name='justInDefaultPosts'
      className="mb-5" />

    <Checkbox
      name='ignoreInParentPosts'
      className="mb-3" />
    <Checkbox
      name='ignoreInLastChildPosts'
      className="mb-3" />
  </>
};

export default PluginEditorAdvance;
