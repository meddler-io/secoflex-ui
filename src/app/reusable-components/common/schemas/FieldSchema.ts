


//Warning: Do not edit until synced with backend
export enum FieldType {
    IP_ADDRESS = 'ip_address',
    TEXT = 'text',
    RICH_TEXT = 'rich_text',
    BOOLEAN = 'boolean',
    ENUM = 'enum',
    FILE = 'file',
    IMAGE = 'image',
    VIDEO = 'video',
    SELECT = 'select',
    LIST = 'list',
    CODE = 'code',
    URL = 'url',
    CUSTOM_BUILDER = 'custom_form_builder',
    DOMAIN = 'domain',
    HOST = 'hosts',



}

class FieldComponentTypes {

    FormBuilderComponent
}


interface FieldSchema {
    fields: FieldType[],
}


