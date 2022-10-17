import { Routes, Route } from 'react-router-dom';
import './styles/scss/app.scss';

import Header from './components/Header';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Cart from './Pages/Cart';
import FullCartPizza from './Pages/FullCartPizza';


function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />}  />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path='/pizza/:id' element={<FullCartPizza />}/>
                </Routes> 
            </div>
        </div>
    )
}

export default App;