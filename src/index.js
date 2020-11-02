import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.css'

import practitioners from './data/practitioners.json'
import appointments from './data/appointments.json'

ReactDOM.render(
  <React.StrictMode>
    <App practitioners={practitioners} appointments={appointments} />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
