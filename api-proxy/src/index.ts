import express from "express";
import cors from 'cors';
import { ApolloServer} from 'apollo-server-express';
import schema from './graphql/schemasMap';

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
    schema
});

server.applyMiddleware({ app, path: "/graphql" });
app.listen(PORT, () => {
    console.log(`Front-end App is running on 3000 port (http://localhost:3000)`);
    console.log(`Back-end App is running on ${PORT} port (http://localhost:4000)`);
});
