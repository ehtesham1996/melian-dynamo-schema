import { url } from "../utils/general.type";

export type vitalTypeName = string;

export interface viteType {

    /** @PK */
    vital_type_name: vitalTypeName; /** @GSI with projected attribute of base vital fields*/
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