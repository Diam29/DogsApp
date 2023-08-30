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
        // <div className='row row-cols-8 row-cols-md-8 g-4col-8'>
        // {allDogsList?.map(dogs=>
        //     <Card dogs = {dogs} key={dogs.id}/>)  
        // }
        // </div>
    )
}


export default Cards;