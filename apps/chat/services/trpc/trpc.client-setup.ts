import {createTRPCProxyClient, httpBatchLink} from "@trpc/client";
import {trpcRouter} from "./trpc.server";

// WebSocket client
// const wsClient = createWSClient({
//   url: 'ws://localhost:3003', // Replace with your WebSocket server URL
// });

const _trpcClient = createTRPCProxyClient<trpcRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4200/api/trpc',
    }),
    // wsLink({ client: wsClient }),
  ]
});


console.log('tRPC client : Initialization completed !');

export default _trpcClient;
