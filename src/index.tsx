import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './sass/style.css'
import { store } from './store'
import MainRouter from './routes'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <Provider store={ store }>
        <MainRouter />
    </Provider>
  </React.StrictMode>
)