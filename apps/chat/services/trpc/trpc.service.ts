
import {router, procedure} from "./trpc.server";

export const trpcRouter = router({
  hello: procedure.query(async () => {
    return 'Hello World from tRPC!'
  }),
})

export type trpcRouter = typeof trpcRouter;
