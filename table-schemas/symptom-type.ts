import { url } from "../utils/general.type";

export type symptomId = string;

export interface symptomType {

    /** @PK */
    id: symptomId,
    symptom_name: string; /** @GSI with projected attribute of base vital fields*/
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
