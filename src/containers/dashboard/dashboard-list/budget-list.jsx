import React from 'react'
import './budget-list.scss'
import InputUnit from '../../../components/input-unit/input-unit'
import Modal from '../../../components/modal/modal'
import BudgetListItem from './budget-list-item/budget-list-item'
import * as actions from '../../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../../components/spinner/spinner'

class BudgetList extends React.Component{
    state={
        sortType:'Newest',
        searchFor:null,
        showMonth:'Current Month',
        infoModalOpen:false,
        modalTransactionInfo: null,
        editingInfo:{_id:'',userId:'',amount:'',title:'',date:'',type:'spending',person:'',category:'-select-',note:'not defined'},
        editModalOpen:false,
        editValidationMessage:null,
        deleteModalOpen:false,
        deleteTransactionId:null
    }

    initialModalEdit={amount:'',title:'',date:'',type:'spending',person:'',category:'-select-',note:'not defined'}
    sortHandler(){
        if(this.state.sortType ==='High to low'){return (a, b) => {return b.amount - a.amount}}
        if(this.state.sortType ==="Low to high"){return (a, b) => {return a.amount - b.amount}}
        if(this.state.sortType ==='Newest'){return((a, b) => {const dateA = new Date(a.date); const dateB = new Date(b.date); return dateB - dateA;})}     
        if(this.state.sortType ==="Oldest"){return((a, b) => {const dateA = new Date(a.date);const dateB = new Date(b.date);return dateA - dateB;})}
    }

    searchHandler = item => {
        if(!this.state.searchFor){return item}
        else{
            return(
                item.title.toLowerCase().includes(this.state.searchFor.trim().toLowerCase())
                || item.amount.toLowerCase().includes(this.state.searchFor.trim().toLowerCase())
                || item.date.toLowerCase().includes(this.state.searchFor.trim().toLowerCase())
                || item.person.toLowerCase().includes(this.state.searchFor.trim().toLowerCase())
                || item.type.toLowerCase().includes(this.state.searchFor.trim().toLowerCase())
                || item.category.toLowerCase().includes(this.state.searchFor.trim().toLowerCase())
                || item.note.toLowerCase().includes(this.state.searchFor.trim().toLowerCase())
            )} 
    }

    onEditHandler(transactionId){
        const transaction = this.props.transactionsList.all.find(item=>item._id === transactionId)
        this.setState({editingInfo:transaction,editModalOpen:true})
       
    }

    infoHandler(transactionId){
        const transaction = this.props.transactionsList.all.find(item=>item._id === transactionId)
        this.setState({modalTransactionInfo:transaction,infoModalOpen:true})
    }

    saveEditHandler(event){
        event.preventDefault()
        let editValidationMessage = null
        if(!this.props.userId){
            editValidationMessage= 'not authenticated'
            this.setState({editValidationMessage:editValidationMessage})
        } if(this.state.editingInfo.amount.trim() === '' || this.state.editingInfo.title.trim() === '' || this.state.editingInfo.date.trim() === '' || this.state.editingInfo.person.trim() === '' || this.state.editingInfo.category.trim() === '-select-'){
            editValidationMessage= 'please enter valid inputs'
            this.setState({editValidationMessage:editValidationMessage})
        } else {this.props.onEditSaveClicked({...this.state.editingInfo},this.props.token); 
            editValidationMessage= null
            this.setState({editingInfo:this.initialModalEdit,editValidationMessage:editValidationMessage})
        }
    }

    deleteHandler(){
        this.props.onDeleteHandler(this.state.deleteTransactionId,this.props.token)
        this.setState({deleteModalOpen:false,deleteTransactionId:null})
    }

