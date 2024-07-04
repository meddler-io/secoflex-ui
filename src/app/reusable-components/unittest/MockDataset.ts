import { PropertySchema, PropertyType } from '../common/schemas/PropertySchema'


export const MockDataset = [
    {
        component: 'rich_text'
    },
    {
        component: 'ip_address' // Done
    },
    {
        component: 'url' // Done
    },
    {
        component: 'file' // Done
    },


    {
        component: 'select'
    },
    {
        component: 'text'
    },

    {
        component: 'select'
    },
    {
        component: 'video'
    },
    {
        component: 'image'
    },

    {
        component: 'enum'
    },
    {
        component: 'boolean'
    }

]

export const FormTemplates = [
    {
        form_schema_id: 'form_schema_id',
        formn_name: 'formn_name',
        form_metadata: [],
        keywords: ['meta-1', 'meta-2'],
        public: true,
        archived: false,
        version: 1
    }
]


export const Properties: PropertySchema[] = [
    {
        property_tyoe: PropertyType.INPUT_CHECKBOX,
        property_identifier: 'identifier',
        property_name: 'Name of poperty',
        property_default_value: 'defaut-vale'
    },
    {
        property_tyoe: PropertyType.INPUT_FILE,
        property_identifier: 'identifier',
        property_name: 'Name of poperty',
        property_default_value: 'defaut-vale'
    },
    {
        property_tyoe: PropertyType.INPUT_ICON,
        property_identifier: 'identifier',
        property_name: 'Name of poperty',
        property_default_value: 'defaut-vale'
    },
    {
        property_tyoe: PropertyType.INPUT_IMAGE,
        property_identifier: 'identifier',
        property_name: 'Name of poperty',
        property_default_value: 'defaut-vale'
    },
    {
        property_tyoe: PropertyType.INPUT_RADIO,
        property_identifier: 'identifier',
        property_name: 'Name of poperty',
        property_default_value: 'defaut-vale'
    },

    {
        property_tyoe: PropertyType.INPUT_MULTI_SELECT,
        property_identifier: 'identifier',
        property_name: 'Name of poperty',
        property_default_value: 'defaut-vale'
    },
    {
        property_tyoe: PropertyType.INPUT_SELECT,
        property_identifier: 'identifier',
        property_name: 'Name of poperty',
        property_default_value: 'defaut-vale'
    },
    {
        property_tyoe: PropertyType.INPUT_TEXT,
        property_identifier: 'identifier',
        property_name: 'Name of poperty',
        property_default_value: 'defaut-vale'
    },
    {
        property_tyoe: PropertyType.INPUT_TEXTAREA,
        property_identifier: 'identifier',
        property_name: 'Name of poperty',
        property_default_value: 'defaut-vale'
    },
    {
        property_tyoe: PropertyType.INPUT_THUMBNAIL,
        property_identifier: 'identifier',
        property_name: 'Name of poperty',
        property_default_value: 'defaut-vale'
    },
    {
        property_tyoe: PropertyType.TOGGLE_SWITCH,
        property_identifier: 'identifier',
        property_name: 'Name of poperty',
        property_default_value: 'defaut-vale'
    },
    {
        property_tyoe: PropertyType.CHIPS,
        property_identifier: 'identifier',
        property_name: 'Name of poperty',
        property_default_value: 'chips'
    }










]

// TEXT = 'text',
// RICH_TEXT = 'rich_text',
// BOOLEAN = 'boolean',
// ENUM = 'enum',
// FILE = 'file',
// IMAGE = 'image',
// VIDEO = 'video',
// SELECT = 'select',
// LIST = 'list',
// CODE = 'code',
// URL = 'url',