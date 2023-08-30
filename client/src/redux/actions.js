import axios from 'axios';

const url = 'http://localhost:3001/'

// Mostrar todos los perros

// Bien
export const GET_DOGS = 'GET_DOGS'

export const getDogs = () => {
    return async (dispatch) => {
        try {
            const allDogs = (await axios.get(`${url}dogs`)).data;
            // console.log('soy action todos dog', allDogs);

            return dispatch({
                type: GET_DOGS,
                payload: allDogs
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}


// Bscar por nombre

// Bien

export const GET_DOGS_NAME = 'GET_DOGS_NAME'


export const getDogsName = (name) => {
    return async (dispatch) => {
        try {
            const dogName = (await axios.get(`${url}dogs/name?name=${name}`)).data;
            // console.log('soy action name dog', dogName);
            return dispatch({
                type: GET_DOGS_NAME,
                payload: dogName
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

// Buscar por temperamentos

export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'

export const getDogsTemp = () => {
    return async (dispatch) => {
        try {
            const allTemp = (await axios.get(`${url}temperaments`)).data;
            const filteredTemperaments = allTemp.filter((temp) => {
                return temp.name.toLowerCase().includes(name.toLowerCase());
            });
            // console.log('soy action temp', allTemp);
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: filteredTemperaments
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

// Filtrar por temperamentos

export const FILTER_TEMPERAMENTS_BY_NAME = 'FILTER_TEMPERAMENTS_BY_NAME'

export const filterByTemperamentsName = (name) => {
    return async (dispatch) => {
        try {
            const dogTempName = (await (axios.get(`${url}dogs/temp/name?name=${name}`))).data
            // console.log('dogtempName action', dogTempName);

            return dispatch({
                type: FILTER_TEMPERAMENTS_BY_NAME,
                payload: dogTempName
            })
        } catch (error) {
            console.log(error.message, `${name} error`);
        }
    }
}

// export const FILTER_TEMPERAMENTS_BY_NAME = 'FILTER_TEMPERAMENTS_BY_NAME';

// export const filterByTemperamentsName = (name) => {
//     return async (dispatch) => {
//         try {
//             const dogTempName = (await axios.get(`${url}dogs/temp/${name}`)).data;
//             console.log('dogtemp', dogTempName);

//             return dispatch({
//                 type: FILTER_TEMPERAMENTS_BY_NAME,
//                 payload: dogTempName,
//             });
//         } catch (error) {
//             console.log(error.message, `${name} soy action filter temp by name`);
//         }
//     };
// };


// export const FILTER_TEMPERAMENTS_BY_NAME = 'FILTER_TEMPERAMENTS_BY_NAME'

// export const filterByTemperaments = (payload) => {
//     return {
//         type: FILTER_TEMPERAMENTS_BY_NAME,
//         payload
//     }
// }

// export const getDogs = () => {
//     // return async function (dispatch) {
//     return async (dispatch) => {
//         try {
//             const allDogs = (await axios.get(`${url}dogs`)).data;
//             // const allDogs = apiData.data;
//             return dispatch({
//                 type: GET_DOGS,
//                 payload: allDogs
//             })
//         } catch (error) {
//             console.log(error.message);
//         }
//     }
// }

// filtrar por created 'Api o Bdd'

export const FILTER_CREATED_FALSE = 'FILTER_CREATED_FALSE'

export const filterByCreatedFalse = () => {
    return async (dispatch) => {
        try {
            const createdDogs = (await axios.get(`${url}dogs/api`)).data;
            return dispatch({
                type: FILTER_CREATED_FALSE,
                payload: createdDogs
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const FILTER_CREATED_TRUE = 'FILTER_CREATED_TRUE'

export const filterByCreatedTrue = () => {
    return async (dispatch) => {
        try {
            const createdDogs = (await axios.get(`${url}dogs/db`)).data;
            return dispatch({
                type: FILTER_CREATED_TRUE,
                payload: createdDogs
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

// export const filterByCreated = (payload) => {
//     return {
//         type: FILTER_CREATED,
//         payload
//     }
// }

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
        try {
            const detail = await axios.get(`${url}dogs/${id}`);
            // const detail = dogsDetail.data;
            console.log(detail.data);
            return dispatch({ type: GET_DETAILS, payload: detail.data })

        } catch (error) {
            console.log(error.message)
        }
    }
}

export const POST_DOGS = 'POST_DOGS'

export function postDog(payload) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${url}dogs/create`, payload);

            return dispatch({ type: POST_DOGS, payload: response.data });
        } catch (error) {
            console.log(error.message)
        }
    }
}


