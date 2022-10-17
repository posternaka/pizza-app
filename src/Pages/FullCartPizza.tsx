import React from 'react';
import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FullCartPizza: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<{
        imageUrl: string;
        name: string;
        price: number;
    }>();
    console.log(data);

    React.useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`https://62dba18de56f6d82a774e889.mockapi.io/items/${id}`)
                setData(data);
            } catch (error) {
                alert('Ошибка');
                navigate('/');
            }
        };

        fetch();
        
    }, []);

    if(!data) {
        return <div className='container'>Загрузка...</div>
    }

    return (
        <div className='container'>
            <div className='pizza-block'>
            <img 
                className="pizza-block__image" 
                src={data.imageUrl} 
                alt={data.name}
            />
            <div >
                <h1>{data.name}</h1>
                <h3>{data.price} ₽</h3>
            </div>
            </div>
        </div>
    )
}

export default FullCartPizza;