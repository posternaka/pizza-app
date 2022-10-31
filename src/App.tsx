import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/scss/app.scss';
import Loadable from 'react-loadable';

import Header from './components/Header';

import Home from './Pages/Home';

// const Cart = React.lazy(() => import(/*webpackChunkName: "Cart"*/'./Pages/Cart'));

const Cart = Loadable({
    loader: () => import(/*webpackChunkName: "Cart"*/'./Pages/Cart'),
    loading: () => <div>Идет загрузка данных...</div>,
  });

const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/'./Pages/NotFound'));
const FullCartPizza = React.lazy(() => import(/*webpackChunkName: "FullCartPizza"*/'./Pages/FullCartPizza'));


function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />}  />
                    <Route path="*" element={
                            <NotFound />
                    } />
                    <Route path="/cart" element={
                        <React.Suspense fallback={<div>Идет загрузка данных...</div>}>
                            <Cart />
                        </React.Suspense>} 
                    />
                    <Route path='/pizza/:id' element={
                        <React.Suspense fallback={<div>Идет загрузка данных...</div>}>
                            <FullCartPizza />
                        </React.Suspense>}
                    />
                </Routes> 
            </div>
        </div>
    )
}

export default App;