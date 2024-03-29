import { createContext } from "react";
import { Socket, io } from "socket.io-client";


export const socket = io(process.env.REACT_APP_SOCKET_URL as any)
export const WebSocketContext = createContext<Socket>(socket);
export const WebSocketProvider = WebSocketContext.Provider;