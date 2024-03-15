import { camelCase } from "@/helpers/StringHelper";

type translationsType = {
    [key: string]: string | ((params: any) => string)
}
const translations: translationsType = {
    "Company": "دانشگاه صنعتی قم",
    "Company home": "صفحه اصلی",
    "Company description": "پرتال محتوا",
    "Company domain": "qut.ac.ir",
    "Back to site": "بازگشت به وب سایت",
    "Dashboard": "داشبورد",
    "AdminDashboard": "داشبورد مدیریت",
    "SuperAdminDashboard": "داشبورد مدیریت پایه",
    "ContentsDashboard": "داشبورد محتوا",

    "Not found page": "404",
    "Page not found": "صفحه ای که به دنبال آن بودید پیدا نشد",
    "Return to dashboard": "بازگشت به دشبورد",

    "User account": "حساب کاربری",
    "Logout": "خروج",
    "Logout page": "خروج از حساب کاربری",
    "Are you logging out?": "از حساب کاربری خود خارج می شوید؟",

    //Error page
    "Error page": "500",
    "Error page method-not-allowed": "405",
    "Error page service-unavailable": "503",
    "Error page bad-request": "400",
    "Error occur": "خطایی رخ داده است",
    "Error occur method-not-allowed": "عملیات مورد نظر شما مجاز نیست",
    "Error occur service-unavailable": "سرور سایت در دسترس نیست",
    "Error occur bad-request": "اطلاعات ارسالی شما صحیح نیست",

    // dirty modal
    'Leaving page': 'خروج از صفحه',
    'You have entered data that will be lost if you exit the page': 'شما اطلاعات ذخیره نشده دارید. \nدر صورت ترک صفحه، این اطلاعات از بین می روند.',
    'Leave page': 'تغییراتم مهم نیست، خارج می شوم',
    'Stay in page': 'خارج نمی شوم',

    // Fields
    'Please select one item': 'لطفا انتخاب کنید ...',
    'Not selected': 'انتخاب نشده',

    // Confirm modal
    'Ok': 'بله',
    'Cancel': 'خیر',
    'Are you sure?': 'آیا اطمینان دارید؟',
    'Delete current item': 'حذف اطلاعات',
    'Delete plugin?': 'آیا پلاگین حذف شود؟',
    'Delete file?': 'آیا فایل حذف شود؟',
    'Delete image?': 'آیا تصویر حذف شود؟',

    // MODEL PROPS ====================================
    'Culture.fa': 'فارسی',
    'Culture.en': 'انگلیسی',
    'Culture.ar': 'عربی',

    'Configuration': 'تنظیمات',

    'Website.editPosts': ({ website }): string => `مدیریت پست های : '${website}'`,
    'Post': 'پست',

    'Post.templatePageId': 'قالب سفارشی',
    'Post.isDefault': 'صفحه پیش فرض باشد',
    'Post.logoPath': 'لوگو',
    'Post.slug': 'آدرس',
    'Post.metaTitle': 'عنوان صفحه',
    'Post.menuTitle': 'عنوان در منو',
    'Post.metaDescription': 'توضیحات صفحه',
    'Post.publishStatus': 'وضعیت انتشار',
    'Post.publishedOn': 'تاریخ انتشار',
    'Post.unPublishedOn': 'تاریخ انقضا',
    'Post.showInSitemap': 'نمایش در نقشه سایت',
    'Post.showInMenu': 'نمایش در منو',
    'Post.showChildrenInMenu': 'نمایش فرزندان در منو',
    'Post.headSection': 'اسکریپت تگ Head',
    'Post.bodyEndSection': 'اسکریپت انتهای صفحه',
    'Post.extraJsonData': 'دیتای JSON',
    'Post.tags': 'تگ ها',
    'Post.tags.sample': 'پست خبری',

    'Posts': 'پست ها',
    'Post.addNewPost': 'ثبت پست جدید',
    'Post.editPlugins': ({ post, plugin }): string => `ویرایش پلاگین '${t(`Plugin.${camelCase(plugin)}`)}' از پست '${post}'`,
    'Post.editPost': ({ post }): string => `ویرایش : ${post}`,
    'Post.editPostPlugins': ({ post }): string => `ویرایش پلاگین های : ${post}`,
    'Post.editPostOfWebsite': ({ website }): string => `از وب سایت : ${website}`,

    'Post.suggestPost': ({ post }): string => `پیشنهاد پست به وب سایت دیگر یا جابجایی در سایت جاری : ${post}`,
    'Post.destinationWebsiteId': "وب سایت مقصد",
    'Post.destinationParentId': "صفحه پدر مقصد",
    'Post.clone': "پست در مقصد کپی شود (در مکان کنونی هم باقی بماند)",
    'Post.redirectUrl': "صفحه مقصد",

    'Plugin.addNew': 'افزودن پلاگین جدید',

    'Plugin.definitionId': 'قالب انتخابی',
    'Plugin.template': 'قالب',
    'Plugin.title': 'عنوان نمایشی پلاگین',
    'Plugin.templateHelper': 'قالب جانبی',
    'Plugin.css': 'محتوای Css-Scss',
    'Plugin.js': 'محتوای Js',
    'Plugin.files': 'فایل ها',

    'Plugin.defaultTab': 'مشخصات',
    'Plugin.templatesTab': 'قالب ها',
    'Plugin.cssTab': 'محتوای Css-Scss',
    'Plugin.jsTab': 'محتوای Js',
    'Plugin.filesTab': 'فایل ها',
    'Plugin.advanceTab': 'تنظیمات نمایش',

    'PublishStatus.draft': 'پیش نویس',
    'PublishStatus.waiting': 'در انتظار',
    'PublishStatus.published': 'منتشر شده',
    'PublishStatus.rejected': 'عدم تایید',

    'PluginGroup.content': 'محتوا',
    'PluginGroup.culture': 'زبان و تقویم',
    'PluginGroup.post': 'محتوای پست',
    'PluginGroup.user': 'کاربران',
    'PluginGroup.posts': 'پست ها',
    'PluginGroup.navigation': 'راهبری',
    'PluginGroup.advance': 'پیشرفته',
    'PluginGroup.search': 'جستجو',

    'Plugin.html': 'متن',
    'Plugin.image': 'عکس',
    'Plugin.album': 'عکس / آلبوم / لینک',
    'Plugin.file': 'فایل',
    'Plugin.script': 'اسکریپت',
    'Plugin.culture': 'زبان',
    'Plugin.loginStatus': 'وضعیت لاگین',
    'Plugin.calendar': 'تقویم',
    'Plugin.postTitle': 'عنوان',
    'Plugin.postAuthor': 'نویسنده',
    'Plugin.topPosts': 'منتخب ها',
    'Plugin.events': 'رویداد ها',
    'Plugin.organizationChart': 'چارت سازمانی',
    'Plugin.postChildren': 'فرزندان صفحه',
    'Plugin.categoryTree': 'دسته بندی',
    'Plugin.menu': 'منو',
    'Plugin.archive': 'آرشیو',
    'Plugin.backToParent': 'بازگشت',
    'Plugin.breadcrumb': 'نوار ناوبری',
    'Plugin.webservice': 'وب سرویس',
    'Plugin.dataTable': 'دیتا',
    'Plugin.dynamicData': 'دیتای متغیر (json)',
    'Plugin.search': 'نتایج جستجو',
    'Plugin.searchView': 'نوار جستجو',

    'Plugin.topPosts.range': ({ skipCount, takeCount, mode }): string => `از پست ${skipCount} به تعداد ${takeCount} پست با اولویت ${t(`Plugin.topPosts.mode.${mode}`)}`,
    'Plugin.topPosts.mode.new': 'جدید ترین ها',
    'Plugin.topPosts.mode.mostViewed': 'پر بازدید ها',

    'Plugin.ignoreOnWebsites': 'عدم نمایش در وب سایت های',
    'Plugin.justOnWebsites': 'نمایش فقط در وب سایت های',

    'Plugin.justInDefaultPosts': 'نمایش فقط در صفحات پیش فرض',
    'Plugin.ignoreInDefaultPosts': 'عدم نمایش در صفحات پیش فرض',

    'Plugin.ignoreOnPosts': 'عدم نمایش در پست های',
    'Plugin.justOnPosts': 'نمایش فقط در پست های',

    'Plugin.ignoreOnCultures': 'عدم نمایش در زبان های',
    'Plugin.justOnCultures': 'نمایش فقط در زبان های',

    'Plugin.ignoreWithTags': 'عدم نمایش در تگ های',
    'Plugin.justWithTags': 'نمایش فقط در تگ های',

    'Plugin.ignoreWithPlugins': 'عدم نمایش به همراه پلاگین های',
    'Plugin.justWithPlugins': 'نمایش فقط به همراه پلاگین های',

    'Plugin.ignoreInParentPosts': 'نمایش فقط در صفحات دارای فرزند',
    'Plugin.ignoreInLastChildPosts': 'عدم نمایش در صفحات دارای فرزند',

    'PluginDefinitions': 'حالت نمایشی پلاگینها',
    'PluginDefinition.new': 'حالت نمایشی جدید',
    'PluginDefinitions.list': ({ name }): string => `حالت های نمایشی '${t(`Plugin.${name}`)}'`,

    'Website': 'وب سایت',
    'Website.route': 'آدرس',
    'Website.isDefault': 'وب سایت پیش فرض باشد',
    'Website.culture': 'زبان',
    'Website.title': 'عنوان',
    'Website.managerUserIdList': 'مدیران وب سایت',
    'Website.templatePageId': 'قالب انتخابی',
    'Website.headSection': 'تگ head',
    'Website.bodyEndSection': 'اسکریپت انتهای بدنه',
    'Website.extraJsonData': 'دیتای JSON',
    'Website.tags': 'تگ ها',
    'Website.tags.news': 'سایت خبری',

    'Template': 'قالب',
    'Template.name': 'نام',
    'Template.logoPath': 'لوگو',
    'Template.previewImagePath': 'پیش نمایش',
    'Template.editPage': ({ template, templatePage }): string => `ویرایش صفحه ${templatePage} از قالب ${template}`,
    'Template.selectPage': ({ template }): string => `انتخاب صفحه از قالب ${template}`,
    'Template.goToPages': 'صفحه های قالب',
    'Template.addNewPage': 'افزودن صفحه جدید به قالب',
    'Template.mainPages': 'صفحه های اصلی قالب',
    'Template.customPages': 'صفحه های سفارشی',
    'Template.defaultTab': 'مشخصات',
    'Template.contentTab': 'قالب',
    'Template.pluginsTab': 'پلاگین ها',
    'Template.cssTab': 'Css-Scss',
    'Template.jsTab': 'Js',

    'TemplatePage.name': 'نام',
    'TemplatePage.content': 'محتوای قالب',
    'TemplatePage.css': 'محتوای Css-Scss',
    'TemplatePage.files': 'فایل ها',
    'TemplatePage.js': 'محتوای Js',
    'TemplatePage.plugins': 'پلاگین ها',
    'TemplatePage.editPlugins': ({
        template,
        templatePage,
        plugin
    }): string => `ویرایش پلاگین ${plugin} صفحه ${templatePage} از قالب ${template}`,

    'User': 'کاربر',
    'User.roles': 'نقش ها',
    'User.username': 'نام کاربری',
    'User.displayName': 'نام نمایشی',
    'User.password': 'رمز ورود',
    'User.email': 'ایمیل',
    'User.mobile': 'موبایل',
    'User.disabled': 'غیر فعال است',
    'User.disabledMessage': 'پیغام غیر فعال بودن کاربر',
    'User.disabledTo': 'غیر فعال تا تاریخ',
    'User.avatar': 'نمایه کاربر',

    // PUBLIC ====================================
    "required": (field: string): string => `لطفا '${t(field)}' را وارد کنید`,
    "maxLength": (field: string): string => `طول '${t(field)}' از حداکثر مقدار مجاز بیشتر است`,
    "minLength": (field: string): string => `طول '${t(field)}' بسیار کوتاه است`,
    "New record": (typeName: string): string => `ثبت ${t(typeName)} جدید`,

    "Clear cache": 'پاک سازی کش',
}

export const t = (key: string): string => {
    if (translations[key]) {
        return translations[key].toString();
    }
    return key;
};

export const tf = (key: string): ((params: any) => string) => {
    const result = translations[key];
    if (!result || typeof result === "string") {
        return (field: string): string => `${key} : t(${field})`;
    }
    return result as ((params: any) => string);
}
