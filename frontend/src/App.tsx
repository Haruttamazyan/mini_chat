import './App.css';
import Chat from './components/chat';
import { WebSocketProvider, socket } from './contexts/WebSocketContext';

function App() {
  return (
    <div className="App">
      <WebSocketProvider value={socket}>
            <Chat />
      </WebSocketProvider>

      
      </div>
  );
}

export default App;
