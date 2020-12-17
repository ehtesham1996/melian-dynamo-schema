import { careLineProviderId } from "./careline";
import { countryId } from "./country";
import { gender, url } from "../utils/general.type";
import { specialityId } from "./speciality";

export type userId = string;
export enum AccountType {
    DETAIL = 'detail',
    PROFESSIONAL = 'professional',
    PATIENT = 'patient',
    NETWORK = 'network'
}

export enum NetworkStatus {
    CONNECTED = 'connected',
    PENDING = 'pending'
}
export interface User {


    id: userId;  // PK
    type: AccountType // SK   /** @GSI for networks */

    // If AccountType === DETAIL
    name: string;
    telephone: number;
    country: countryId;  /** @GSI to obtain one country users */ 
    email: string;
    gender: gender;
    birthdate: Date;
    terms_accepted: boolean,
    confidentiality_accepeted: boolean
    photo: url;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
    // (END) If AccountType === DETAIL

    // If AccountType === PATIENT
    blood_type: string;
    careline_provider: careLineProviderId;
    // (END) If AccountType === PATIENT

    // If AccountType === PROFESSIONAL
    credential_type: string
    credential: string
    working_places: [
        {
            name: string;
            zip_code: string;
            address: string;
            country: countryId;
            city: string;
        }
    ],
    specialities: [specialityId]
    // (END) If AccountType === PROFESSIONAL

    // If AccountType === network#userId
    /**
     * 
     * 
     * @usecase1 - If you have to get your own connection your query would be
     *      Suppose user1 = your id
     *      Get where (@id == user1 and @AccountType BEGINS_WITH network# and @network_status == CONNECTED)
     *                                  +
     *      Get where (@AccountType == network#user1 and network_status == CONNECTED)
     * 
     * @usecase2 - if you want to get those user who have sent you invitation
     *      Suppose user1 = your id
     *      Get where (@AccountType == network#user1 and @network_status == PENDING)
     * 
     * @usecase3 - if you want to get those user whom you have sent invitations
     *      Suppose user1 = your id
     *      Get where (@id == user1 and @AccountType BEGINS_WITH network# and @network_status == PENDING)
     */
    network_status: NetworkStatus;
    // (END) If AccountType === network#userId
}
