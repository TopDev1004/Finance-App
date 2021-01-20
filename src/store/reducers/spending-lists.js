import * as actionTypes from '../actions/action-types'


const initialState ={
    transactionsList: {
        currentMonth:[],
        lastMonth:[],
        all:[]
    },
    loading: false,
    error:null,
    errorMessage:'',
    successMessage:'',
    editSuccessMessage:'',
    totalSpending:0
}

const reducer = (state=initialState,action) => {
    const currentMonthTransactions=(item)=>{
        return (item.date.split('-')[1] === ('0'+(new Date().getMonth()+1)).slice(-2) && item.date.split("-")[0] === new Date().getFullYear().toString())}
    const lastMonthTransactions=(item)=>{
        return (item.date.split("-")[1] === ('0'+(new Date().getMonth()!==0? new Date().getMonth():12)).slice(-2) && item.date.split("-")[0] === new Date().getFullYear().toString())}
    
    switch(action.type){
        case actionTypes.ADD_START: return { ...state,loading:true,error:null,errorMessage:'',successMessage:''}
        case actionTypes.ADD_FAILED: return {...state,loading:false,error:action.error,errorMessage:'Failed, please try again',successMessage:''}
        case actionTypes.ADD_SUCCESSFUL:return{...state,loading:false,errorMessage:'',successMessage:'Successful',
            transactionsList:{ 
                currentMonth:[{...action.transactionData, _id: action.transactionId}].filter(currentMonthTransactions).concat(state.transactionsList.currentMonth),
                lastMonth: [{...action.transactionData, _id: action.transactionId}].filter(lastMonthTransactions).concat(state.transactionsList.lastMonth),
                all: [{...action.transactionData, _id: action.transactionId}].concat(state.transactionsList.all)
            }
        }
        
        case actionTypes.EDIT_START: return { ...state,loading:true,error:null,errorMessage:'',editSuccessMessage:''}
        case actionTypes.EDIT_FAILED: return {...state,loading:false,error:action.error,errorMessage:'Failed, please try again',editSuccessMessage:''}
        case actionTypes.EDIT_SUCCESSFUL:return{...state,loading:false,errorMessage:'',editSuccessMessage:'Saved edits successfully',
            ...state.transactionsList.all.splice(state.transactionsList.all.findIndex(transaction => transaction._id === action.transactionId),1),
            ...state.transactionsList.currentMonth.splice(state.transactionsList.currentMonth.findIndex(transaction => transaction._id === action.transactionId),1),
            ...state.transactionsList.lastMonth.splice(state.transactionsList.lastMonth.findIndex(transaction => transaction._id === action.transactionId),1),
            transactionsList:{ 
                currentMonth:[{...action.transactionData, _id: action.transactionId}].filter(currentMonthTransactions).concat(state.transactionsList.currentMonth),
                lastMonth: [{...action.transactionData, _id: action.transactionId}].filter(lastMonthTransactions).concat(state.transactionsList.lastMonth),
                all: [{...action.transactionData, _id: action.transactionId}].concat(state.transactionsList.all)
            }
        }
        
        case actionTypes.DELETE_START: return { ...state,loading:true,error:null}
        case actionTypes.DELETE_FAILED: return {...state,loading:false,error:action.error}
        case actionTypes.DELETE_SUCCESSFUL:return{...state,loading:false,
            ...state.transactionsList.all.splice(state.transactionsList.all.findIndex(transaction => transaction._id === action.transactionId),1),
            ...state.transactionsList.currentMonth.splice(state.transactionsList.currentMonth.findIndex(transaction => transaction._id === action.transactionId),1),
            ...state.transactionsList.lastMonth.splice(state.transactionsList.lastMonth.findIndex(transaction => transaction._id === action.transactionId),1)
        }
        
        
        case actionTypes.FETCH_TRANSACTIONS_START:return{...state,loading: true}
        case actionTypes.FETCH_TRANSACTIONS_SUCCESS:return{...state,transactionsList:{currentMonth:action.transactions.filter(currentMonthTransactions),lastMonth:action.transactions.filter(lastMonthTransactions),all:action.transactions}, loading: false}
        case actionTypes.FETCH_TRANSACTIONS_FAILED:return{...state,loading: false}
        
        default: return state
    }
}

export default reducer