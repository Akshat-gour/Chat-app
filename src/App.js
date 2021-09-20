import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import { Timeline } from 'primereact/timeline'
import React, { useState } from 'react'
import './index.css'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

function App() {
    const [author, setAuthor] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([
        { author: 'Bot', message: 'Hello!' },
    ])

    socket.on('chat', (args) => {
        setMessages([...messages, args])
        console.log(messages)
    })
    const addMessage = () => {
        const send = { author, message }
        setMessages([...messages, send])
        setMessage('')
        socket.emit('chat', send)
    }
    return (
        <div className='App'>
            <form
                class='form-inline'
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-3'>
                        <div class='input-group mb-2 mr-sm-2'>
                            <div class='input-group-prepend'>
                                <div class='input-group-text sizea'>
                                    <i class='fas fa-user fa-1x'></i>
                                </div>
                            </div>
                            <input
                                type='text'
                                class='form-control mb-2 mr-sm-2'
                                id='inlineFormInputName2'
                                placeholder='Name'
                                value={author}
                                onChange={(e) => {
                                    setAuthor(e.target.value)
                                }}
                            ></input>
                        </div>
                    </div>
                    <div className='col-lg-8 col-md-8 col-sm-8'>
                        <input
                            type='text'
                            class='form-control'
                            id='inlineFormInputGroupUsername2'
                            placeholder='Message'
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value)
                            }}
                        ></input>
                    </div>
                    <div className='col-lg-1 col-md-1 col-sm-1'>
                        <button
                            type='submit'
                            class='btn btn-primary mb-2'
                            onClick={() => addMessage()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </form>
            <div className='card'>
                <h5>Conversation</h5>
                <Timeline
                    value={messages}
                    opposite={(item) => item.author}
                    content={(item) => (
                        <small className='p-text-secondary'>
                            {item.message}
                        </small>
                    )}
                />
            </div>
        </div>
    )
}

export default App
