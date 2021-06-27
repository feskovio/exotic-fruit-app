import {IResolvers} from "graphql-tools";
import fetch from 'node-fetch';

import {LocationsList, QuerySearchArgs} from "../../generated/graphql";

const BASE_URL = "https://api.skypicker.com/locations";

export const LocationResolvers: IResolvers = {
    Query: {
        async search(_: void, args: QuerySearchArgs): Promise<LocationsList> {
            const response = await fetch(`${BASE_URL}?term=${args.term}&location_types=${args.location_types}`);
            return await response.json();
        }
    }
};
