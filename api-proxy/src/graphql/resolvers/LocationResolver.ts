import {IResolvers} from "graphql-tools";
import fetch from 'node-fetch';

import {LocationsList, QuerySearchArgs} from "../../generated/graphql";

export const LocationResolvers: IResolvers = {
    Query: {
        async search(_: void, args: QuerySearchArgs): Promise<LocationsList> {
            const response = await fetch('https://api.github.com/users/github');
            return await response.json();
        }
    }
};
