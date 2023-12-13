import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './Theme'

const App = () => {
  return (
    <>

    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='*' element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>
    </ThemeProvider>

    </>
  )
}

export default App