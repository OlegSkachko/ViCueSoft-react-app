import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import bokal from './../../img/empty.png'
import './index.scss'

const NotFound:FC = () => {

  const refresh = () => { 
    window.location.reload()
  }

  return (
    <>
      <div className='notfound'>
          <div className='notfound-info'>
              <img src={bokal} alt="empty" />
              <span className='span'>Not found</span>
          </div>
      </div>
      <Link className='to-back' to={'./'}>
        <button className='button' onClick={refresh}>Back</button>
      </Link>
    </>
  )
}

export default NotFound