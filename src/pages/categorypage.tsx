import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PageContext } from '../context/context';
import { useContext } from 'react';

interface ItemInterface {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}


const CategoryPage = () => {
  const navigate = useNavigate();
  const {activePage, setActivePage} = useContext(PageContext)
  const [item, setItem] = useState<ItemInterface[]>([])

  const getApi = () => {
    axios.get('https://fakestoreapi.com/products')
    .then((response) => {
        setItem(response.data)
    })
}

useEffect(() => {
    getApi()
},[])

  return (
    <div>
      {item.map((e) => (
            <div>
              {e.category === `${activePage}` ?
              <div className="border border-gray-200 rounded-lg m-10 p-5 flex sm:flex-row flex flex-col items-center h-max">
              <img src={e.image} className="h-36 w-32 cursor-pointer" onClick={() => {
    navigate(`/item/${e.id}`, {
        state: {
            id: e.id,
            image: e.image,
            title: e.title,
            description: e.description,
            category: e.category,
            price: e.price,
            rating: {
                rate: e.rating.rate,
                count: e.rating.count
            }
        }
    })
    setActivePage('')
}}/>
              <div className="flex flex-col justify-between h-36 pl-5 w-full">
                  <div className="flex flex-row">
                      <h1 className="text-3xl">{e.title}</h1>
                  </div>
                  <div className="flex flex-row justify-between w-full">
                      <h1 className="text-3xl">${e.price}</h1>
                      <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                  </div>
              </div>
              </div> : <></>}
                
            </div>
        ))}
    </div>
  )
}

export default CategoryPage