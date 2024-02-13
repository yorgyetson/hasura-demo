import { InMemoryCache, ApolloClient } from "@apollo/client/core/index.js";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from '@apollo/client/core/index.js';
// const { split, HttpLink } = pkg;
import ws from "ws";
import { browser } from "$app/environment";
export function createApolloClient() {
    const headers = {
        // Authorization: `Bearer ${}`,
    };

    const httpLink = new HttpLink({
        uri: "https://organic-yeti-59.hasura.app/v1/graphql",
        headers,
    });

    const wsLinkOptions = {
        uri: "wss://organic-yeti-59.hasura.app/v1/graphql",
        options: {
            reconnect: true,
            connectionParams: {
                // Assuming `headers` is defined somewhere in your code
                headers,
            },
        },
    };

    if (!browser) {
        // Include webSocketImpl only on the server
        wsLinkOptions.webSocketImpl = ws;
    }

    const wsLink = new WebSocketLink(wsLinkOptions);

    const link = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            );
        },
        wsLink,
        httpLink
    );

    const cache = new InMemoryCache();

    const client = new ApolloClient({
        link,
        cache,
    });

    return client;
}

