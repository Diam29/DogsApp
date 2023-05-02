import { Link } from "react-router-dom"
import s from './Landing.module.css'

const Landing = ()=>{
    return ( 
        <div className={s.mainContain}>
        <div className={s.container}>
            <h1 className={s.tittle}>DOGS</h1>
            <Link to='/home'>
            <button className={s.button}>INGRESAR</button>
            </Link>
        </div>
        </div>
    )
}
                        
            
            
                
            

export default Landing;