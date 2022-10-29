import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/scss/app.scss';

import Header from './components/Header';

import Home from './Pages/Home';

const Cart = React.lazy(() => import('./Pages/Cart'));
const NotFound = React.lazy(() => import('./Pages/NotFound'));
const FullCartPizza = React.lazy(() => import('./Pages/FullCartPizza'));


function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />}  />
                    <Route path="*" element={
                        <React.Suspense fallback={<div>Идет загрузка данных...</div>}>
                            <NotFound />
                        </React.Suspense>} 
                    />
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