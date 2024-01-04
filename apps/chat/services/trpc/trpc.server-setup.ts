import {initTRPC} from "@trpc/server";

const server = initTRPC.create();


export const router = server.router;
export const procedure = server.procedure


console.log('tRPC Server : Initialization completed !');
