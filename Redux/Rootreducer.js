
const initState = {
    songs: [],
    isloading: false,
    error: null
}

const RootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOAD_QUOTE_START':
            return { ...state, isloading: true }

        case 'LOAD_QUOTE_SUCCESS':
            return { ...state, songs: action.payload, isloading: false }

        case 'LOAD_QUOTE_FAILURE':
            return { ...state, error: action.payload, isloading: false }
        
        default: return state
    }
}
export default RootReducer
