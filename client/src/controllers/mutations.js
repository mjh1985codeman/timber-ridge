import {gql} from '@apollo/client';

export const ADD_PROPERTY = gql`
mutation Mutation($name: String, $reserved: Boolean, $reserveCost: Int, $addressSt: String, $city: String, $state: String, $zip: String, $readyToReserve: Boolean, $available: Boolean, $pictures: [String]) {
    addProperty(name: $name, reserved: $reserved, reserveCost: $reserveCost, addressSt: $addressSt, city: $city, state: $state, zip: $zip, readyToReserve: $readyToReserve, available: $available, pictures: $pictures) {
        _id
        name
        reserved
        reserveCost
        addressSt
        city
        state
        zip
        pictures
        readyToReserve
        available
    }
}
`