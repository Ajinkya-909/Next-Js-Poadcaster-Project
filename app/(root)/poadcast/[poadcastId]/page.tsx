import React from 'react'

const PoadcastDetails = ({params}:{params:{poadcastId:string}}) => {
  return (
    <div> <h1 className='text-20 font-bold text-white-1'> PoadCast Details {params.poadcastId}</h1></div>
  )
}

export default PoadcastDetails