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
        </div>
//         <div className="col-8">
//             <div className="card">
//                 <div className="card-header p-3">
//                     <img src={image} className="card-img-top" alt="perro" />
//             <div className="card-body">
//                 <h5 className="card-title">{name}</h5>
//                 <p className="card-text">Temperamento: {temperament}</p>
//                 <p className="card-text">Altura: {height}</p>
//                 <p className="card-text">Peso: {weight}</p>
//       </div>
//     </div>
//   </div>
//   </div>
    )
}

export default Card;