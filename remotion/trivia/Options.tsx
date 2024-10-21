import React from 'react'
interface OptionsProps{
    options:string[]
}

function Options(props:OptionsProps) {
    const {options}=props
  return (
    <div>{options.map((option)=>{
        return (
            <div className='grid grid-cols-2'>

                <p className='text-5xl'>{option}</p>
            </div>
        )

    })}</div>
  )
}

export default Options