import express from "express";
import cors from 'cors';
import { ApolloServer} from 'apollo-server-express';
import schema from './graphql/schemasMap';

const PORT = 4000;

const app = express();
const options: cors.CorsOptions = {
    origin: [ 'http://localhost:8080' ]
};
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
    schema
});

server.applyMiddleware({ app, path: "/graphql" });
app.listen(PORT, () => {
    console.log(`App is running on ${PORT} port!!!`);
});
