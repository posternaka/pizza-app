import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/scss/app.scss'; 

// import components
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import Skeleton from './components/PizzaPreloadPlaceholder';

const container = document.getElementById('app');
const root = createRoot(container);

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://62dba18de56f6d82a774e889.mockapi.io/items')
      .then(res => res.json())
      .then(item => {
        setItems(item)
        setIsLoading(false)
      })
  }, [])



  return (
    <div className="wrapper">
      <Header />
      <div className="content">
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
      </div>
    </div>
  )
}

root.render(<App />);