import {resetServerStore} from "../store/server-store";
import {revalidateTag} from "next/cache";

export default async function Index() {

  await resetServerStore();
  revalidateTag('messages');


  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (<>
    <h1>Home Page</h1>
  </>);
}
