import React, { useEffect, useState } from 'react'
// axios
import axios from 'axios'
// icon
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { useFavourites } from './Context/FavouriteContext'

// Favourite component
const Favourite = (props) => {
  const [Favourited, setFavourited] = useState(false)
  const { fetchFavouritedProducts } = useFavourites()

  // takes in all the props
  const variable = {
    userFrom: props.userFrom,
    productId: props.productId,
    productName: props.productName,
    allergens: props.allergens,
    newMatches: props.newMatches,
    ingredients: props.ingredients,
    traces: props.traces,
  }

  // loads the favourited items
  useEffect(() => {
    // post request to check if the product has already been favourited
    axios
      .post('http://192.168.0.30:5000/favourite/favourited', variable)
      .then((response) => {
        if (response.data.success) {
          // sets the result to the state
          setFavourited(response.data.favourited)
        } else {
          alert('Failed to get Favorite Info')
        }
      })
  }, [])

  // method that either adds or removes a favourite
  const handleAddToFavourites = () => {
    if (Favourited) {
      axios
        .post('http://192.168.0.30:5000/favourite/removeFavourites', variable)
        .then((response) => {
          if (response.data.success) {
            console.log('Removed from favourites')
            setFavourited(!Favourited)
            fetchFavouritedProducts()
          } else {
            alert(' Failed to remove from favourite')
          }
        })
    } else {
      axios
        .post('http://192.168.0.30:5000/favourite/addFavourites', variable)
        .then((response) => {
          if (response.data.success) {
            console.log('Added to favourites')
            setFavourited(!Favourited)
            fetchFavouritedProducts()
          } else {
            alert(' Failed to add to Favourites')
          }
        })
    }
  }

  // Favourite button
  return (
    <TouchableOpacity onPress={() => handleAddToFavourites()}>
      <Icon
        name={Favourited ? 'favorite' : 'favorite-border'}
        type="material"
        size={30}
        color={Favourited ? 'red' : 'white'}
      />
    </TouchableOpacity>
  )
}

export default Favourite
