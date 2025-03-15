"use client"

import React,{useEffect,useState} from 'react'
import socket from '@/utils/socket'

function CHat({userId,recepientId}: string | any) {
    const [messges,setMessages] = useState([])
    const [message,setMessage] = useState('')


    useEffect(() =>{
        socket.emit('joinRoom',{userId})

        // socket.on('receiveMessage',(msg:any)=> setMessages((prev: string | any) =>
        // [...prev,msg]))
    })
  return (
    <div>
      
    </div>
  )
}

export default CHat
