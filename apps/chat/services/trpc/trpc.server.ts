import {procedure, router} from "./trpc.server-setup";
import {ChatMessageFilter, getChatMessages} from "../mongoose/chat.service";
import {getSession} from "../../store/server-store";
import {TRPCError} from "@trpc/server";
import {IChatMessage} from "../../model/mongoose/chat-message";
import sendNewChatMessage from "../../actions/send-new-chat-message";
import {observable} from "@trpc/server/observable";

export const trpcRouter = router({
  hello: procedure.query(async ({ctx}) => {
    return 'Hello World from tRPC!'
  }),
  messages: procedure.input((input: any) => {
    if (!input) {
      input = {type: 'date', date: 0};
    }

    if (input.type !== 'date' || isNaN(input.date) || input.date < 0) {
      throw new Error('TRPC: Invalid filter!');
    }

    return input as ChatMessageFilter;
  }).query(async ({input: filter}) => {
    const messages = await getChatMessages(filter);
    return messages;
  }),
  message: procedure.input((input: any) => {
    if (!input) {
      throw new Error('TRPC: Invalid message input!');
    }
    const message:IChatMessage = input;
    return message;
  }).query(async ({input}) => {
    const result = await sendNewChatMessage(input);
    return result;
  }),
  session: procedure.query(async ({ctx}) => {
    const usernameCookie = ctx.cookies.get('username');
    const username = usernameCookie ? usernameCookie?.value : '';
    const session = getSession(username);
    if (!session) {
      throw new TRPCError({message: 'Session not found', code:'NOT_FOUND'});
    }
    return session;
  }),
  /*  stream: procedure.input((input: any) => {
    if (!input) {
      throw new Error('TRPC: Invalid message input!');
    }
    return input as ChatMessageFilter
  }).subscription(async ({input}) => {
    return observable<number>((sub) => {
      let i = 0;
      setInterval(() => {
        sub.next(i++);
      }, 1000);
    });
  }),*/
})
// startWebSocketServer(trpcRouter);
export type trpcRouter = typeof trpcRouter;

