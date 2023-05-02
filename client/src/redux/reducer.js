import { GET_DETAILS, GET_DOGS, GET_DOGS_NAME, ORDER_BY_NAME, ORDER_BY_WEIGHT, FILTER_TEMPERAMENTS, GET_TEMPERAMENTS, FILTER_CREATED } from './actions'



const initialState = {
    dogs: [], // ya lo use
    allDogs: [], // ya lo use
    dogName: [], // ya lo use
    dogTemp: [], // ya lo use
    detail: [], // ya lo use
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
            return { ...state, dogs: action.payload, allDogs: action.payload };

        case GET_DOGS_NAME:
            return { ...state, allDogs: action.payload, dogName: action.payload };
        case GET_DETAILS:
            return { ...state, detail: action.payload };
        case ORDER_BY_NAME:
            const sortedAllDogs = state.allDogs.slice().sort((a, b) =>
                action.payload === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name)
            );
            return {
                ...state,
                allDogs: sortedAllDogs,
            };
        case ORDER_BY_WEIGHT:
            let sortedWei = action.payload === 'menor'
                ? state.allDogs.slice().sort((a, b) => {
                    const weiA = parseFloat(a.weight.split('-')[0])
                    const weiB = parseFloat(b.weight.split('-')[0])
                    return weiA - weiB
                })
                : state.allDogs.slice().sort((a, b) => {
                    const weiA = parseFloat(a.weight.split('-')[0])
                    const weiB = parseFloat(b.weight.split('-')[0])
                    return weiB - weiA
                })
            return {
                ...state,
                allDogs: sortedWei
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                dogTemp: action.payload
            }
        case FILTER_TEMPERAMENTS:
            const allDogs = state.allDogs
            const filterTemp = action.payload === 'all'
                ? allDogs
                : allDogs.filter((dog) =>
                    dog.temperament && dog.temperament.split(',').find(ele => ele === action.payload))
            return {
                ...state,
                allDogs: filterTemp
            }
        case FILTER_CREATED:
            const allDogsCreated = state.allDogs
            const filterDogCreated = action.payload === 'api'
                ? allDogsCreated.filter(dog => dog.created === false)
                : allDogsCreated.filter(dog => dog.created === true)
            console.log(filterDogCreated);
            return {
                ...state,
                allDogs: filterDogCreated
            }
        default:
            return { ...state }
    }
}
export default reducer;