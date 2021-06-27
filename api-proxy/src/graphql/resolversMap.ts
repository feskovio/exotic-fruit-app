import { IResolvers } from "graphql-tools";
import { merge } from "lodash";
import { LocationResolvers } from './resolvers/LocationResolver';
import { FlightResolver } from './resolvers/FlightResolver';


const resolverMap: IResolvers = merge(LocationResolvers, FlightResolver);
export default resolverMap;
