import React from 'react';

import Categories from '@/components/Categories';
import Sort from '@/components/Sort';
import PizzaBlock from '@/components/PizzaBlock/PizzaBlock';
import Skeleton from '@/components/PizzaBlock/PizzaPreloadPlaceholder';

function Home() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState(
        {name: 'популярности', sortType: 'rating', order: 'asc'},
    );

    console.log(sortType);

    React.useEffect(() => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        setIsLoading(true)
        fetch(`https://62dba18de56f6d82a774e889.mockapi.io/items?${category}&sortBy=${sortType.sortType}&order=${sortType.order}`) 
        .then(res => res.json())
        .then(item => {
            setItems(item)
            setIsLoading(false)
        });
        window.scrollTo(0, 0);
    }, [categoryId, sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} cbSetCategory={(id) => setCategoryId(id)} />
                <Sort sortType={sortType} cbSetSort={(i) => setSortType(i)} />
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