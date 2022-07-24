import React, { ChangeEvent, FC, useCallback, useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import './index.scss'
import Loader from '../Tools/Loader';
import NotFound from '../Tools/NotFound';
import lupa from './../../img/lupa.png'
import xletter from './../../img/xletter.png'
import { BEERS, PAGES } from '../../consts';
import { IBeer } from '../interfaces';

const MainPage:FC = () => {
  const [beers,setBeers] = useState<IBeer[]>([])
  const [page,setPage] = useState<number>(1)
  const [perPage,setPerPage] = useState<number>(10)
  const [beerName,setBeerName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isVisibleText, setIsVisibleText] = useState<boolean>(true)

  useEffect(()=>{ 
    getBeers() 
  },[page])

  const getBeers = useCallback(async () => {
    setIsLoading(true)
    let address = `${BEERS}?per_page=${perPage}&page=${page}`
    if(beerName !== '') address = `${BEERS}?beer_name=${beerName}&per_page=${perPage}&page=${page}`
    await axios.get(address)
    .then((response) => {
      console.log(response);
      if(response.data) setBeers(response.data)
    })
    .catch(err => console.log(err))
    .finally(() =>  setIsLoading(false))
  },[perPage,page,beerName])

  const inputHandler = (e:ChangeEvent<HTMLInputElement>) => setBeerName(e.target.value)
  const cardPerPageHandler = (e:ChangeEvent<HTMLInputElement>) => setPerPage(+e.target.value)

  return (
    <div className='container'>
      <div className='inputWrapper'>
        <div className='card-page'>
          { isVisibleText && <span className='text-page'>Beers per page</span> }
          <input 
            className='page-input'
            type="number" 
            onChange={cardPerPageHandler}
            onClick={()=> setIsVisibleText(false)}
            onBlur={(_)=> setIsVisibleText(true)}
            />
        </div>
        <div className='input-content'>
          <input value={beerName} onChange={inputHandler}/>
          { beerName && 
            <img 
              src={xletter} 
              className='xletter' 
              onClick={()=> setBeerName('')}
              alt=''
            /> 
          }
        </div>
        <button onClick={getBeers}><img src={lupa} alt=''/></button>
      </div>
      <div className='beers'>
        {
          isLoading 
          ? <Loader/>
          : beers.length < 1 
            ? <NotFound/>
            : <>
                <div className='beers-container'>
                  {beers.map((el:IBeer)=> 
                    <Link className='link' key={el.id} to={`/${el.id}`}>
                      <div className='beercard'>
                        <img className='img-beer' src={el.image_url} alt={el.name} />
                        <span className='beer-name'>
                          {el.name.length >30 ? el.name.slice(0,30)+'...' : el.name}
                        </span>
                        <div className='description'>
                          {el.description.length > 140 ? el.description.slice(0,140)+'...' : el.description}
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
                <div className='pagesNumber'>
                  {PAGES.map(el => <div key={el} onClick={()=>setPage(el)} className={el === page ? 'active pageNumber' : 'pageNumber' }>{el}</div>)}
                </div>
              </>
        }
      </div>
    </div>
  )
}

export default MainPage