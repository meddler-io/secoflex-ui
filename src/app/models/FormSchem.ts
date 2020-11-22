export interface FormSchema {

    form_id: String;
    form_name: String;
    form_metadata: any[];
    form_tags: String[];
    field: any[];
    public: Boolean
    draft: Boolean;
    archived: Boolean;
    version: Number;

}