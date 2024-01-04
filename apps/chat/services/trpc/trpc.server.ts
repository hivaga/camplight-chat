import {router, procedure} from "./trpc.server-setup";
import {ChatMessageFilter, getChatMessages} from "../mongoose/chat.service";
export const trpcRouter = router({
  hello: procedure.query(async () => {
    return 'Hello World from tRPC!'
  }),
  messages: procedure.input((input: any) => {
    if(!input) {
      input = {type: 'date', date: 0};
    }

    if (input.type !== 'date' || isNaN(input.date) || input.date < 0 ) {
      throw new Error('TRPC: Invalid filter!');
    }

    return input as ChatMessageFilter;
  }).query(async ({ input: filter }) => {
    const messages = await getChatMessages(filter);
    return messages;
  }),
  session: procedure.query(async ({ ctx }) => {
    return 1;
  })
})

export type trpcRouter = typeof trpcRouter;
