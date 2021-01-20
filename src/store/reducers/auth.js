import * as actionTypes from '../actions/action-types'

const initialState ={
    token: null,
    userId:null,
    loading: false,
    error: null
}

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_START: return { ...state,loading:true,error:null}
        case actionTypes.AUTH_SUCCESS: return {...state,loading:false,error:null,token:action.idToken,userId:action.userId}
        case actionTypes.AUTH_FAIL: return {...state,loading:false,error:action.error}
        case actionTypes.AUTH_LOGOUT: return {...state,loading:false,token:null,userId:null}
        default: return state
    }

}
export default reducer

