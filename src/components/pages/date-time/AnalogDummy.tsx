import React from 'react'

function AnalogDummy() {
  return (
    <div className='relative w-[160px] h-[160px] rounded-full bg-bgColor backdrop-blur-xl'>
        <div className='absolute transform translate-x-[-50%] translate-y-[-50%] top-[5%] left-1/2'><p className="text-[13px]">12</p></div>
        <div className='absolute transform translate-x-[-50%] translate-y-[-50%] left-[90%] top-1/2 flex items-center justify-end gap-1.5'>
            <p className="text-[13px]">3</p>
            <div className='h-[1px] w-3 bg-textColor rounded-full'></div>
        </div>
        <div className='absolute transform translate-x-[-50%] translate-y-[-50%] top-[95%] left-1/2'><p className="text-[13px]">6</p></div>
        <div className='absolute transform translate-x-[-50%] translate-y-[-50%] top-1/2 left-[10%] flex items-center gap-1.5 '>
            <div className='h-[1px] w-3 bg-textColor rounded-full'></div>
            <p className="text-[13px]">9</p>
        </div>
        {/* HOUR */}
        <div className='absolute transform translate-x-[-50%] translate-y-[-50%] origin-right rotate-[130deg] top-1/2 left-[40%] h-[1.5px] w-8 bg-textColor rounded-full z-10'></div>
        {/* MINUTE */}
        <div className='absolute transform translate-x-[-50%] translate-y-[-50%] origin-right rotate-90 top-1/2 left-[30%] h-[1.5px] w-16 bg-textColor rounded-full'></div>
    </div>
  )
}

export default AnalogDummy