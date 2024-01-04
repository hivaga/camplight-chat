import {NextRequest} from "next/server";
import {fetchRequestHandler} from "@trpc/server/adapters/fetch";
import {trpcRouter} from "../../../../services/trpc/trpc.server";
import {RequestCookies} from "next/dist/server/web/spec-extension/cookies";

const handlerRequest = (request:NextRequest) => {
  return fetchRequestHandler({
    router: trpcRouter,
    endpoint: 'api/trpc',
    req: request,
    createContext: () => { return {
      req: request,
      cookies: request.cookies
    } as {req: NextRequest, cookies: RequestCookies} }
  })
}


// Define GET handler
export const GET = (request: NextRequest) => {
  return handlerRequest(request);
};

// Define POST handler
export const POST = (request: NextRequest) => {
  return handlerRequest(request);
};
