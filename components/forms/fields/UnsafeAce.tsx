import { useEffect, useRef } from "react";

import "ace-builds";
import 'ace-builds/webpack-resolver'
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-json";
import beautify from 'ace-builds/src-noconflict/ext-beautify';

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox"

import AceEditor from "react-ace";

import { t } from "@/components/Translations";
import BaseFormFieldsProps from "@/components/forms/props/BaseFormFieldsProps";
import { useFormContext } from "react-hook-form";
import { useFormProps } from "@/components/forms/FormContext";
import FieldError from "@/components/forms/FieldError";
import { uuidV4 } from "@/helpers/UuidHelper";
import { readModelProp } from "@/components/forms/FormHelper";

// 


export interface AceProps extends BaseFormFieldsProps {
    mode: ('css' | 'javascript' | 'html' | 'json')
    height?: string | undefined
}

function UnsafeAce({
    name,
    id = uuidV4(),
    validation,
    className,
    inputClassName,
    showErrorMessage = true,
    mode, height
}: AceProps) {

    const { register, formState: { errors } } = useFormContext();
    const { labelPrefix, model } = useFormProps();

    const inputRef = useRef<any>();
    const editorRef = useRef<any>();

    const defaultValue = readModelProp<string>(model, name);

    useEffect(() => {
        if (mode !== "css")
            beautify.beautify(editorRef.current.editor.session);
    }, [mode]);

    const label = labelPrefix + '.' + name;
    const registration = register(name, validation as any);

    function onChange() {
        if (inputRef.current && editorRef.current) {
            inputRef.current.value = editorRef.current.editor.session.toString();
        }
    }

    return (
        <div className={`position-relative pb-4 ${className || ''}`}>
            <label htmlFor={id}>{t(label)}</label>

            <AceEditor
                mode={mode}
                height={height}
                theme="github"
                onChange={onChange}
                name={name + "_ace"}
                editorProps={{ $blockScrolling: true }}
                width="100%"
                className={`border ${inputClassName || ''}`}
                defaultValue={undefined}
                value={defaultValue}
                ref={editorRef}
                commands={beautify.commands}
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                enableSnippets={true}
                showGutter={true}
                showPrintMargin={false}
                focus
                wrapEnabled
            />

            <input
                type="hidden"
                defaultValue={defaultValue}
                {...registration}
                ref={inputRef} />

            <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />

        </div>
    );
}

export default UnsafeAce;
