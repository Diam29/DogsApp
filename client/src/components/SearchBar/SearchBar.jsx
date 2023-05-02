import { useState } from "react";
import {getDogsName} from '../../redux/actions';
import { useDispatch} from "react-redux";
import s from './SearchBar.module.css'

const SearchBar = ()=>{
    
    const dispatch = useDispatch();
    
    const [dogName, setDogName] = useState('');
    
    const handleClick = (event)=>{
        event.preventDefault();
        dispatch(getDogsName(dogName));
        setDogName('');
    }


    const handleSubmit = (event)=>{
        event.preventDefault();
        setDogName(event.target.value)
    }

    return(
        
        <div className={s.container}>
            <input className={s.input}
            type="search" 
            placeholder='Ingresa una raza' 
            value={dogName} 
            onChange={handleSubmit}
            />
            <button className={s.buttonS} type='submit' onClick={handleClick}>Buscar</button>
        </div>
        
    )
}

export default SearchBar;