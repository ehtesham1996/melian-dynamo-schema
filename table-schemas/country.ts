import { url } from "../utils/general.type";

export type countryId = string

export interface country {
    id: countryId;
    name: string;
    flag: url;
    phone_code: string
    locale: string
}