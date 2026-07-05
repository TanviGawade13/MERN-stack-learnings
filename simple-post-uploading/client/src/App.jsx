import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
import './app.css'

const App = () => {
  return (
    <Routes>
      <Route path="/feed" element={<Feed />} />
      <Route path="/create-post" element={<CreatePost />} />
    </Routes>
  )
}

export default App