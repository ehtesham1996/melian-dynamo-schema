import { url } from "../utils/general.type";

export type symptomName = string;

export interface symptomType {

    /** @PK */
    symptom_name: symptomName; /** @GSI with projected attribute of base vital fields*/
    icon: url;
    description: string;
    is_photo_required: boolean
    locale: Object
    scaleTypes: [
        {
            value : number
            description: string
        }
    ]


}
