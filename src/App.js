import React from 'react'
import Search from './component/Search'
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Search/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
