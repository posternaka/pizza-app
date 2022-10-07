import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '@/styles/scss/app.scss'; 

import Header from '@/components/Header';
import Home from '@/Pages/Home';
import NotFound from '@/Pages/NotFound';
import Cart from '@/Pages/Cart';

export const SearchContext = React.createContext();

function App() {
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />}  />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes> 
                </div>
            </SearchContext.Provider>
        </div>
    )
}

export default App;