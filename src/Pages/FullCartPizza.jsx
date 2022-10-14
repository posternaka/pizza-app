import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

function FullCartPizza() {
  const [dataPizzas, setDataPizzas] = React.useState();
  // const { id } = useParams();
  const id = 1;

  React.useEffect(() => {
    async function fetch() {
      try {
        const {data} = await axios.get(`https://62dba18de56f6d82a774e889.mockapi.io/items/${id}`);
        setDataPizzas(data);
      } catch (error) {
        <h3>Ошибка получения пиццы {error.name}</h3>
      }
    }

    fetch()
  }, [id])

  if(!dataPizzas) {
    return 'Загрузка...';
  }

  return (
    <div className='container'>
      <div className='pizza-block'>
        <img 
          className="pizza-block__image" 
          src={dataPizzas.imageUrl} 
          alt={dataPizzas.name} 
        />
        <div >
          <h1>{dataPizzas.name}</h1>
          <h3>{dataPizzas.price} ₽</h3>
        </div>
      </div>
    </div>
  )
}

export default FullCartPizza;