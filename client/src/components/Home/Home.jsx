import { Link } from "react-router-dom";
import s from './Home.module.css';
import Cards from "../Cards/Cards.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, orderByName, orderByWeight, getDogsTemp, filterByTemperamentsName, filterByCreatedFalse, filterByCreatedTrue, filterCreated } from "../../redux/actions";


const Home = () => {

    const dispatch = useDispatch();

    const allDogs = useSelector(state => state.allDogs)

    const dogs = useSelector(state => state.dogs)

    const dogCreatedFalse = useSelector(state => state.createdDogs)

    const dogTemp = useSelector(state => state.dogTemp)


    const [filter, setFilter] = useState('all');

    const [page, setPage] = useState(1)

    const [perPage, setPerPage] = useState(8)

    const handlerOrder = (event) => {
        event.preventDefault();
        setPage(1)
        dispatch(orderByName(event.target.value))
    }

    const handlerOrderWeight = (event) => {
        event.preventDefault();
        setPage(1)
        dispatch(orderByWeight(event.target.value))
    }

    const handlerTemp = (event) => {
        event.preventDefault();
        setPage(1)
        dispatch(filterByTemperamentsName(event.target.value))
    }
    // const handlerCreatedFalse = (event) => {
    //     const value = event.target.value;
    //     setPage(1);
    //     if (value === "bdd") {
    //       dispatch(filterByCreatedTrue());
    //     } else if (value === "api") {
    //       dispatch(filterByCreatedFalse());
    //     }
    //   };


    const handleResetFilter = () => {
        setPage(1);
        dispatch(filterByCreatedFalse()); // Restablecer filtro a 'api' (perros de la API)
    };

    let filteredDogs = allDogs;
    if (filter === 'db') {
        filteredDogs = dogCreatedFalse;
    } else if (filter === 'api') {
        filteredDogs = allDogs.filter(dog => dog.created);
    }



    const handlerCreated = (event) => {
        const value = event.target.value
        setPage(1)
        setFilter(value);

        if (value === 'db') {
            dispatch(filterByCreatedTrue())
        } else if (value === 'api') {
            dispatch(filterByCreatedFalse())
        }
    }



    const handlerClick = (event) => {
        event.preventDefault();
        dispatch(getDogs())
    }

    const totalPages = Math.ceil(allDogs.length / perPage);
    const disableNext = (page === totalPages);
    const disablePrev = (page === 1 || allDogs.length === 0);

    const getPaginatedData = (data) => {
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        return data.slice(startIndex, endIndex);
    }


    const handleNextPage = () => {
        setPage(page + 1);
    }

    const handlePrevPage = () => {
        setPage(page - 1);
    }


    useEffect(() => {
        dispatch(getDogs())
        dispatch(getDogsTemp())
    }, [dispatch])

    return (
        <div className={s.mainContain}>
            <div className={s.container}>
                <div className={s.buttonContainer}>
                    <Link to='/'>
                        <button className={s.buttons}>Volver</button>
                    </Link>
                    <button className={s.buttons} onClick={(event) => handlerClick(event)}>Recargar Perros</button>
                </div>
                <div className={s.selectsContainer}>
                    <select className={s.select} onChange={(event) => handlerOrder(event)} >
                        <option className={s.option} value="asc">Raza Asc.</option>
                        <option className={s.option} value="desc">Raza Desc.</option>
                    </select>

                    <select className={s.select} onChange={(event) => handlerOrderWeight(event)}>
                        <option className={s.option} value="menor">Pequeños</option>
                        <option className={s.option} value="mayor">Grandes</option>
                    </select>

                    <select className={s.select} onChange={(event) => handlerTemp(event)}>
                        <option className={s.option} value="all">Filtrar por Temperamento</option>
                        {dogTemp.map((element) => (
                            <option className={s.option} value={element.name} key={element.id}>
                                {element.name}</option>
                        ))}
                    </select>

                    <select className={s.select} onChange={handlerCreated} >
                        <option className={s.option} value="all" onClick={handleResetFilter}>Todos</option>
                        <option className={s.option} value="db">Perros en Bdd</option>
                        <option className={s.option} value="api">Perros en Api</option>
                    </select>

                </div>
                <div className={s.cardsContainer}>
                    <Cards className={s.cards} allDogs={getPaginatedData(allDogs)} />
                </div>
                <div className={s.pagination}>
                    <button className={s.button} disabled={disablePrev} onClick={handlePrevPage}>Anterior</button>
                    <button className={s.button} disabled={disableNext} onClick={handleNextPage}>Siguiente</button>
                </div>
            </div>
        </div>
    )
}


export default Home;