    render(){
        const currentDate=(new Date().getFullYear()+'-'+('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+new Date().getDate()).slice(-2)).toString()
        
        let list = 'No transaction found!'
        if(this.state.showMonth === 'Current Month'){
            list = 
            this.props.currentMonthTransactions.length>=1?this.props.currentMonthTransactions.filter(this.searchHandler).sort(this.sortHandler().bind(this)).map(transaction=>{
                return(<BudgetListItem 
                    key={transaction._id} 
                    date={transaction.date} 
                    amount={transaction.amount} 
                    title={transaction.title} 
                    person={transaction.person}
                    onDeleteClicked={()=>this.setState({deleteModalOpen:true,deleteTransactionId:transaction._id})}
                    onInfoClicked={()=>this.infoHandler(transaction._id)}
                    onEditClicked={()=>this.onEditHandler(transaction._id)}/>)
            }):<h3 style={{paddingLeft:'3rem'}}>No transaction found!</h3>
        }
        if (this.state.showMonth === 'Last Month'){
            list = 
            this.props.transactionsList.lastMonth.length>=1?this.props.transactionsList.lastMonth.filter(this.searchHandler).sort(this.sortHandler().bind(this)).map(transaction=>{
                return(<BudgetListItem 
                    key={transaction._id} 
                    date={transaction.date} 
                    amount={transaction.amount} 
                    title={transaction.title} 
                    person={transaction.person}
                    onDeleteClicked={()=>this.setState({deleteModalOpen:true,deleteTransactionId:transaction._id})}
                    onInfoClicked={()=>this.infoHandler(transaction._id)}
                    onEditClicked={()=>this.onEditHandler(transaction._id)}/>)
            }):<h3 style={{paddingLeft:'3rem'}}>No transaction found!</h3>
        } 
        if (this.state.showMonth !== 'Last Month' && this.state.showMonth !=='Current Month') { list = 
            this.props.transactionsList.all.length>=1?this.props.transactionsList.all.filter(this.searchHandler).sort(this.sortHandler().bind(this)).map(transaction=>{
                return(<BudgetListItem 
                    key={transaction._id} 
                    date={transaction.date} 
                    amount={transaction.amount} 
                    title={transaction.title} 
                    person={transaction.person}
                    onDeleteClicked={()=>this.setState({deleteModalOpen:true,deleteTransactionId:transaction._id})}
                    onInfoClicked={()=>this.infoHandler(transaction._id)}
                    onEditClicked={()=>this.onEditHandler(transaction._id)}/>)
            }):<h3 style={{paddingLeft:'3rem'}}>No transaction found!</h3> }
        return(
            <div className='budget-list-section'>
                <div className='budget-list-top'>
                    <InputUnit style={{fontSize:'1.4rem'}} inputtype='select' id="budget-list-sorting" name="SortBy" labelname='Sort by' options='Newest,Oldest,High to low,Low to high' onChange={event=>this.setState({sortType:event.target.value})}/>
                    <InputUnit style={{fontSize:'1.4rem'}} inputtype='select' id="budget-list-month" name="showMonth" labelname='Date' options='Current Month,Last Month,Last 3 Months,Last 6 Months,2020' onChange={event=>this.setState({showMonth:event.target.value})} />
                    <InputUnit style={{fontSize:'1.4rem'}} inputtype='input' type="search" id="budget-list-search" placeholder='i.e grocery' labelname='Search' onChange={event=>this.setState({searchFor:event.target.value})}/>
                </div>
                <div className='budget-list-body'>
                    <div className='budget-list-item'>
                        <div className='budget-list-item-date'>Date</div>
                        <div className='budget-list-item-amount'>Amount</div>
                        <div className='budget-list-item-title'>Title</div>
                        <div className='budget-list-item-by'>Added by</div>
                        <div className='budget-list-item-edit'>Edit</div>
                    </div>
                    {list}
                </div>
                {this.state.deleteModalOpen && this.state.deleteTransactionId?
                <Modal modalStyle={!this.state.deleteModalOpen?{display:'none'}:{display:'block',width:'max-content'}} closeBtnClick={()=>this.setState({deleteModalOpen:false,deleteTransactionId:null})} overlayClick={()=>this.setState({deleteModalOpen:false,deleteTransactionId:null})} overLayStyle={!this.state.deleteModalOpen?{display:'none'}:{display:'block'}}>
                    {this.props.loading? <Spinner/>:
                    <div className='modal-success-view'>
                        <h1>Are you sure you want to delete this transaction?</h1>
                        <div className='budget-input-btn'>
                            <button className='btn btn-four' onClick={()=>this.deleteHandler()}>Yes</button>
                            <button className='btn btn-primary' onClick={()=>this.setState({deleteModalOpen:false,deleteTransactionId:null})}>Cancel</button>
                        </div>    
                    </div>}
                </Modal>
                :null}
                {this.state.modalTransactionInfo?
                <Modal modalStyle={!this.state.infoModalOpen?{display:'none'}:{display:'block',width:'max-content'}} closeBtnClick={()=>this.setState({infoModalOpen:false,modalTransactionInfo:null})} overlayClick={()=>this.setState({infoModalOpen:false,modalTransactionInfo:null})} overLayStyle={!this.state.infoModalOpen?{display:'none'}:{display:'block'}}>
                    <div className='modal-info'>
                        <h4>Title: <span>{this.state.modalTransactionInfo.title}</span></h4>
                        <h4>Amount: <span>{this.state.modalTransactionInfo.amount}</span></h4>
                        <h4>By: <span>{this.state.modalTransactionInfo.person}</span></h4>
                        <h4>Date: <span>{this.state.modalTransactionInfo.date}</span></h4>
                        <h4>Category: <span>{this.state.modalTransactionInfo.category}</span></h4>
                        <h4>Type: <span>{this.state.modalTransactionInfo.type}</span></h4>
                        <h4>Note: <span>{this.state.modalTransactionInfo.note}</span></h4>
                    </div>
                </Modal>
                :null}
                {this.state.editModalOpen?
                <Modal modalStyle={!this.state.editModalOpen?{display:'none'}:{display:'block',width:'max-content'}} closeBtnClick={()=>this.setState({editModalOpen:false,editingInfo:this.initialModalEdit,editValidationMessage:''})} overlayClick={()=>this.setState({editModalOpen:false,editingInfo:this.initialModalEdit,editValidationMessage:''})} overLayStyle={!this.state.editModalOpen?{display:'none'}:{display:'block'}}>
                    {this.props.loading? <Spinner/>:
                        this.props.successMessage === 'Saved edits successfully' && this.state.editValidationMessage===null?
                        <div className='modal-success-view'>
                            <h1>Saved Changes Successfully!</h1>
                            <div className='budget-input-btn'>
                                <button className='btn btn-four' onClick={()=>this.setState({editModalOpen:false,editingInfo:this.initialModalEdit,editValidationMessage:''})}>Close</button>
                            </div>    
                        </div>
                        :<div className='budget-add-section ' style={{padding:'3rem'}}>
                            <div>
                                <h2>Edit your transaction here</h2>
                                <h3>{this.state.editValidationMessage}</h3>
                                <h3>{this.state.editValidationMessage===null?this.props.errorMessage:null}</h3>
                                <h4>{this.state.editValidationMessage===null?this.props.successMessage:null}</h4>
                            </div>
                            <form className='budget-add-body'>
                                <InputUnit inputtype='input' id='edit-spending-amount-input' placeholder='i.e 100' type="number" defaultValue={this.state.editingInfo.amount} labelname='Amount' onChange={event=>this.setState({ editingInfo: { ...this.state.editingInfo, amount:event.target.value}})}/>
                                <InputUnit inputtype='input' type="text" id='edit-spending-amount-title' placeholder='i.e internet bill' defaultValue={this.state.editingInfo.title} labelname='Title' onChange={event=>this.setState({ editingInfo: { ...this.state.editingInfo, title:event.target.value}})}/>
                                <InputUnit inputtype='input' type="date" id="edit-datemin" name="datemin" min="2000-01-02" max={currentDate} defaultValue={this.state.editingInfo.date} labelname='Date' onChange={event=>this.setState({ editingInfo: { ...this.state.editingInfo, date:event.target.value}})}/>
                                <InputUnit inputtype='select' id="edit-transaction-type" defaultValue={this.state.editingInfo.type} labelname='Type' options='spending,earning' onChange={event=>this.setState({ editingInfo: { ...this.state.editingInfo, type:event.target.value}})}/>
                                <InputUnit inputtype='input' type="text" id='edit-spending-writer-input' placeholder='i.e John' defaultValue={this.state.editingInfo.person} labelname='By' onChange={event=>this.setState({ editingInfo: { ...this.state.editingInfo, person:event.target.value}})}/>
                                <InputUnit inputtype='select' id="edit-transaction-category" name="categories" defaultValue={this.state.editingInfo.category} labelname='Category' options={`-select-,${this.props.budgetInfo.categories?Object.keys(this.props.budgetInfo.categories).join():null},others`} onChange={event=>this.setState({ editingInfo: { ...this.state.editingInfo, category:event.target.value}})}/>
                                <InputUnit inputtype='textArea' type="textarea" rows="1" cols='35' id='edit-spending-note' placeholder='i.e note: Paid fedit-or the next 6 months' defaultValue={this.state.editingInfo.note} labelname='Note(optional)' onChange={event=>this.setState({ editingInfo: { ...this.state.editingInfo, note:event.target.value}})}/>
                                <div className='budget-input-btn'>
                                    <input type="submit" id='edit-spending-input-submit' value='Save' className='btn btn-four budget-add-submit' onClick={this.saveEditHandler.bind(this)}/>
                                    <button className='btn btn-primary budget-add-submit' onClick={()=>this.setState({editModalOpen:false,editingInfo:this.initialModalEdit,editValidationMessage:''})}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    }
                    
                </Modal>
                :null}
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        token : state.auth.token,
        userId :state.auth.userId,
        transactionsList: state.list.transactionsList,
        currentMonthTransactions:state.list.transactionsList.currentMonth,
        loading:state.list.loading,
        budgetInfo:state.budgetCal.budgetInfo,
        errorMessage:state.list.errorMessage,
        successMessage: state.list.editSuccessMessage,
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onDeleteHandler:(transactionId,token)=>{dispatch(actions.deleteTransaction(transactionId,token))},
        onEditSaveClicked: (transactionInfo,token) => dispatch(actions.editTransaction(transactionInfo,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BudgetList)