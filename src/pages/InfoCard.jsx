import React from 'react'
import { data } from '../constants/InfoData'
import FlipCard from '../components/flip-card'

const InfoCard = () => {
    
  return (
      <div className="grid lg:grid-cols-3 place-items-center grid-cols-2 gap-8 p-9">
        {data.map((card) => (
          <FlipCard
            rotate="y"
            {...card}
          />
        ))}
      </div>
  )
}

export default InfoCard