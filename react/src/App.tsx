import { useState } from 'react'
import './App.css'
import { Rnd } from 'react-rnd'
import {
  Button,
  Frame,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader
} from 'react95';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Rnd>
        <Window resizable className='window'>
          <WindowHeader className='window-title'>
            <span>react95.exe</span>
            <Button>
              <span className='close-icon' />
            </Button>
          </WindowHeader>
          <Toolbar>
            <Button variant='menu' size='sm'>
              File
            </Button>
            <Button variant='menu' size='sm'>
              Edit
            </Button>
            <Button variant='menu' size='sm' disabled>
              Save
            </Button>
          </Toolbar>
          <WindowContent>
            <p>
              When you set &quot;resizable&quot; prop, there will be drag handle
              in the bottom right corner (but resizing itself must be handled by
              you tho!)
            </p>
          </WindowContent>
          <Frame variant='well' className='footer'>
            Put some useful information here
          </Frame>
        </Window>
      </Rnd>

    </>
  )
}

export default App
