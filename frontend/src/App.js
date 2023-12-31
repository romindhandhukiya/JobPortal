import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './Theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LogIn from './pages/LogIn'
import UserDashboard from './pages/user/UserDashboard'
import UserRoute from './components/UserRoute'
import Layout from './pages/global/Layout'
import { ProSidebarProvider } from 'react-pro-sidebar'
import UserJobsHistory from './pages/user/UserJobsHistory'

//HOC
const UserDashboardHOC = Layout(UserDashboard)
const UserJobsHistoryHOC = Layout(UserJobsHistory)

const App = () => {
  return (
    <>
    <ToastContainer/>
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <ProSidebarProvider>

          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Home/>}></Route>
                  <Route path='/search/location/:location' element={<Home />} />
                  <Route path='/search/:keyword' element={<Home />} />
                  <Route path='/login' element={<LogIn />} />
                  <Route path='/user/dashboard' element={<UserRoute><UserDashboardHOC /></UserRoute>} />
                  <Route path='/user/jobs' element={<UserRoute><UserJobsHistoryHOC /></UserRoute>} />
                  <Route path='*' element={<NotFound/>}></Route>
              </Routes>
          </BrowserRouter>
        </ProSidebarProvider> 
    </ThemeProvider>

    </>
  )
}

export default App