import React, { useRef } from "react";

import { t } from "@/components/Translations";
import { uuidV4 } from "@/helpers/UuidHelper";
import { useFormContext } from "react-hook-form";
import { useFormProps } from "@/components/forms/FormContext";
import BaseFormFieldsProps from "@/components/forms/props/BaseFormFieldsProps";
import FieldError from "@/components/forms/FieldError";
import { readModelProp } from "@/components/forms/FormHelper";

import tinymce from 'tinymce/tinymce.min.js';
// TinyMCE wants to be in global scope, even if loaded from npm module
window.tinymce = tinymce;

import 'tinymce/themes/silver';
import 'tinymce/models/dom/model';
import 'tinymce/icons/default/icons';

import 'tinymce/plugins/help/js/i18n/keynav/en';

import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
//import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
//import 'tinymce/plugins/paste';
import 'tinymce/plugins/code';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/save';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/pagebreak';

import { Editor } from '@tinymce/tinymce-react';


export interface WysiwygProps extends BaseFormFieldsProps {
}

function Wysiwyg({
    name,
    id = uuidV4(),
    validation,
    className,
    inputClassName,
    showErrorMessage = true,
}: WysiwygProps) {

    const { register, formState: { errors } } = useFormContext();
    const { labelPrefix, model } = useFormProps();
    const defaultValue: string = readModelProp<string>(model, name) ?? "";

    const inputRef = useRef<any>();
    const editorRef = useRef<any>();

    const label = labelPrefix + '.' + name;
    const registration = register(name, validation as any);

    const onEditorStateChange = () => {
        if (inputRef.current && editorRef.current) {
            inputRef.current.value = editorRef.current.getContent();
        }
    };

    return (
        <div className={`position-relative pb-4 ${className || ''}`} style={{ zIndex: 0 }}>
            <label htmlFor={id}>{t(label)}</label>

            <div className="ltr">
                <Editor
                    tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={defaultValue}
                    onChange={onEditorStateChange}
                    init={{
                        height: 500,
                        menubar: 'file edit view insert format tools table help',
                        toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media link anchor codesample | ltr rtl',
                        plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
                        content_style: 'body {direction:rtl;font-family:sahel}',
                        content_css: '/tinymce/skins/content/default/content.css',
                        skin_url: '/tinymce/skins/ui/oxide'
                    }}
                />
            </div>

            <input
                type="hidden"
                defaultValue={defaultValue}
                {...registration}
                ref={inputRef} />

            <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />

        </div>
    );
}

export default Wysiwyg;
