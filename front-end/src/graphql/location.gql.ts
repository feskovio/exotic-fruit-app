import { gql } from "@apollo/client";
export const FIND_LOCATION = gql`
    query FindLocation($searchText: String!) {
        findLocation(term: $searchText, location_types: "airport") {
            locations {
                id,
                city {
                    id, name, code
                }
            }
        }
    }
`;
