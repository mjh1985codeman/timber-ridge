import {gql} from '@apollo/client';

export const ADD_PROPERTY = gql`
mutation Mutation($name: String, $reserved: Boolean, $reserveCost: Int, $addressSt: String, $city: String, $state: String, $zip: String, $readyToReserve: Boolean, $available: Boolean) {
    addProperty(name: $name, reserved: $reserved, reserveCost: $reserveCost, addressSt: $addressSt, city: $city, state: $state, zip: $zip, readyToReserve: $readyToReserve, available: $available) {
        _id
        name
        reserved
        reserveCost
        addressSt
        city
        state
        zip
        readyToReserve
        available
    }
}
`