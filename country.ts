import { url } from "./general.type";

export type countryId = string

export interface country {
    id: countryId;
    name: string;
    flag: url;
    phone_code: string
    locale: string
}