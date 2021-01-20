import React from 'react'
import './dashboard-right.scss'
import { FaBell } from "react-icons/fa";

function dashboardRight (props){
    
    const totalSpendingcalculator = (list,key,value) =>{
        const spendingAmountList=[]
        for (let transaction in list){
            if(list[transaction][key] === value){    
                spendingAmountList.push(+list[transaction].amount)
            }
        }
        return spendingAmountList.reduce((total, amount) => total + amount,0)
    }
    const totalBudgetCal = (budgetList) =>{
        const list=[]
        for (let item in budgetList){
            list.push(+budgetList[item])
        }
        return list.reduce((total, amount) => total + amount,0)
    }

    let remainingDaysOfMonth = 0
        const date = new Date();
        const time = new Date(date.getTime());
        time.setMonth(date.getMonth() + 1);
        time.setDate(0);
        remainingDaysOfMonth= time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;

        return(
            <div className='dashboard-right' {...props} >
                <button className='btn btn-four modal-btn' onClick={props.addBtnClicked}>+ New Transaction</button>
                
                <div className='dashboard-right-pie-chart-box'>
                        <div className='dashboard-right-pie-chart-caption'>
                            <p><span style={{color:"#6266EA"}}></span>Used Budget {props.budgetSettingsInfo.categories?((totalSpendingcalculator(props.transactionsList,'type','spending')/totalBudgetCal(props.budgetSettingsInfo.categories)*100).toFixed()):0}%</p>
                            <p><span style={{color:"#EAE7FF"}}></span>Remaining Budget {props.budgetSettingsInfo.categories?(100-((totalSpendingcalculator(props.transactionsList,'type','spending')/totalBudgetCal(props.budgetSettingsInfo.categories)*100).toFixed())):0}%</p>
                        </div>
                    <div className='dashboard-right-pie-chart' style={{background:
                    `radial-gradient(
                        circle closest-side,
                        white 0,
                        white 60%,
                        transparent 60%,
                        transparent 90%,
                        white 0
                    ),
                    conic-gradient(
                        #6266EA 0,
                        #6266EA ${props.budgetSettingsInfo.categories?((totalSpendingcalculator(props.transactionsList,'type','spending')/totalBudgetCal(props.budgetSettingsInfo.categories)*100).toFixed()):0}%,
                        #EAE7FF 0,
                        #EAE7FF 100%
                    )`}}></div>
                </div>
                <div className='dashboard-right-notifications'>
                    <h3>Notifications <FaBell color='#f277a4' style={{margin:'.5rem'}}/></h3>
                    <div className='dashboard-right-notifications-1'><span style={{fontWeight:'bolder'}}>{remainingDaysOfMonth} day(s)</span> until next month.</div>
                    {props.budgetSettingsInfo.categories?Object.keys(props.budgetSettingsInfo.categories).map(category=> +totalSpendingcalculator(props.transactionsList,'category',category) > props.budgetSettingsInfo.categories[category]?
                        <div className='dashboard-right-notifications-2'>You've exceeded your <span style={{fontWeight:'bolder'}}>{category}</span> budget.</div>
                        :null
                    ):null}
                    {props.budgetSettingsInfo.categories?Object.keys(props.budgetSettingsInfo.categories).map(category=> +totalSpendingcalculator(props.transactionsList,'category',category)/props.budgetSettingsInfo.categories[category] === 0?
                        <div className='dashboard-right-notifications-3'>You have not used any of your <span style={{fontWeight:'bolder'}}>{category}</span> budget.</div>
                        :null
                    ):null}
                </div>
            </div>
        )
    
}

export default dashboardRight