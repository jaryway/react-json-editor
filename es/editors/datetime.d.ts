import React from 'react';
import { Schema } from '../interfaces';
interface DateTimeProps {
    title?: string;
    path?: string[];
    schema: Schema;
}
declare const DateTimeEditor: React.FC<DateTimeProps>;
export default DateTimeEditor;
