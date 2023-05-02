import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import s from './Detail.module.css'

const Detail = ()=>{

    const {id} = useParams()
    console.log(id);
    const dispatch = useDispatch()

    const dogsDetail = useSelector(state=> state.detail)


    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch, id])



    return (
        <div>
        {dogsDetail[0] ? 
            <>
            <div className={s.detailContainer}>
                <h1 className={s.name}>Nombre: {dogsDetail[0].name}</h1>
                </div>
                <div>
                    <h2 className={s.atributos}>Temperamento: {dogsDetail[0].temperament}</h2>
                </div>
                <div>
                    <img className={s.imagen} src={dogsDetail[0].image} alt="Imagen"/>
                </div>
                <div>
                    <h5 className={s.atributos}>Pesos: {dogsDetail[0].weight} kgs</h5>
                </div>
                <div>
                    <h5 className={s.atributos}>Alturas: {dogsDetail[0].height} cm</h5>
                </div>
                <div>
                    <h5 className={s.atributos}>Eperanza de vida: {dogsDetail[0].life_span}</h5>
                </div>
                <Link to='/home' className={s.link}>
                <button type="text">Go Back Home</button>
                </Link>
            </>   
            : 'poner foto'    
        } 
        </div>
    )
}

export default Detail;