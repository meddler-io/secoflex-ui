import { BASIC_PROPERTIES } from '../shared/Configuration';
import { PropertySchema, PropertyType } from '../schemas/PropertySchema';

export interface PropertyDataModel {

}

export abstract class BaseFormComponent {

}

export class BaseFormCommonProperties {

    constructor( 

        public identifier: string = '',
        public title: string = '',
        public description: string = '',
        public instructions: string = '',
        public icon: string = ''

     ){

     }

   
} 

export class BaseFieldComponent {

    propertyDataModel: { [id: string]: any; } = {};

    _properties : BaseFormCommonProperties = {
        identifier: '',
        title: '',
        description: '',
        instructions: '',
        icon: '',
    }

    constructor() {

   
    }

    getProperties(): PropertySchema[] {
        return Object.values(this.propertyTransfoermer())
    }


    onPropertyChange(property: PropertySchema) {


        if (property.property_identifier in this._properties)
            this._properties[property.property_identifier] = property.property_default_value
        return

    }


    propertyTransfoermer(): { [identifier: string]: PropertySchema } {

        let titleProperty: PropertySchema = {
            property_identifier: 'title',
            property_name: 'Title',
            property_tyoe: PropertyType.INPUT_TEXT,
            property_default_value: this._properties.title
        }

        let descriptionProperty: PropertySchema = {
            property_identifier: 'description',
            property_name: 'Description',
            property_tyoe: PropertyType.INPUT_TEXTAREA,
            property_default_value: this._properties.description
        }


        let identifierProperty: PropertySchema = {
            property_identifier: 'identifier',
            property_name: 'Identifier',
            property_tyoe: PropertyType.INPUT_TEXT,
            property_default_value: this._properties.identifier
        }


      

        let instructionsProperty: PropertySchema = {
            property_identifier: 'instructions',
            property_name: 'Instructions',
            property_tyoe: PropertyType.INPUT_TEXTAREA,
            property_default_value: this._properties.instructions
        }


        let iconProperty: PropertySchema = {
            property_identifier: 'icon',
            property_name: 'Icon',
            property_tyoe: PropertyType.INPUT_ICON,
            property_default_value: this._properties.icon
        }


        let customProperties: { [identifier: string]: PropertySchema } = {

            identifier: identifierProperty,
            icon: iconProperty,

            title: titleProperty,
            description: descriptionProperty,
            instructions: instructionsProperty,

        }

        

        return customProperties;
    }

    propertyReducer(): PropertySchema[] {

        return []
    }
}