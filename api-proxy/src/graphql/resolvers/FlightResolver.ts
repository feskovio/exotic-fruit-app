import {IResolvers} from "graphql-tools";
import fetch from 'node-fetch';
import {LocationsList, QueryFindFlightArgs } from "../../generated/graphql";

const BASE_URL = "https://api.skypicker.com/flights?v=3&partner=skypicker&locale=en";

export const FlightResolver: IResolvers = {
    Query: {
        async findFlight(_: void, args: QueryFindFlightArgs): Promise<LocationsList> {
            const { flyFrom, to, dateFrom, dateTo} = args;
            console.log(args);
            const response = await fetch(`${BASE_URL}&flyFrom=${flyFrom}&to=${to}&dateFrom=${dateFrom}&dateTo=${dateTo}`);
            return await response.json();
        }
    }
};
