
import Axios from 'axios'
import constant from '../constant/constant'

export const loadSongs = (category) => {
    console.log(category)
    return (dispatch, getState) => {
        dispatch({ type: 'LOAD_QUOTE_START' })
        Axios.get((category==='Free')?constant.url+'/audio/all/'+category:constant.url+'/audio/all/').then(res => {
            dispatch({ type: 'LOAD_QUOTE_SUCCESS', payload: res.data })
        }).catch(err => {
            dispatch({ type: 'LOAD_QUOTE_FAILURE', payload: err })
        })
    }
}

