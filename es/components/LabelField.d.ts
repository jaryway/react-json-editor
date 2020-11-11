import React from 'react';
import { FieldProps } from 'rc-field-form/es/Field';
import { Schema } from '../interfaces';
interface LabelFieldProps extends FieldProps {
    schema: Schema;
    label?: React.ReactNode;
    required?: boolean;
}
declare const _default: React.NamedExoticComponent<LabelFieldProps>;
export default _default;
