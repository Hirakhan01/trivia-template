import Image from 'next/image'
import React from 'react'
import { AbsoluteFill, Img, staticFile } from 'remotion'
import Options from './Options';

interface QuizSceneProps {
    image: string;
    options: string[];
    question: string;
    correctAnswer: string;
  }

function QuizScene(props: QuizSceneProps) {
    const {image, question, options , correctAnswer} =props
  return (
    <AbsoluteFill className='flex flex-col items-center justify-center'>
        <div className='opacity-80 h-full w-full'>

        <Img src={staticFile(`${image}`) } alt='img' className='h-full w-full' width={300} height={300} />
        </div>
        
        <div className='fixed z-10'>

        <h1 className='text-7xl'>{question}</h1>
        <Options options={options}/>
        </div>
        

    </AbsoluteFill>
  )
}

export default QuizScene