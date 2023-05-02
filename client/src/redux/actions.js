import axios from 'axios';

const url = 'http://localhost:3001/'

// Mostrar todos los perros


export const GET_DOGS = 'GET_DOGS'

export const getDogs = () => {
    return async function (dispatch) {
        const apiData = await axios.get(`${url}dogs`)
        const allDogs = apiData.data;
        dispatch({ type: GET_DOGS, payload: allDogs })
    }
}


// Bscar por nombre

export const GET_DOGS_NAME = 'GET_DOGS_NAME'

export const getDogsName = (name) => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`${url}dogs?name=${name}`)
            const dogName = apiData.data;
            return dispatch({ type: GET_DOGS_NAME, payload: dogName })
        } catch (error) {
            console.log(error.message);
            alert('No existe perro con esa Raza');
        }
    }
}

// Buscar por temperamentos

export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'

export const getDogsTemp = () => {
    return async function (dispatch) {
        const allData = await axios.get(`${url}temperaments`)
        const dogTemp = allData.data;
        dispatch({ type: GET_TEMPERAMENTS, payload: dogTemp })
    }
}

// Filtrar por temperamentos

export const FILTER_TEMPERAMENTS = 'FILTER_TEMPERAMENTS'

export const filterByTemperaments = (payload) => {
    return {
        type: FILTER_TEMPERAMENTS,
        payload
    }
}

// filtrar por created 'Api o Bdd'

export const FILTER_CREATED = 'FILTER_CREATED'

export const filterByCreated = (payload) => {
    return {
        type: FILTER_CREATED,
        payload
    }
}

// Ordenar por Razas name 

export const ORDER_BY_NAME = 'ORDER_BY_NAME'

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}


// Ordenar por peso

export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT'

export const orderByWeight = (payload) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}


// DETAIL

export const GET_DETAILS = 'GET_DETAILS'

export function getDetail(id) {
    return async function (dispatch) {
        // try {
        const detail = await axios.get(`${url}dogs/${id}`);
        // const detail = dogsDetail.data;
        console.log(detail.data);
        return dispatch({ type: GET_DETAILS, payload: detail.data })

        // } catch (error) {
        //     console.log(error)
        // }
    }
}




