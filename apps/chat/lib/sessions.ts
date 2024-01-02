import {SessionType} from "../store/server-store";

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
