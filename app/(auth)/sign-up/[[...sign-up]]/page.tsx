import React from 'react'
import { SignUp} from '@clerk/nextjs'

const page = () => {
  return (
    <div className='h-screen glassmorhism-auth w-full flex-center'>
        <SignUp/>
    </div>
  )
}

export default page