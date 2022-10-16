import React from 'react';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setSortType, setPageCount, selectSort } from '../redux/slices/filterSlice';
import { fetchPizza, selectPizzaData } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/PizzaPreloadPlaceholder';
import Pagination from '../components/Pagination/index';


function Home() {
    const dispatch = useDispatch();
    const { categoryId, sortType, pageCount, searchValue } = useSelector(selectSort);
    const { items, status } = useSelector(selectPizzaData);
    
    const fetch = async () => {
        const search = searchValue ? `&search=${searchValue}` : '';
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        dispatch(fetchPizza({ search, category, pageCount, sortType }));

        window.scrollTo(0, 0);
    }

    React.useEffect(() => {
        fetch()
    }, [categoryId, sortType, searchValue, pageCount]);

    const pizzas = items.map(it => <PizzaBlock key={it.id} {...it} />);
    const skileton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} cbSetCategory={(id) => dispatch(setCategoryId(id))} />
                <Sort sortType={sortType} cbSetSort={(i) => dispatch(setSortType(i))} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            { 
                status === 'error'
                ?   <div className='content__error-info'>
                        <h2>Произошла ошибка 😕</h2>
                        <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                    </div>
                :   <div className="content__items">
                        {
                            status === 'loading' 
                            ? skileton
                            : pizzas
                        }
                    </div>
            }
            
            <Pagination onPageChange={(page) => dispatch(setPageCount(page))} />
        </div>
    )
}

export default Home;