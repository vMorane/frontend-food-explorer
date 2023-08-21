import { AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { Button } from "../Button";
import { BoxCounter, ButtonMoreLess, Container, Counter } from "./styles";
import { Minus } from "../../assets/icons/minus";
import { Plus } from "../../assets/icons/plus";
import { useState } from "react";
import { ButtonTransparent } from "../ButtonTransparent";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export function Card({ title, image, id, description, price, setAllOrders, setFavoriteP, favoriteP,  ...rest}) {
  const [quantity, setQuantity] = useState(1)

  const navigate = useNavigate()

  const [favorite, setFavorite] = useState(() => {
    const localData = localStorage.getItem("@foodexplorer:favorites")

    if(localData){

      const favorites = JSON.parse(localData)
      const isFavorite = favorites.filter(dish => dish == id)

      if(isFavorite.length === 1){
        return true
      }
    }

    return false
  })

  

  function handleFavorites (){
    setFavorite(!favorite)
    
    if(favorite){
      const favoriteFiltered = favoriteP.filter(dish => dish !== id)
      setFavoriteP(favoriteFiltered)

    }else{
      setFavoriteP(prevState => [ ...prevState, id])
    }
  }

  const handleDetails = () => {
    navigate(`/details/${id}`)
  }

  function incrementCounter(){
    setQuantity(prevState => prevState + 1)
  }

  function decrementCounter(){
    if (quantity > 1) {
      setQuantity(prevState => prevState - 1)
    }
  }

  function handleAllQuantity() {
    const dishes = {
      id:id,
      name: title,
      image: image,
      price: price,
      quantity: quantity,
    }
  
    const savedDishes = JSON.parse(localStorage.getItem("@foodexplorer:dishes"))
    
    if(!savedDishes){
      setAllOrders(prevState =>[...prevState, dishes])
    }
    
    const filteredSavedDishes = savedDishes.filter(p => p.id !== dishes.id)

    setAllOrders(filteredSavedDishes)

    setAllOrders(prevState =>[...prevState, dishes])
}
  
  return(
    <Container {...rest}>
      <ButtonTransparent 
      Icon={favorite ? AiFillHeart :  AiOutlineHeart}
      className='icon'
      iconSize={30}
      iconColor={favorite ? 'red' : ''}
      onClick={() => handleFavorites(id)}
      />

      <div>
        <img src={`${api.defaults.baseURL}/dishes/${image}`} alt="dish image" />
        <div className="informations">
        <ButtonTransparent
        className="name"
        title={title}
        onClick={handleDetails}
        />
        <span>{description}</span>
        <h2>R$ {price}</h2>
        </div>
      </div>

      <BoxCounter>
        <Counter>
          <ButtonMoreLess onClick={decrementCounter}>
          <Minus />
          </ButtonMoreLess>
          <span>
          {quantity.toString().padStart(2,0)}
          </span>
          <ButtonMoreLess onClick={incrementCounter}>
          <Plus />
          </ButtonMoreLess>
        </Counter>
        <Button 
        title="incluir"
        onClick={handleAllQuantity}
        />
      </BoxCounter>
    </Container>
  )
}