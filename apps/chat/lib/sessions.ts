import {SessionType} from "../store/server-store";
import {NextResponse} from "next/server";

export async function getCurrentSession(): Promise<SessionType | undefined> {
  try {
    const response = await fetch('http://localhost:4200/api/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: {tags: ['session']}
    });
    if(response.status === 200) {
      const json = await response.json();
      return json;
    }
  }catch (e) {
    console.error('Error fetching session:', e);
  }

  return undefined;



}

export function generateSessionResponse(session: SessionType) {
  const response = NextResponse.json(session);
  response.cookies.set('username', session.username, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 // 60 seconds
  });
  return response;
}

export function generateSession(username: string, createdAt: number): SessionType {
  return {
    username,
    createdAt,
    expiresAt: (createdAt + 60 * 1000)
  }
}
