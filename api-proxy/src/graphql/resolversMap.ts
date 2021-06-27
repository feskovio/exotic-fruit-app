import { IResolvers } from "graphql-tools";
import { merge } from "lodash";
import { LocationResolvers } from './resolvers/LocationResolver';


const resolverMap: IResolvers = merge(LocationResolvers);
export default resolverMap;
