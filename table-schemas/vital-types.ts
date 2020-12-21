import { url } from "../utils/general.type";

export type vitalTypeId = string;

export interface vitalType {

    /** @PK */
    id: vitalTypeId,
    vital_type_name: string; /** @GSI with projected attribute of base vital fields*/
    icon: url;
    locale: Object;
    vital_type_fields: [
        {
            name: string;
            diagnosis: [
                {
                    upper_bound: number;
                    lower_bound: number;
                    description: string;
                    message: string;
                }
            ]
        }
    ]


}

/**
 * @usecase1 to obtain all vitals types
 *  Scan on vital-type using GSI-Index @vitalTypeName
 *
 *
 * @usecase2 to obtain specific vital type fields
 *  Suppose: vitalTypeName = vital name
 *  Query Where (@vitalTypeName == vitalTypeName) PROJECT @vitalTypeFields
 */