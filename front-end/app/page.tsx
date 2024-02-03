"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "@/node_modules/socket.io-client/build/esm/index";
import { MessageInput } from "./componant/MessageInput";
import { Messages } from "./componant/Messages";

export default function Home() {
  const [socket,setSocket] = useState<Socket>()
  const [messages, setMessages] = useState<string[]>([])

  const send = (value : string) => {
    socket?.emit("message", value);
  }
  useEffect(() =>{
    const newSocket = io("http://localhost:3002");
    setSocket(newSocket);
  }, [setSocket])

  const messageListener = (message: string) => {
    setMessages([...messages, message])
  }

  useEffect(() => {
    socket?.onAny((event, data) => {
      console.log(event)
      console.log(data)
      if (event === "message")
        messageListener(data)
    })
    return () => {socket?.offAny(messageListener)}
  },[messageListener])


  return (
    <>
      <MessageInput send={send} />
      <Messages messages={messages}/>
    </>
  );
}
