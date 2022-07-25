import React from 'react';

import Categories from '@/components/Categories';
import Sort from '@/components/Sort';
import PizzaBlock from '@/components/PizzaBlock';
import Skeleton from '@/components/PizzaPreloadPlaceholder';

function Home() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://62dba18de56f6d82a774e889.mockapi.io/items')
        .then(res => res.json())
        .then(item => {
            setItems(item)
            setIsLoading(false)
        });
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading 
                    ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
                    : items.map(data => <PizzaBlock key={data.id} {...data} />)
                }
            </div>
        </div>
    )
}

export default Home;