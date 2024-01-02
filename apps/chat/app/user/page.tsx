import RegisterUser from "./register-user/register-user";
import {getCurrentSession} from "../../lib/sessions";

export interface LoginProps {
}

let currentUser:string | undefined;

// TODO: Kept for experimental purposes
/*async function updateCurrentChatSender(form: FormData) {
  'use server'
  currentUser = form.get('username') as string;
  const response = await fetch('http://localhost:4200/api/session', {
    method: 'POST',
    body: JSON.stringify({user:currentUser}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json();
  console.log('User Session creation response:', json);
  revalidatePath('/user');
}*/

export async function User(props: LoginProps) {

   return (<>
      <RegisterUser/>
    </>);
}

export default User;
