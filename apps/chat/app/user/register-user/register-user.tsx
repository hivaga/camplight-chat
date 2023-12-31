'use client';
import styles from './register-user.module.css';
import CheckInput from "../../../components/check-input/check-input";
import {FormEvent, useEffect, useState} from "react";
import {getClientStore, updateClientStore} from "../../../store/client-store";
import {getCurrentSession} from "../../../lib/sessions";


export interface RegisterUserProps {
}

export function RegisterUser(props: RegisterUserProps) {

  const now = Date.now();
  let {currentUser = '', expiresAt} = getClientStore();

  if(expiresAt && now >= expiresAt) {
    currentUser = '';
    updateClientStore({currentUser: '', expiresAt: undefined});
  }

  const [username, setUsername] = useState(currentUser);

  useEffect(() => {
    const fetchCurrentUser = async() => {
      const session = await getCurrentSession();
      if(session && session?.username) {
        updateClientStore({currentUser: session.username, expiresAt: session.expiresAt});
        setUsername(session.username);
      }
    }

    if(!username) {
      fetchCurrentUser();
    }
  }, [username]);

  // Handle form submission
  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const formData = new FormData(event.target as HTMLFormElement);
    const newUsername = formData.get('username');

    if (!newUsername) {
      alert('Please enter a username!');
      return;
    }

    // no point to do anything if the username is the same
    if (username === newUsername) {
      return;
    }

    try {
      console.log('Submitted Username:', newUsername);
      const response = await fetch('http://localhost:4200/api/session', {
        method: 'POST',
        body: JSON.stringify({username:newUsername}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const json = await response.json();
        console.log('User session created:', json);
        setUsername(newUsername as string);
        updateClientStore({currentUser: json.username , expiresAt: json.expiresAt})
      } else {
        // Handle any status other than 200, those are the error statuses
        const errorText = await response.text();
        console.error(`Error registering user: ${response.status} - ${errorText}`);
        alert(`Error: ${errorText}`);
        updateClientStore({currentUser: '', expiresAt: undefined});
        setUsername('');
      }
    } catch (e) {
      console.log('Error registering user:', e);
      alert(`Unexpected error while registering user!`);
      updateClientStore({currentUser: '', expiresAt: undefined});
      setUsername('');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.registerUserForm}>
        <label className={styles.labelContainer}>
          <span>Name:</span>
          <CheckInput defaultValue={username} placeholder={'Input your chat name'} formName={'username'} showSuccess={!!username}/>
          <button type="submit">{!username ? 'Login' : 'Change'}</button>
        </label>
      </form>
    </>
  );
}

export default RegisterUser;
