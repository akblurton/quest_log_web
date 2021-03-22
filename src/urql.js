import {
  createClient,
  Provider as URQLProvider,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import schema from "../../api/schema.json";

const isServerSide = typeof window === "undefined";
// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssr = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide
    ? JSON.parse(window.atob(window.__URQL_DATA__))
    : undefined,
});

const cache = cacheExchange({
  schema,
  resolvers: {
    RootQueryType: {
      entryById: (parent, args) => {
        return { __typename: "Entry", id: args.id };
      },
    },
  },
});
global.cache = cache;
const url = isServerSide ? process.env.API_HOST : "/api";
/* global process */
const client = createClient({
  suspense: isServerSide,
  url,
  exchanges: [
    !isServerSide && devtoolsExchange,
    dedupExchange,
    cache,
    ssr,
    fetchExchange,
  ].filter(Boolean),
});
global.client = client;

export { client, ssr, URQLProvider };
