import React, { useState } from 'react'
import axios from 'axios'
import thumbnailImg from '../assets/test.gif';
import { AiOutlineUserAdd, AiOutlineMail } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [islogin, setislogin] = useState(false)
    const navigate = useNavigate()
    const [user, setuser] = useState({
        userName: "",
        email: ""
    })
    const register = () => {
        axios.post('http://localhost:5000/create', user)
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data.data));
                navigate('/test')

            })
            .catch((err) => {
                navigate('/')
            })
    }
    const login = () => {
        axios.post('http://localhost:5000/login', { email: user.email })
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data.data));
                navigate('/test')

            })
            .catch((err) => {
                navigate('/')
            })
    }
    return (
        <>
            <h3 className='landing-title'>Welcome to QuizzBuzz !!</h3>
            <div className='register-user'>
                <div className="thumbail">
                    <img src={thumbnailImg} alt="" />
                </div>
                <div className='container'>
                    <div className='span-icons'>
                        <span>
                            <AiOutlineUserAdd />
                        </span>
                        <input type="text" name='userName' value={user.userName} placeholder="username.." onChange={(e) => setuser({ ...user, userName: e.target.value })} />
                    </div>
                    <div className='span-icons'>
                        <span>
                            <AiOutlineMail />
                        </span>
                        <input type="email" name='email' value={user.email} placeholder="email" onChange={(e) => setuser({ ...user, email: e.target.value })} />
                    </div>

                    {!islogin && (
                        <button onClick={register}>register</button>
                    )}
                    {islogin && (
                        <button onClick={login}>login</button>
                    )}
                    <a href='#' style={{ fontSize: "15px", margin: "5px" }} onClick={() => setislogin(true)}>Already have an account</a>
                </div>

            </div>
        </>
    )
}

export default Register