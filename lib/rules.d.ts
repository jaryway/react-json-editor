import { Schema } from './interfaces';
import { InternalNamePath, Rule } from 'rc-field-form/es/interface';
export declare const rules: ((schema: Schema, classname: string, name: InternalNamePath) => Rule[])[];
export declare const getRules: (schema: Schema, name: InternalNamePath) => Rule[];
