import React from 'react'
import Display from '../../ui/menu/Display'
import { Nav } from '../../../types/types'
import { CalendarDays, Calendar1, Clock8 } from 'lucide-react'

function DateTime() {
  // time, date
  const data: Nav[] = [
    {
      navLink: "date",
      icon: <Calendar1 strokeWidth={1} className='w-7 h-7'/>,
      title: "date"
    },
    {
      navLink: "time",
      icon: <Clock8 strokeWidth={1} className='w-7 h-7'/>,
      title: "time"
    },
    {
      navLink: "calendar",
      icon: <CalendarDays strokeWidth={1} className='w-7 h-7'/>,
      title: "calendar"
    },
  ]
  return (
    <Display text='Date & time' array={data}/>
  )
}

export default DateTime