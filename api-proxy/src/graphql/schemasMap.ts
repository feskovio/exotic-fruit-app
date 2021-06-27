import "graphql-import-node";
import * as locationTypeDefs from "./schemas/location.graphql";
import * as flightTypeDefs from "./schemas/flight.graphql";
import * as emptyTypeDefs from "./schemas/empty.graphql";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolversMap";
import { GraphQLSchema } from 'graphql';

const  schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [ emptyTypeDefs, locationTypeDefs, flightTypeDefs ],
    resolvers
});

export default schema;

