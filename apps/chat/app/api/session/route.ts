import {NextRequest, NextResponse} from "next/server";
import {addNewSesson, getSession, removeSession, SessionType} from "../../../store/server-store";
import {revalidatePath, revalidateTag} from "next/cache";

function generateSessionResponse(session: SessionType) {
  const response = NextResponse.json(session);
  response.cookies.set('username', session.username, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 // 60 seconds
  });
  return response;
}

function generateSession(username: string, createdAt: number): SessionType {
  return {
    username,
    createdAt,
    expiresAt: (createdAt + 60 * 1000)
  }
}

export async function GET(request: NextRequest) {
  try {
    const usernameCookie = request.cookies.get('username');
    const username = usernameCookie ? usernameCookie?.value : undefined
    console.log('API.session:: GET session:', username);
    if (!username) {
      return new Response('No session found!', {status: 404});
    }

    const session = await getSession(username);
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
    const prevSession = await getSession(newUsername);


    if (previousUsername !== newUsername && prevSession && prevSession.expiresAt > currentTimestamp) {
      console.log('API.session:: User with this name already exist!', prevSession);
      return new Response('User with this name already exist!', {status: 409});
    }

    // This can only happen if a user decided to change his name while current cookie is still valid
    if(previousUsername && previousUsername !== newUsername) {
      console.log(`API.session:: Clean session for user: '${previousUsername}'`);
      await removeSession(previousUsername);
    }

    console.log(`API.session:: Created new session for user: '${newUsername}'`);
    const newSession = generateSession(newUsername, currentTimestamp);
    await addNewSesson(newSession);
    revalidateTag('session');
    const response = generateSessionResponse(newSession);
    return response

  } catch (e: any) {
    console.error('API.messages:: Error while trying to get messages:', e, request);
    const errorResponse = NextResponse.json({error: e.message ?? 'Error while trying to create session'}, {status: 500});
    return errorResponse;
  }
}
