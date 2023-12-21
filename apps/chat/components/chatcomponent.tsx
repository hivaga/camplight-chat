'use client'
import React, {useState, useEffect, useRef, ChangeEvent, FormEvent, MouseEvent} from 'react';

interface Message {
  id: number;
  text: string;
}

function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const dataChannel = useRef<RTCDataChannel | null>(null);
  const [dataChannelReady, setDataChannelReady] = useState<boolean>(false);

  useEffect(() => {
    // Initialize WebRTC peer connection
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // Create data channel for sending messages
    dataChannel.current = peerConnection.current.createDataChannel('chat');

    dataChannel.current.onopen = () => setDataChannelReady(true);
    dataChannel.current.onclose = () => setDataChannelReady(false);

    // Handle incoming data channel messages
    dataChannel.current.onmessage = (event: MessageEvent) => {
      const msg: Message = { id: Date.now(), text: event.data };
      setMessages(prevMessages => [...prevMessages, msg]);
    };

    // Handle incoming data channels (if this peer is the receiver)
    peerConnection.current.ondatachannel = (event) => {
      const receiveChannel = event.channel;
      receiveChannel.onmessage = (e: MessageEvent) => {
        const msg: Message = { id: Date.now(), text: e.data };
        setMessages(prevMessages => [...prevMessages, msg]);
      };
    };

    // Handle ICE candidates
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('send candidate', event.candidate);
        // Send the candidate to the remote peer using your signaling mechanism
      }
    };

    // Additional setup for peerConnection (ICE candidates, etc.)

    return () => {
      peerConnection.current?.close();
    };
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    if (!newMessage.trim() || !dataChannelReady) return;

    // Send message via WebRTC data channel
    dataChannel.current?.send(newMessage);

    const newMsg: Message = { id: Date.now(), text: newMessage };
    setMessages(messages => [...messages, newMsg]);
    setNewMessage('');
  };

  // Placeholder for signaling-related functions and states

  return (
    <div>
      <h2>Chat</h2>
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" value={newMessage} onChange={handleInputChange}/>
        <button type="submit" onClick={handleSubmit}>Send</button>
      </form>
      <div>
        {messages.map((message) => (
          <p key={message.id}>{message.text}</p>
        ))}
      </div>
      {/* UI elements for signaling (paste SDP and ICE candidates) */}
      {/* Placeholder for signaling UI elements */}
    </div>
  );
};

export default ChatComponent;
