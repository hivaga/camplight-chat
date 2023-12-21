import styles from './page.module.scss';
import MessageForm from "./message-form/message-form";
import {TAG_STORE} from "../../store/app.store";
import axios from "axios";
import MessagesList from "./messages-list/messages-list";

interface ChatProps {
}

async function getStoreState() {
  const fetchData = await fetch('http://localhost:4200/api/store', {next: {tags: [TAG_STORE]}});
  const axiosData = await axios.get('http://localhost:4200/api/store');
  const json = await fetchData.json();
  console.log('fetchData', json);
  console.log('axiosData', axiosData.data);
  return json;
}

async function getMessages() {
  const fetchData = await fetch('http://localhost:4200/api/messages', {next: {tags: [TAG_STORE]}});
  const axiosData = await axios.get('http://localhost:4200/api/store');
  const json = await fetchData.json();
  console.log('fetchData', json);
  console.log('axiosData', axiosData.data);
  return json;
}

async function Chat(props: ChatProps) {

  return (
    <div className={styles.container}>
      <MessagesList />
      <MessageForm sender={'Sender'}/>
    </div>
  );
}

export default Chat;
