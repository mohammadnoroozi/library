
interface PluginModel {
    id: string,
    definitionId: string,
    name: string,
    title: string,
    templatePart: string,
    template: string,
    templateHelper: string,
    css: string,
    js: string,
    files: string[],
    properties: string,
    parsedProperties?: any,
    displayOrder: number,

    ignoreOnWebsites: string[],
    justOnWebsites: string[],

    ignoreOnPosts: string[],
    justOnPosts: string[],

    ignoreWithPlugins: string[],
    justWithPlugins: string[],

    ignoreWithTags: string[],
    justWithTags: string[],

    ignoreOnCultures: string[],
    justOnCultures: string[],

    ignoreInLastChildPosts: boolean,
    ignoreInParentPosts: boolean,
    ignoreInDefaultPosts: boolean,
    justInDefaultPosts: boolean,
}

export default PluginModel;
