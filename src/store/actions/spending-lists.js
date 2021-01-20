import * as actionTypes from './action-types'
// import axios from '../../axios-transactions'

export const addTransactionStart=() =>{return{type:actionTypes.ADD_START}}
export const addTransactionFailed =(error) =>{return{type:actionTypes.ADD_FAILED,error:error}}
export const addTransactionSuccess =(id,data) =>{return{type:actionTypes.ADD_SUCCESSFUL,transactionId: id,transactionData: data }
}
// export const addTransaction = (transactionInfo,token) =>{
//     return dispatch => {
//         dispatch(addTransactionStart())
//         axios.post('/transactions.json?auth=' +token, transactionInfo)
//         .then(res =>{dispatch(addTransactionSuccess(res.data.name,transactionInfo))})
//         .catch(err=>{dispatch(addTransactionFailed(err))})
//     }
// }

export const addTransaction = (transactionInfo,token) =>{
    return dispatch => {
        dispatch(addTransactionStart())
        fetch('http://localhost:8080/budget-manager/transaction', 
        // fetch('https://budget-manager-app-backend.herokuapp.com/budget-manager/transaction', 
            {method: 'POST',body:JSON.stringify(transactionInfo), headers: {Authorization: 'Bearer ' + token,'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {throw new Error('Creating the transaction failed!');}
            return res.json();
            })
        .then(res =>{dispatch(addTransactionSuccess(res.transaction._id,transactionInfo))})
        .catch(err=>{dispatch(addTransactionFailed(err))})
    }
}

export const deleteTransactionStart=() =>{return{type:actionTypes.DELETE_START}}
export const deleteTransactionFailed =(error) =>{return{type:actionTypes.DELETE_FAILED,error:error}}
export const deleteTransactionSuccess =(id) =>{return{type:actionTypes.DELETE_SUCCESSFUL,transactionId: id }
}
// export const deleteTransaction = (transactionId,token) =>{
//     return dispatch => {
//         dispatch(deleteTransactionStart())
//         axios.delete('/transactions/'+transactionId+'.json?auth='+token)
//         .then(res =>{dispatch(deleteTransactionSuccess(transactionId))})
//         .catch(err=>{dispatch(deleteTransactionFailed(err))})
//     }
// }
export const deleteTransaction = (transactionId,token) =>{
    return dispatch => {
        dispatch(deleteTransactionStart())
        
        fetch(`http://localhost:8080/budget-manager/transaction/${transactionId}`, {
        // fetch(`https://budget-manager-app-backend.herokuapp.com/budget-manager/transaction/${transactionId}`, {
            method: 'DELETE',headers: {Authorization: 'Bearer ' + token}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('Deleting a post failed!');}
        return res.json();
        })
        .then(res =>{dispatch(deleteTransactionSuccess(transactionId))})
        .catch(err=>{dispatch(deleteTransactionFailed(err))})
    }
}

export const fetchTransactionsSuccess = (transactions) =>{return{type: actionTypes.FETCH_TRANSACTIONS_SUCCESS,transactions: transactions }}
export const fetchTransactionsFail = (error) => {return{type: actionTypes.FETCH_TRANSACTIONS_FAILED,error: error}}
export const fetchTransactionsStart =() => {return{type: actionTypes.FETCH_TRANSACTIONS_START}}

// export const fetchTransactions = (token,userId) =>{
//     return dispatch => {
//         dispatch(fetchTransactionsStart())
//         axios.get('/transactions.json?auth='+ token + '&orderBy="userId"&equalTo="' + userId + '"')
//         .then(res=>{
//             const fetchedData=[]
//             for(let key in res.data){fetchedData.push({...res.data[key],id:key})}
//             dispatch(fetchTransactionsSuccess(fetchedData))
//         }).catch(err=>dispatch(fetchTransactionsFail(err)))
//     }
// }

export const fetchTransactions = (token,userId) =>{
    return dispatch => {
        dispatch(fetchTransactionsStart())
        
        // const toDate = new Date().toLocaleDateString()
        // let fromDate = new Date()
        // fromDate.setMonth(fromDate.getMonth() - 3);
        // fromDate.setDate(1);
        // fromDate.toLocaleDateString()
        const toDate = (new Date().getFullYear()+'-'+('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+new Date().getDate()).slice(-2)).toString()
        const fromDate = (
            (new Date().getMonth() !== 0?new Date().getFullYear():new Date().getFullYear()-1)+'-'
            +('0'+(new Date().getMonth()!==0? new Date().getMonth():12)).slice(-2)+'-01'
            ).toString()
            
        fetch(`http://localhost:8080/budget-manager/transactions/${userId}?fromDate=${fromDate}&toDate=${toDate}`
        // fetch(`https://budget-manager-app-backend.herokuapp.com/budget-manager/transactions/${userId}?fromDate=${fromDate}&toDate=${toDate}`
            ,{method: 'GET',headers: {Authorization: 'Bearer ' + token}})
            .then(res => {
                if (res.status !== 200) {throw new Error('Failed to fetch transactions.')}
                return res.json();
            })
        .then(res=>{dispatch(fetchTransactionsSuccess(res.transactions))})
        .catch(err=>dispatch(fetchTransactionsFail(err)))
    }
}


export const editTransactionStart=() =>{return{type:actionTypes.EDIT_START}}
export const editTransactionFailed =(error) =>{return{type:actionTypes.EDIT_FAILED,error:error}}
export const editTransactionSuccess =(id,data) =>{return{type:actionTypes.EDIT_SUCCESSFUL,transactionId: id,transactionData: data }
}
// export const editTransaction = (transactionInfo,token) =>{
//     return dispatch => {
//         dispatch(editTransactionStart())
//         axios.post('/transactions.json?auth=' +token, transactionInfo)
//         .then(res =>{dispatch(editTransactionSuccess(res.data.name,transactionInfo))})
//         .catch(err=>{dispatch(editTransactionFailed(err))})
//     }
// }

export const editTransaction = (transactionInfo,token) =>{
    return dispatch => {
        dispatch(editTransactionStart())
        fetch('http://localhost:8080/budget-manager/transaction', 
        // fetch('https://budget-manager-app-backend.herokuapp.com/budget-manager/transaction',
            {method: 'PUT',body:JSON.stringify(transactionInfo), headers: {Authorization: 'Bearer ' + token,'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {throw new Error('Editing failed!');}
            return res.json();
            })
        .then(res =>{dispatch(editTransactionSuccess(res.transaction._id,transactionInfo))})
        .catch(err=>{dispatch(editTransactionFailed(err))})
    }
}