import {initializeDataBase} from "../../services/mongoose/mongoose.service";

export  default async function ChatLayout({children}: { children: React.ReactNode }) {

  await initializeDataBase();

  return (<div>
      <h1>Chat Page</h1>
      <div>
        {children}
      </div>
    </div>
  );
}
