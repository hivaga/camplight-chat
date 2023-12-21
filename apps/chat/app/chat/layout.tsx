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
