import {initTRPC} from "@trpc/server";
import {RequestCookies} from "next/dist/server/web/spec-extension/cookies";

export type CustomContext = { req: Request, cookies: RequestCookies };


const server = initTRPC.context<CustomContext>().create();

export const router = server.router;
export const procedure = server.procedure


console.log('tRPC Server : Initialization completed !');
