"use client";

import React, {useEffect, useState, useRef} from 'react';
import io, {Socket} from 'socket.io-client';

interface IceCandidateEvent extends Event {
  candidate: RTCIceCandidate | null;
}

function WebRTCChat() {
  const [localMessage, setLocalMessage] = useState<string>('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const dataChannel = useRef<RTCDataChannel | null>(null);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to the signaling server
    socket.current = io('https://your-signaling-server.com');

    // Initialize the peer connection
    const pc = new RTCPeerConnection({
      iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
    });

    // Create the data channel for sending messages
    const channel = pc.createDataChannel("messages");
    dataChannel.current = channel;

    channel.onmessage = (event: MessageEvent) => {
      setReceivedMessages(messages => [...messages, event.data]);
    };

    // Handle ICE candidate event
    pc.onicecandidate = (event: IceCandidateEvent) => {
      if (event.candidate) {
        socket.current?.emit('candidate', event.candidate);
      }
    };

    // When receiving an ICE candidate from the signaling server
    socket.current?.on('candidate', (candidate: RTCIceCandidateInit) => {
      pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    // When receiving an offer
    socket.current?.on('offer', (offer: RTCSessionDescriptionInit) => {
      pc.setRemoteDescription(new RTCSessionDescription(offer));
      pc.createAnswer().then(answer => {
        pc.setLocalDescription(answer);
        socket.current?.emit('answer', answer);
      });
    });

    // When receiving an answer
    socket.current?.on('answer', (answer: RTCSessionDescriptionInit) => {
      pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    peerConnection.current = pc;

    return () => {
      // Cleanup on unmount
      pc.close();
      socket.current?.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (dataChannel.current) {
      dataChannel.current.send(localMessage);
      setLocalMessage('');
    }
  };

  const onChangeHandler = (e: any) => {
    setLocalMessage(e.target.value);
  }

  return (
    <div>
      <textarea value={localMessage} onChange={onChangeHandler} placeholder="Type a message"></textarea>
      <button onClick={sendMessage}>Send</button>
      <div>
        <h2>Received Messages:</h2>
        {receivedMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  )

}

export default WebRTCChat;
