import React, { FC} from 'react'
import './index.scss'

const Loader:FC = () => {
 

  return (
    <div className='container-loader'>
        <div className="bokal">
            <div className="beer-empty"/>
            <div className="beer-full"/>
        </div>
    </div>
  )
}

export default Loader