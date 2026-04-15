import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;
  private systemHealthSocket: Socket | null = null;

  // Connect to main namespace
  connect(): Socket {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        autoConnect: true,
      });

      this.socket.on('connect', () => {
        console.log('Connected to main socket:', this.socket?.id);
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from main socket');
      });
    }
    return this.socket;
  }

  // Connect to system health namespace
  connectSystemHealth(): Socket {
    if (!this.systemHealthSocket) {
      this.systemHealthSocket = io(`${SOCKET_URL}/system-health`, {
        transports: ['websocket', 'polling'],
        autoConnect: true,
      });

      this.systemHealthSocket.on('connect', () => {
        console.log('Connected to system-health socket:', this.systemHealthSocket?.id);
      });

      this.systemHealthSocket.on('disconnect', () => {
        console.log('Disconnected from system-health socket');
      });

      this.systemHealthSocket.on('connect_error', (error) => {
        console.error('System health socket connection error:', error);
      });
    }
    return this.systemHealthSocket;
  }

  // Disconnect from system health namespace
  disconnectSystemHealth(): void {
    if (this.systemHealthSocket) {
      this.systemHealthSocket.disconnect();
      this.systemHealthSocket = null;
    }
  }

  // Request immediate refresh
  requestRefresh(): void {
    if (this.systemHealthSocket?.connected) {
      this.systemHealthSocket.emit('requestRefresh');
    }
  }

  // Get system health socket
  getSystemHealthSocket(): Socket | null {
    return this.systemHealthSocket;
  }

  // Disconnect all sockets
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.disconnectSystemHealth();
  }
}

export const socketService = new SocketService();
export default socketService;
