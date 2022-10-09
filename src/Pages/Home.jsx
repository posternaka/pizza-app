import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setSortType, setPageCount } from '@/redux/slices/filterSlice';

import { SearchContext } from '@/App';
import Categories from '@/components/Categories';
import Sort from '@/components/Sort';
import PizzaBlock from '@/components/PizzaBlock/PizzaBlock';
import Skeleton from '@/components/PizzaBlock/PizzaPreloadPlaceholder';
import Pagination from '@/components/Pagination/index';
import axios from 'axios';

function Home() {
    const { categoryId, sortType, pageCount } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const { searchValue } = React.useContext(SearchContext);
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const search = searchValue ? `&search=${searchValue}` : '';

    React.useEffect(() => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        setIsLoading(true)
    
        axios
            .get(`https://62dba18de56f6d82a774e889.mockapi.io/items?page=${pageCount}&limit=4&${category}${search}&sortBy=${sortType.sortType}&order=${sortType.order}`)
            .then(res => {
                setData(res.data)
                setIsLoading(false)
            })


        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, pageCount])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} cbSetCategory={(id) => dispatch(setCategoryId(id))} />
                <Sort sortType={sortType} cbSetSort={(i) => dispatch(setSortType(i))} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading 
                    ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
                    : data.map(it => <PizzaBlock key={it.id} {...it} />)
                }
            </div>
            <Pagination onPageChange={(page) => dispatch(setPageCount(page))} />
        </div>
    )
}

export default Home;