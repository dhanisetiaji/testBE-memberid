import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth'
import Home from './pages/home'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path='/auth' element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}

export default App