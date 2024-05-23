import React from 'react'
import { Card, Grid } from '@mui/material'
import Login from './Loging'
import Register from './Register'
import { Route, Routes } from 'react-router-dom'

const Authentication=()=>{
    return(
        <div>  
            <Grid container>
                <Grid className='h-screen overflow-hidden' item xs={7}>
                    <img className='h-full w-full' src='https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148881320.jpg' alt=''/>
                </Grid>
                <Grid item xs={5}>
                    <div className='px-20 flex flex-col justify-center h-full'>
                        <Card className='card p-8'>
                            <div className='flex flex-col item-center mb-5 space-y-1'>
                            <h1 className='log text-center'> Saja social</h1>
                            <p className='text-center text-sm w-[70&]'> Connecting Lives, Sharing moments: your social world, your way</p>
                            </div>
                            <Routes>
                            <Route path='/' element={<Login/>}></Route>
                            <Route path='/login' element={<Login/>}></Route>
                            <Route path='/register' element={<Register/>}></Route>

                            </Routes>
                            
                        </Card>


                    </div>
                </Grid>
            </Grid>



        </div>
    )
}

export default Authentication 