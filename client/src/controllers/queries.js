import {gql} from '@apollo/client';

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