import * as React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const handleKeyPress = (event : any) => {
  if(event.key === 'Enter'){
    console.log('enter press here! ')
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
