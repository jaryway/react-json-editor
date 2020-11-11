import React from 'react';
import { Resolver } from './interfaces';
export interface JsonEditorProviderProps {
    options: {
        resolvers: Resolver[];
        editors: {
            [k: string]: React.FC<any>;
        };
    };
}
export interface JsonEditorContextProps extends JsonEditorProviderProps {
}
declare const JsonEditorContext: React.Context<JsonEditorContextProps>;
declare const JsonEditorProvider: React.FC<JsonEditorProviderProps>;
export { JsonEditorProvider };
export default JsonEditorContext;
