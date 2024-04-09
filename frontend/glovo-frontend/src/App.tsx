import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Ristorante } from './interfaces/helper';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginForm';
import RestaurantsPage from './pages/RestaurantsPage';
import MenuPage from './pages/MenuPage';
import SignUpPage from './pages/SignUpPage';
import { Utente } from './interfaces/helper';
import OrdersPage from './pages/OrdersPage';
import BalancePage from './pages/BalancePage';
import CartPage from './pages/CartPage';
import './styles/App.css'; // Import the CSS file for styling

function App() {
  
  const [restaurants, setRestaurants] = useState<Ristorante[]>();
  const [user, setUser] = useState<Utente>();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [products, setProducts] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && user.ruolo === 'cliente' && 
              <li>
                <Link to="/restaurants">Restaurants</Link>
              </li>
            }
            {user  && 
              <li>
                <Link to="/orders">Orders</Link>
              </li>
            }
            {user && <li><Link to="/balance"> Balance</Link></li>}
            {user && user.ruolo === 'cliente' && <li><Link to="/cart"> Cart</Link></li>}
            {user && `Logged in as ${user ? user.ruolo : ''} | `} 
            {user ? <li><Link to="/login">Logout</Link></li> : <Link to="/login">Login</Link>}    
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/restaurants" element={<RestaurantsPage restaurants={restaurants} setRestaurants={setRestaurants} setSelectedRestaurant={setSelectedRestaurant} />} />
          <Route path="/:restaurantName/menu/" element={<MenuPage products={products} setProducts={setProducts} selectedRestaurant={selectedRestaurant} setCartItems={setCartItems} />} /> 
          <Route path="/orders" element={<OrdersPage user={user} />} /> 
          <Route path="/balance" element={<BalancePage user={user} />} />
          <Route path="/signup" element={<SignUpPage user={user} setUser={setUser} />} />
          <Route path="/cart" element={<CartPage user={user} cartItems={cartItems} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


/* import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Ristorante } from './interfaces/helper';
import HomePage from './HomePage'
import LoginForm from './LoginForm';
import RestaurantsPage from './RestaurantsPage';
import MenuPage from './MenuPage';
import SignUpPage from './SignUpPage';
import { Utente } from './interfaces/helper';
import OrdersPage from './OrdersPage';
import BalancePage from './BalancePage';
import CartPage from './CartPage';

function App() {
  
  const [restaurants, setRestaurants] = useState<Ristorante[]>()
  const [user, setUser] = useState<Utente>()
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [products, setProducts] = useState(null)
  const [cartItems, setCartItems] = useState([])
  return (
    <>
      <Router>
      <div>
        <nav className="bg-dark">
          <ul>
            <li>
              <Link to="">Home</Link>
            </li>
              {user && user.ruolo === 'cliente' && 
                <li>
                  <Link to="/restaurants">Restaurants</Link>
                </li>
              }
              {user  && 
                <li>
                  <Link to={`/orders`}>Orders</Link>
                </li>
              }
            <li>
            {user && `Logged in as ${user ? user.ruolo : ''} | `} {user ? <Link to="/login">Logout</Link> : <Link to="/login">Login</Link> }
            {user && <li><Link to={`/balance`}>Balance</Link></li>}
            {user && user.ruolo === 'cliente' && <li><Link to={`/cart`}>Cart</Link></li>}
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/login" element={<LoginForm setUser={setUser}/>}/>
          <Route path="/restaurants" element={<RestaurantsPage restaurants={restaurants} setRestaurants={setRestaurants} setSelectedRestaurant={setSelectedRestaurant}/>}/>
          <Route path="/:restaurantName/menu/" element={<MenuPage products={products} setProducts={setProducts} selectedRestaurant={selectedRestaurant} setCartItems={setCartItems}/>} /> 
          <Route path="/orders" element={<OrdersPage user={user}/>}/> 
          <Route path="/balance" element={<BalancePage user = {user}/>}/>
          <Route path="/signup" element={<SignUpPage user={user} setUser={setUser}/>}/>
          <Route path="/cart" element={<CartPage user={user} cartItems={cartItems}/>}/>
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App */


// App.js
