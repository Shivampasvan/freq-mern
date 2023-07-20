import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../Pages/SignUp'
import { DataList } from '../Pages/DataList'

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Signup />} />
                <Route path='/list' element={<DataList />} />
            </Routes>
        </>
    )
}

export default AllRoutes