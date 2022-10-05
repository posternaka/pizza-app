import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '@/styles/scss/app.scss'; 

import Header from '@/components/Header';
import Home from '@/Pages/Home';
import NotFound from '@/Pages/NotFound';
import Cart from '@/Pages/Cart';

function App() {
    const [searchValue, setSearchValue] = React.useState('');
    console.log(searchValue);

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home searchValue={searchValue}/>}  />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes> 
            </div>
        </div>
    )
}

export default App;