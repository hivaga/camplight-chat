import {NextRequest, NextResponse} from "next/server";
import {addNewSession, getSession, removeSession} from "../../../store/server-store";
import {revalidateTag} from "next/cache";
import {generateSession, generateSessionResponse} from "../../../lib/sessions";


export async function GET(request: NextRequest) {
  try {
    const usernameCookie = request.cookies.get('username');
    const username = usernameCookie ? usernameCookie?.value : '';
    console.log('API.session:: GET session:', !!username ? username : undefined);
    const session = getSession(username);
    if (!session) {
      return new Response('No session found!', {status: 404});
    }

    return NextResponse.json(session);

  } catch (e: any) {
    console.error('API.messages:: Error while trying to get current session:', e, request);
    const errorResponse = NextResponse.json({error: e.message ?? 'Error while trying to get messages!'}, {status: 500});
    return errorResponse;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('API.session:: POST session:', data);
    const newUsername = data.username;

    if (!newUsername) {
      return new Response('Username is required!', {status: 400});
    }

    const usernameCookie = request.cookies.get('username');
    const previousUsername = usernameCookie ? usernameCookie?.value : undefined

    const currentTimestamp = Date.now();
    const prevSession = getSession(newUsername);


    if (previousUsername !== newUsername && prevSession && prevSession.expiresAt > currentTimestamp) {
      console.log('API.session:: User with this name already exist!', prevSession);
      return new Response('User with this name already exist!', {status: 409});
    }

    // This can only happen if a user decided to change his name while current cookie is still valid
    if(previousUsername && previousUsername !== newUsername) {
      console.log(`API.session:: Clean session for user: '${previousUsername}'`);
      removeSession(previousUsername);
    }

    console.log(`API.session:: Created new session for user: '${newUsername}'`);
    const newSession = generateSession(newUsername, currentTimestamp);
    addNewSession(newSession);
    revalidateTag('session');
    const response = generateSessionResponse(newSession);
    return response

  } catch (e: any) {
    console.error('API.messages:: Error while trying to get messages:', e, request);
    const errorResponse = NextResponse.json({error: e.message ?? 'Error while trying to create session'}, {status: 500});
    return errorResponse;
  }
}
