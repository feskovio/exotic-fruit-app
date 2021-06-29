import { gql } from "@apollo/client";
export const FIND_FLIGHT = gql`
    query FindFlight($flyFrom: String!, $to: String!, $dateFrom: String!, $dateTo: String!) {
        findFlight(flyFrom: $flyFrom, to: $to, dateFrom: $dateFrom, dateTo: $dateTo) {
            currency,
            data {
                id,
                flyFrom,
                flyTo,
                cityFrom,
                cityTo,
                dTime,
                aTime,
                fly_duration,
                price
            }
        }
    }
`;
