import React from 'react';

import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/PizzaPreloadPlaceholder';
import Pagination from '../components/Pagination/index';
import { useAppDispatch } from '../redux/store';
import { selectSort } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setPageCount, setSortType } from '../redux/filter/slice';
import { fetchPizza } from '../redux/pizza/asyncAction';
import { TSort } from '../redux/filter/types';


const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categoryId, sortType, pageCount, searchValue } = useSelector(selectSort);
    const { items, status } = useSelector(selectPizzaData);

    const onChangeCategoryId = React.useCallback((id : number) => {
        dispatch(setCategoryId(id));
    }, []);
    
    const fetch = async () => {
        const search = searchValue ? `&search=${searchValue}` : '';
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        dispatch(
            fetchPizza({ 
                search, 
                category, 
                pageCount, 
                sortType 
            }),
        );

        window.scrollTo(0, 0);
    }

    React.useEffect(() => {
        fetch()
    }, [categoryId, sortType, searchValue, pageCount]);

    const pizzas = items.map((it: any) => <PizzaBlock key={it.id} {...it} />);
    const skileton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} cbSetCategory={onChangeCategoryId} />
                <Sort sortType={sortType} cbSetSort={(i: TSort) => dispatch(setSortType(i))} />
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