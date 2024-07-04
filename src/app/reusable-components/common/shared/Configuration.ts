import { PropertySchema, PropertyType } from '../schemas/PropertySchema';

export const BASIC_PROPERTIES: PropertySchema[] = [

    {
        property_tyoe: PropertyType.INPUT_TEXT,
        property_name: 'Identifier',
        property_default_value: '',
        property_identifier: '',

    },

    {
        property_tyoe: PropertyType.INPUT_TEXT,
        property_name: 'Title',
        property_default_value: '',
        property_identifier: '',

    },
    {
        property_tyoe: PropertyType.INPUT_TEXT,
        property_name: 'Placeholder',
        property_default_value: '',
        property_identifier: '',

    },
    {
        property_tyoe: PropertyType.INPUT_TEXTAREA,
        property_name: 'Description',
        property_default_value: '',
        property_identifier: '',

    },
    {
        property_tyoe: PropertyType.INPUT_CHECKBOX,
        property_name: 'Required',
        property_default_value: '',
        property_identifier: '',

    },
    {
        property_tyoe: PropertyType.CHIPS,
        property_name: 'Keywords',
        property_default_value: '',
        property_identifier: '',

    },
    {
        property_tyoe: PropertyType.TOGGLE_SWITCH,
        property_name: 'Required',
        property_default_value: '',
        property_identifier: '',

    }
]
