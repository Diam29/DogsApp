import { Link } from "react-router-dom"
import s from './NavBar.module.css'
import SearchBar from "../SearchBar/SearchBar"




const NavBar = ()=>{  

    return(


        <div className={s.container}>
            <Link className={s.links} to='/create'>CREATE</Link>
        <div className={s.searchBar}>
            <SearchBar />
        </div>
        </div>
    )
}




export default  NavBar;