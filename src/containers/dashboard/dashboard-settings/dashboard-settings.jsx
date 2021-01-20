import React from 'react'
import './dashboard-settings.scss'
// import {FaTimes} from 'react-icons/fa'
import Spinner from '../../../components/spinner/spinner'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'
import editingPageImg from '../../../images/editPage.png'
class DashboardBudgetDetails extends React.Component{
    state={
        budgetSettingsInfo:{
            categories:{others:0},
            firstName:null,
            lastName:null
        },
        editing:false
    }
    totalBudgetCal = (budgetList) =>{
        const list=[]
        for (let item in budgetList){
            list.push(+budgetList[item])
        }
        return list.reduce((total, amount) => total + amount,0)
    }
    deleteHandler(item){
        const updatedState = {...this.state.budgetSettingsInfo}
        delete updatedState.categories[item]
        this.setState({budgetSettingsInfo:updatedState})
    }

    addCategoryHandler(){
        const newCategory = this.newCategoryName.value.trim()
        const newState = this.state.budgetSettingsInfo.categories?{...this.state.budgetSettingsInfo}:{...this.state.budgetSettingsInfo,categories:{}}
        console.log(newState.categories)
        newState.categories[newCategory]=this.newCategoryBudget.value.trim()
        this.setState({ budgetSettingsInfo: newState})
        this.newCategoryName.value=''
        this.newCategoryBudget.value=''
    }

    onChangeHandler(event,category){
        const newValue= event.target.value
        const newState={...this.state.budgetSettingsInfo}
        newState.categories[category] = newValue
        this.setState({ budgetSettingsInfo: newState})
    }

    editHandler=()=>{this.setState({editing:true})}
    saveHandler=()=>{this.setState({editing:false})}

    componentDidUpdate(){
        console.log(this.state.budgetSettingsInfo)
    }
    render(){
        
        let view
        if(this.props.loading){view=<Spinner/>}
        if(this.state.editing){
            view =[
                <h2>Editing...</h2>,
                <div className='dashboard-edit-categories'>
                    <div className='dashboard-edit-categories-add-box'>
                        <h3>Create a new category</h3>
                        <div>
                            <input type="text" id="new-category-name" name="new-category-name" placeholder='Category Name' ref={input=>{this.newCategoryName = input}}/>
                        </div>
                        <div>
                            <input type="number" id="new-category-amount" name="new-category-amount" min="0" max="1000000" placeholder='Category Budget' ref={input=>{this.newCategoryBudget = input}}/>
                        </div>
                        <button className='btn btn-primary' onClick={this.addCategoryHandler.bind(this)}>Add</button>
                    </div>
                    <div className='dashboard-edit-categories-items'>
                        <h3>Edit Your Categories</h3>
                        <div className='dashboard-edit-categories-items-body'>
                            {this.state.budgetSettingsInfo.categories?Object.keys(this.state.budgetSettingsInfo.categories).map(category=>
                                <div className='dashboard-edit-categories-item' key={category+'-dashboard-edit-category-unit'}>
                                    <label htmlFor={category+'-dashboard-edit-category-item'}><span onClick={()=>this.deleteHandler(category)}>&times;</span>{category}</label><br/>
                                    <input type="number" id={category+'-dashboard-edit-category-item'} name={category+'-dashboard-edit-category-item'} onChange={event=>this.onChangeHandler(event,category)} defaultValue={this.state.budgetSettingsInfo.categories[category]} placeholder='i.e 200'/>
                                </div>):'Start adding categories'}
                        </div>
                    </div>
                </div>
                ,<div className='dashboard-edit-bottom'>
                    <div className='dashboard-edit-bottom-left'>
                        <div className='dashboard-edit-bottom-left-unit'>
                            <label for="profile-firstname">Your First Name</label><br/>
                            <input type="text" id="profile-firstname" name="profile-firstname" onChange={(event)=>this.setState({budgetSettingsInfo:{...this.state.budgetSettingsInfo,firstName:event.target.value}})} defaultValue={this.props.budgetInfo.firstName} placeholder='i.e John'/>
                        </div>
                        <div className='dashboard-edit-bottom-left-unit'>
                            <label for="profile-lastname">Your Last Name</label><br/>
                            <input type="text" id="profile-lastname" name="profile-lastname" onChange={(event)=>this.setState({budgetSettingsInfo:{...this.state.budgetSettingsInfo,lastName:event.target.value}})} defaultValue={this.props.budgetInfo.lastName} placeholder='i.e John'/>
                        </div>
                    </div>
                    <div className='dashboard-edit-bottom-right'>
                        <img src={editingPageImg} alt="budget settings editing"/>
                        <button className='btn btn-four' onClick={()=>{this.props.onSaveChangesHandler(this.state.budgetSettingsInfo,this.props.token,this.props.userId);this.setState({editing: false})}}>Save Changes</button>
                    </div>
                </div>
                ]
        } else {
            view = [
             <h2>Settings</h2>,
             <div className='dashboard-edit-categories'>
                <div className='dashboard-settings-categories-total'>
                    <h2>Total budget</h2>
                    <h1>{this.props.budgetInfo.categories? '$'+ this.totalBudgetCal(this.props.budgetInfo.categories):'Not Assigned'}</h1>
                </div>
                 <div className='dashboard-settings-categories-items'>
                     <h3>Budget for Each Category</h3>
                     <div className='dashboard-edit-categories-items-body'>
                        {this.props.budgetInfo.categories?Object.keys(this.props.budgetInfo.categories).map(category=>
                            <div className='dashboard-settings-categories-item' key={category+'-dashboard-settings-category-unit'}>
                                <h4 key={category+'-dashboard-settings-category-title'}>{category}:</h4>
                                <p key={category+'-dashboard-settings-category-amount'}>{this.props.budgetInfo.categories[category]}</p>
                            </div>):'No category assigned'}
                     </div>
                 </div>
             </div>
             ,<div className='dashboard-edit-bottom'>
                 <div className='dashboard-edit-bottom-left'>
                     <div className='dashboard-edit-bottom-left-unit'>
                        <h4>Your First Name:</h4>
                        <p>{this.props.budgetInfo.firstName}</p>
                     </div>
                     <div className='dashboard-edit-bottom-left-unit'>
                        <h4>Your Last Name:</h4>
                        <p>{this.props.budgetInfo.lastName}</p>
                     </div>
                 </div>
                 <div className='dashboard-edit-bottom-right'>
                     <img src={editingPageImg} alt="budget settings editing"/>
                     <button className='btn btn-four' onClick={()=>this.setState({budgetSettingsInfo:this.props.budgetInfo,editing:true})}>Edit</button>
                 </div>
             </div>
             ]
        }
        return(<div className='dashboard-settings'>{view}</div>)
    }
}

const mapStateToProps = state =>{
    return{
        token : state.auth.token,
        userId :state.auth.userId,
        loading:state.budgetCal.loading,
        budgetInfo:state.budgetCal.budgetInfo,
        transactionsList:state.list.transactionsList.currentMonth,
        list:state.list
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onSaveChangesHandler:(newInfo,token,userId)=>{dispatch(actions.saveChangedSettingsInfo(newInfo,token,userId))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DashboardBudgetDetails)