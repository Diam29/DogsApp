import { Link } from "react-router-dom";
import s from './Card.module.css'

const Card = ({dogs}) => {

    const {id, name, image, temperament, weight, height} = dogs

    return (
        <div className={s.container}>
                <img className={s.image} src={image} alt="perro"  />
                    <Link to={`/detail/${id}`} className={s.link}>
                        <h2 className={s.name}>{name}</h2>
                    </Link>
                    <p className={s.temperamento}>Temperamento: {temperament}</p>
                    <p className={s.altura}>Altura: {height} cm</p>
                    <p className={s.peso}>Peso: {weight} kgs</p>
        // </div>
    )
}

export default Card;