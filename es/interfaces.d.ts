export interface Schema {
    type: 'string' | 'boolean' | 'array' | 'object' | 'number' | 'integer' | 'null' | 'undefined';
    title?: string;
    format?: 'table' | 'url' | 'email' | 'date' | string;
    items?: Schema;
    min?: number;
    max?: number;
    step?: number;
    enum?: string[];
    default?: any;
    required?: (string | number)[];
    parent?: Schema;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    minItems?: number;
    maxItems?: number;
    uniqueItems?: number;
    description: string;
    properties?: {
        [k: string]: Schema;
    };
    options?: {
        enum_titles?: string[];
        mode?: string;
        checkbox?: boolean;
        dependencies?: {
            [path: string]: any;
        };
    };
}
export declare type Resolver = (schema: Schema) => string | undefined;
