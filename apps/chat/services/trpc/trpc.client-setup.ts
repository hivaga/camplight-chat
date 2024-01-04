import {createTRPCProxyClient, httpBatchLink} from "@trpc/client";
import {trpcRouter} from "./trpc.server";

const _trpcClient = createTRPCProxyClient<trpcRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4200/api/trpc',
    }),
  ]
});

console.log('tRPC client : Initialization completed !');

export default _trpcClient;
