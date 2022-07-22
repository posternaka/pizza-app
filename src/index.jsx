import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/scss/app.scss'; 

const container = document.getElementById('app');
const root = createRoot(container);

// import components
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

const App = () => (
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
             <PizzaBlock />
          </div>
        </div>
      </div>
    </div>
)

root.render(<App />);