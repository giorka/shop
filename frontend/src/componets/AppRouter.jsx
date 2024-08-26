import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '../router/routes'

function AppRouter() {
  return (
    <Routes>
           {routes.map(route =>
            <Route path={route.path} element={route.component} key={route.path}/>
            )}
           <Route path="*" element={<Navigate to="/error" replace />} key="*"/>
    </Routes>
  )
}

export default AppRouter
