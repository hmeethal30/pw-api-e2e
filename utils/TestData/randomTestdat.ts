import { LeadDetails } from "./testdata";
import {faker} from "@faker-js/faker";

export function generateRandomData():LeadDetails{

    return {
        
        lastName:faker.person.lastName(),
        companyName:faker.company.name(),
        firstName:faker.person.firstName()
    
    }
}