import React from 'react'
 
import './App.css'

import {
  AudioProvider,
  WebSocketProvider,
} from "../../../dist/index.js"

import Content from "./Content"

function App() {

  return (
    <WebSocketProvider>
      <AudioProvider>
        <Content />
      </AudioProvider>
    </WebSocketProvider>
  )
}

export default App
