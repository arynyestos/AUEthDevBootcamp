import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Balance} from './Balance'
import {Block} from './Block'
import {Tx} from './Tx'
import Search from './Search'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search/>}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='balance/:address' element={<Balance/>}></Route>
            <Route path='tx/:hashTx' element={<Tx/>}></Route>
            <Route path='block/:blockNum' element={<Block/>}></Route>
          </Route>
        </Routes>    
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

