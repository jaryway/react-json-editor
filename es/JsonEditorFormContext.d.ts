import React from 'react';
import { Schema } from './interfaces';
import { InternalNamePath, FormInstance } from 'rc-field-form/es/interface';
export interface JsonEditorFormProviderProps {
    form?: FormInstance;
    root?: string[];
    hiddenMap?: {
        [k: string]: boolean;
    };
}
export interface JsonEditorFormContextProps extends JsonEditorFormProviderProps {
    notify?: (path: InternalNamePath, value: any) => void;
    registerField?: (path: InternalNamePath, schema: Schema) => (path: InternalNamePath) => void;
}
declare const JsonEditorFormContext: React.Context<JsonEditorFormContextProps>;
declare const JsonEditorFormProvider: React.FC<JsonEditorFormProviderProps>;
export { JsonEditorFormProvider };
export default JsonEditorFormContext;
