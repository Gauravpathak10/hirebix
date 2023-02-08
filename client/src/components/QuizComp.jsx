import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import axios from 'axios'
import { AiOutlineClockCircle } from 'react-icons/ai';
import jsonData from '../assets/data.json'
import TimeUp from './TimeUp';
import { useNavigate } from 'react-router-dom';



const QuizComp = () => {
    const Ref = useRef(null);
    const navigate = useNavigate()
    const [timesisUp, setTimeisUp] = useState(false)

    // The state for our timer
    const [timer, setTimer] = useState('00:00');
    //useState Hook
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerResponse = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < jsonData.length) {
            setCurrentQuestion(nextQuestion);
        }
        else {
            setShowScore(true);
        }
    }
    const saveScore = async () => {
        const Userid = await JSON.parse(localStorage.getItem('user'))
        await axios.put(`http://localhost:5000/push/${Userid._id}`, { "points": score })
            .then((res) => {
                console.log(res.data.data.scores)
                localStorage.setItem('user', JSON.stringify(res.data.data));
            })
            .catch((err) => console.log(err))
    }
    const resetQuiz = () => {
        saveScore()
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    }



    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }


    const startTimer = (e) => {
        let { total, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )

        }
        if (total == 0) {
            setTimeisUp(true)
        }
    }


    const clearTimer = (e) => {
        setTimer('00:10');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }


    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);


    const onClickReset = () => {
        clearTimer(getDeadTime());
    }
    const Logout = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <>

            <div className='quizz-banner'>
                <div className="timer-title">
                    <h1>Start your quizz</h1>
                    <div className="clock">
                        <span><AiOutlineClockCircle /></span>
                        <span>{timer}</span>
                    </div>
                    <div>
                        <button onClick={onClickReset} className="btn">Reset</button>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <button onClick={Logout} className='btn'>Logout</button>
                    </div>
                </div>
                {
                    timesisUp && (
                        <TimeUp />
                    )
                }
                {!timesisUp && (
                    <div className='question-box'>
                        {showScore ? (
                            <div className='score-section'>
                                You have scored {score} out of {jsonData.length}
                                <>
                                    <button type="submit" onClick={resetQuiz}>Play Again!!</button>
                                </>
                            </div>
                        )
                            : (
                                <>
                                    <div className='question-section'>
                                        <div className='question-count'>
                                            <span>{currentQuestion + 1}</span>/{jsonData.length}
                                        </div>

                                        <div className='question-text'>
                                            {jsonData[currentQuestion].Question}
                                        </div>
                                    </div>

                                    <div className='answer-section'>
                                        {jsonData[currentQuestion].Answers.map((answer, i) =>
                                        (
                                            <button onClick={() => handleAnswerResponse(answer.isCorrect)} key={i}><span>{answer.id}</span>{answer.Answer}</button>
                                        ))}
                                    </div>
                                </>
                            )
                        }

                    </div>
                )}
            </div>
        </>
    );
}

export default QuizComp;