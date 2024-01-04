export  default async function ChatLayout({children}: { children: React.ReactNode }) {
  return (
    <>
      <h1>tRPC Chat Page</h1>
      <div>
        {children}
      </div>
    </>
  );
}
