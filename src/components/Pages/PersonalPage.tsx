import React, { FC, useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import './index.scss'
import Loader from '../Tools/Loader'
import NotFound from '../Tools/NotFound'
import chips from './../../img/chips.png'
import glass from './../../img/full.png'
import { IBeer } from '../interfaces'

const PersonalPage:FC = () => {
  const [beer,setBeer] = useState<IBeer|null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()

  useEffect(()=>{
    setIsLoading(true)
    axios.get(`https://api.punkapi.com/v2/beers/${params.id}`).then((response) =>{ 
      if(response.data) setBeer(response.data[0]) 
    }).catch(err=> console.log(err))
    .finally(() =>  setIsLoading(false))
  },[])

  if (isLoading) return <Loader/>

  return (
    <div className='container-beer'>
      {beer === null
      ? <NotFound/>
      : <div className='beer'>
        <div className='title'>{beer.name}</div>
         <img className='beer-view' src={beer.image_url} alt={beer.name} />
            <div className='beer-details'>
              <div className='tagline'>{beer.tagline}</div>
              <div className='beer-description'>{beer.description}</div>
              <div className='beer-abv'> ABV: {beer.abv} %</div>
              <div className='text-food-pairing'>Food Pairing</div>
              <div className='food-pairing'>
                <img src={glass} className='glass-beer' alt=''/>
                <div>
                  { beer.food_pairing.map((el:string) => <p key={el}>{el}</p>)}
                </div>
              </div>
            </div>
            <img src={chips} className='chips' alt=''/>
        </div>
      }
      <Link className='to-back' to='/'>
        <button className='button'>назад</button>
      </Link>
    </div>
  )
}

export default PersonalPage