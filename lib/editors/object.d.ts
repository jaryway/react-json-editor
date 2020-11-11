import React from 'react';
import { Schema } from '../interfaces';
interface ObjectEditorProps {
    format?: string;
    path: string[];
    schema: Schema;
}
declare const ObjectEditor: React.FC<ObjectEditorProps>;
export default ObjectEditor;
