import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../Pages/SignUp'
import { Users } from '../Pages/Users'

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Signup />} />
                <Route path='/list' element={<Users />} />
            </Routes>
        </>
    )
}

export default AllRoutes