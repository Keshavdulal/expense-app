import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Graph from './pages/Graph'
import { Header } from './components/Header'

import s from './App.module.scss'

function App() {
  return (
    <div className={s.app}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='graph' element={<Graph />} />
      </Routes>
    </div>
  )
}

export default App
