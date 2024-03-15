import TemplateModel from "@/models/TemplateModel";
import TemplatePageModel from "@/models/TemplatePageModel";

export const getPage = (template: TemplateModel | undefined, pageId?: string | undefined): TemplatePageModel | undefined => {
    if (!template) return undefined;
    if (!pageId) return {
        name: '',
        headSection: '',
        content: '',
        bodyEndSection: '',
        css: '',
        js: '',
        files: [],
        plugins: [],
        id: ''
    };
    if (template.master.id === pageId) return template.master;
    if (template.sms.id === pageId) return template.sms;
    if (template.email.id === pageId) return template.email;
    if (template.default.id === pageId) return template.default;

    let templatePage = undefined;
    template.pages.forEach(page => {
        if (page.id === pageId) {
            templatePage = page;
        }
    });

    return templatePage;
}
