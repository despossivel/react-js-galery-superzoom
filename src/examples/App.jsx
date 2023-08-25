import React from 'react';
import {
  AudioProvider,
  WebSocketProvider,
} from '../lib/index.js'

import Content from "./Content.jsx"

const App = () => {

  return <WebSocketProvider>
    <AudioProvider>
      <Content />
    </AudioProvider>
  </WebSocketProvider>

};

export default App;
