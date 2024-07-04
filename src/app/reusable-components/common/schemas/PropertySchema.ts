


//Warning: Do not edit until synced with backend
export enum PropertyType {
    INPUT_TEXT = 'text',
    INPUT_TEXTAREA = 'textarea',
    INPUT_CHECKBOX = 'checkbox',
    INPUT_SELECT = 'select',
    INPUT_RADIO = 'radio',
    INPUT_MULTI_SELECT = 'multi_select',
    INPUT_IMAGE = 'image',
    INPUT_FILE = 'file',
    INPUT_THUMBNAIL = 'thumbnail',
    INPUT_ICON = 'icon',
    TOGGLE_SWITCH = 'toggle',
    CHIPS = 'chips',

    

}


export interface PropertySchema {
    property_tyoe: PropertyType;
    property_name: string;
    property_identifier: string;
    property_default_value: any;

    property_label?: string;
    property_icon?: string;


}


