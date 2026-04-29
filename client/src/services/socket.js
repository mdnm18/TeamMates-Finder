import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL 
    ? import.meta.env.VITE_API_URL.replace('/api', '') 
    : 'http://localhost:5001';

export const socket = io(SOCKET_URL, {
    autoConnect: false, // Ensures we only construct connection when authenticated natively
    reconnection: true,
});

export const connectSocket = (userId) => {
    if (!socket.connected) {
        socket.connect();
    }
    socket.emit('register', userId);
};

export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};

export default socket;
