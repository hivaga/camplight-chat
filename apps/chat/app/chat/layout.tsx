import {IChatMessage} from "../../model/mongoose/chat-message";


async function fetchMessages(filter: { type: 'date', date: number } | { type: 'all' }) {
  const response = await fetch('http://localhost:4200/api/messages', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filter)
  });

  return await response.json();
}

function convertMapToArray(map: Map<string, IChatMessage>) {
  const allMessages = Array.from(map.values());
  return allMessages.sort((a, b) => {
    return (a.time - b.time);
  });
}


export  default async function ChatLayout({children}: { children: React.ReactNode }) {


  return (
    <>
      <h1>Chat Page</h1>
      <div>
        {children}
      </div>
    </>
  );
}
