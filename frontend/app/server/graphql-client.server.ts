import { GraphQLClient } from 'graphql-request';

export const client: any = new GraphQLClient(`${process.env.API_HOST}/graphql`, {
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
});