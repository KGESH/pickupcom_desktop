import { Suspense, useState } from 'react';
import reactLogo from './assets/react.svg';
import { Button } from '@/components/ui/button';
import QueryProvider from '@/lib/react-query/query-provider';
import './App.css';
import { invokeSystemCommand } from '@/services/tauri/invoke';
import SystemInfo from '@/components/hardware-spec/system-info';
import LoadingScreen from '@/components/common/loading-screen';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invokeSystemCommand('greet', { name }));
  }

  return (
    <QueryProvider>
      <main className="container">
        <h1>Welcome to Tauri + React</h1>

        <div className="row">
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo vite" alt="Vite logo" />
          </a>
          <a href="https://tauri.app" target="_blank">
            <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>

        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input id="greet-input" onChange={(e) => setName(e.currentTarget.value)} placeholder="Enter a name..." />
          <Button type="submit">Greet</Button>
        </form>
        <p>{greetMsg}</p>

        <Suspense fallback={<LoadingScreen />}>
          <SystemInfo />
        </Suspense>
      </main>
    </QueryProvider>
  );
}

export default App;
