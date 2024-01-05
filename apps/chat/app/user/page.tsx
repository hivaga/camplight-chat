import RegisterUser from "./register-user/register-user";

export interface LoginProps {
}

export default async function User(props: LoginProps) {

   return (<>
      <RegisterUser/>
    </>);
}
