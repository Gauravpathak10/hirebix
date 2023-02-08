import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TimeUp = () => {
    const data = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        axios.get(`http://localhost:5000/get/${data._id}`)
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data.data));

            })
            .catch((err) => {
                console.log(err)
            })
    },[])
    return (
        <>
            {data.scores.points.length ?
                <div className='timeUp'>
                    <button className='btn' onClick={() => window.location.reload()}>Play Again</button>
                    <table border="1">
                        <tr>
                            <th>Score</th>
                            <th>Day</th>
                            <th>Date</th>
                            <th>Subject</th>
                        </tr>
                        {data.scores.points.map((list) => {
                            return <tr>
                                <td>{list.split(" ")[0]} /5</td>
                                <td>{list.split(" ")[1]}</td>
                                <td>{list.split(" ")[5]}</td>
                                <td>java</td>
                            </tr>
                        })}
                    </table>


                </div>
                :
                <div>
                    <h2>You have not scored till now</h2>
                    <button className='btn' onClick={() => window.location.reload()}>Play Now !</button>

                </div>
            }
        </>

    )
}

export default TimeUp