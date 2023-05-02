import Card from "../Card/Card";
import s from './Cards.module.css'


const Cards = ({allDogs}) => {
    const allDogsList = allDogs
    return (
        <div className={s.cardsContainer}>
        {allDogsList?.map(dogs=>
            <Card dogs = {dogs} key={dogs.id}/>)  
        }
        </div>
    )
}


export default Cards;