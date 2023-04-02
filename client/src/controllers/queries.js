import {gql} from '@apollo/client';

//PAY ATTENTION TO THE SPACES!
export const GET_RESERVATIONS = gql`
query Query {
  getReservations {
    _id
    beginDate
    endDate
    downPaymentPaid
    totalPrice
    balance
    paidInFull
    property {
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
    customer {
      _id
      firstName
      lastName
      phone
      email
    }
  }
}
`;

export const GET_PROPERTIES = gql`
  {
    getProperties {
      _id
      name
      reserveCost
      reserved
      addressSt
      city
      state
      zip
      readyToReserve
      available
    }
  }
`;

export const GET_CUSTOMER_BY_ID = gql`
  query Query($id: ID!) {
    getCustomer(_id: $id) {
      _id
      firstName
      lastName
      phone
      email
      reservations {
        _id
        beginDate
        endDate
        downPaymentPaid
        totalPrice
        balance
        paidInFull
        property {
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
    }
  }
`;
