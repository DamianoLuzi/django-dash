import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/App.css'

function FavouritesPage(props: any) {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value); // Update filter text state when input changes
  };
  
  const handleToggleFavourite = async (item: any) => {
    const isProduct = item.hasOwnProperty('price'); // Determine if the item is a product
    const isFavourite = isProduct 
      ? props.favouriteProducts.some((fav: any) => fav.pk === item.pk)
      : props.favouriteRestaurants.some((fav: any) => fav.pk === item.pk);

    try {
      if (isFavourite) {
        await axios.delete(`http://localhost:8000/${props.user.ruolo}/${props.user.username}/${isProduct ? 'favourite_products' : 'favourite_restaurants'}`, {
          data: item,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (isProduct) {
          props.setFavouriteProducts(props.favouriteProducts.filter((fav: any) => fav.pk !== item.pk));
          props.user.favourite_items = props.favouriteProducts.filter((fav: any) => fav.pk !== item.pk);
        } else {
          props.setFavouriteRestaurants(props.favouriteRestaurants.filter((fav: any) => fav.pk !== item.pk));
          props.user.favourite_restaurants = props.favouriteRestaurants.filter((fav: any) => fav.pk !== item.pk);
        }
      } else {
        await axios.post(`http://localhost:8000/${props.user.ruolo}/${props.user.username}/${isProduct ? 'favourite_products' : 'favourite_restaurants'}`, item);
        
        if (isProduct) {
          props.setFavouriteProducts([...props.favouriteProducts, item]);
          props.user.favourite_items = [...props.favouriteProducts, item];
        } else {
          props.setFavouriteRestaurants([...props.favouriteRestaurants, item]);
          props.user.favourite_restaurants = [...props.favouriteRestaurants, item];
        }
      }
    } catch (error) {
      console.error(`Error ${isFavourite ? 'removing from' : 'adding to'} favourites:`, error);
    }
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      const productsResponse = await axios.get(`http://localhost:8000/${props.user.ruolo}/${props.user.username}/favourite_products`);
      const restaurantsResponse = await axios.get(`http://localhost:8000/${props.user.ruolo}/${props.user.username}/favourite_restaurants`);

      if (productsResponse) props.setFavouriteProducts(productsResponse.data);
      if (restaurantsResponse) props.setFavouriteRestaurants(restaurantsResponse.data);
    };
    fetchFavourites();
    props.setFavouriteProducts(props.user.favourite_items)
    props.setFavouriteRestaurants(props.user.favourite_restaurants)
  }, [props.user.ruolo, props.user.username]);


  
  return (
    <>
      <h1>Your Favourites:</h1>
      <div>
        <input
          type="text"
          placeholder="Filter favourites"
          value={filterText}
          onChange={handleFilterChange}
        />
        
        <h2>Favourite Products:</h2>
        <ul className="card-list">
          {props.favouriteProducts
            .filter((product: any) =>
              product.name.toLowerCase().includes(filterText.toLowerCase())
            )
            .map((product: any, index: number) => (
              <li key={index} className="card">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: {product.price} €</p>
                {
                  props.user && props.user.ruolo == "cliente" &&
                  <button className="button" onClick={() => handleToggleFavourite(product)}>
                  {props.favouriteProducts.some((fav: any) => fav.pk === product.pk) ? 'Remove' : 'Add to Favourites'}
                  </button>
                }
              </li>
            )) }
        </ul> 

        <h2>Favourite Restaurants:</h2>
        <ul className="card-list">
          {props.favouriteRestaurants
            .filter((restaurant: any) =>
              restaurant.name.toLowerCase().includes(filterText.toLowerCase())
            )
            .map((restaurant: any, index: number) => (
              <li key={index} className="card">
                <h2>{restaurant.name}</h2>
                <p>{restaurant.address}</p>
                <p>{restaurant.description}</p>
                {
                  props.user && props.user.ruolo == "cliente" &&
                  <button className="button" onClick={() => handleToggleFavourite(restaurant)}>
                  {props.favouriteRestaurants.some((fav: any) => fav.username === restaurant.username) ? 'Remove' : 'Add to Favourites'}
                  </button>
                  }
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default FavouritesPage;
