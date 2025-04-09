import React from 'react'
import {SignIn} from '@clerk/nextjs'

const page = () => {
  return (
    <div className='h-screen glassmorhism-auth w-full flex-center'>
        <SignIn/>
    </div>
  )
}

export default page