import React from 'react'
import './dashboard-main.scss'
import dashboardBodyTop from '../../../images/headerImg1.png'
import Alert from '../../../components/alert/alert'
function dashBoardOverview(props){
    
    const totalBudgetCal = (budgetList) =>{
        const list=[]
        for (let item in budgetList){
            list.push(+budgetList[item])
        }
        return list.reduce((total, amount) => total + amount,0)
    }

    const totalSpendingcalculator = (list,key,value) =>{
        const spendingAmountList=[]
        for (let transaction in list){
            if(list[transaction][key] === value){    
                spendingAmountList.push(+list[transaction].amount)
            }
        }
        return spendingAmountList.reduce((total, amount) => total + amount,0)
    }
    return(
        <div className='dashboard-body'>
            <div className='dashboard-body-top'>
                <div>
                    <h2>Hi {props.budgetSettingsInfo.firstName}!</h2>
                    <h3>Welcome Back, Nice To See You Again.</h3>
                </div>
                <img src={dashboardBodyTop} alt="dashboard body"/>
            </div>
            {props.budgetSettingsInfo.categories?
            <div className='dashboard-body-main'>
                <h1>Overview</h1>
                <div className='dashboard-body-main-body'>
                <div className='dashboard-summary-total-body'>
                    <div className='dashboard-summary-total-monthly'>
                        <h4 className='dashboard-summary-total-monthly-title'>Total Budget</h4>
                        <div className='dashboard-summary-total-monthly-body'>
                            <h1>${totalBudgetCal(props.budgetSettingsInfo.categories)}</h1>
                            <h5>({(totalSpendingcalculator(props.transactionsList.currentMonth,'type','spending')/totalBudgetCal(props.budgetSettingsInfo.categories)*100).toFixed()}%)used</h5>
                        </div>
                        </div>
                        <div className='dashboard-summary-total-monthly'>
                            <h4 className='dashboard-summary-total-monthly-title'>Total Spending</h4>
                            <div className='dashboard-summary-total-monthly-body'>
                                <h1>${totalSpendingcalculator(props.transactionsList.currentMonth,'type','spending')}</h1>
                            </div>
                        </div>
                        <div className='dashboard-summary-total-monthly'>
                            <h4 className='dashboard-summary-total-monthly-title'>Total Remaining</h4>
                            <div className='dashboard-summary-total-monthly-body'>
                                <h1>${+totalBudgetCal(props.budgetSettingsInfo.categories)-totalSpendingcalculator(props.transactionsList.currentMonth,'type','spending')}</h1>
                            </div>
                        </div>
                        <div className='dashboard-summary-total-monthly'>
                            <h4 className='dashboard-summary-total-monthly-title'>Total Saving</h4>
                            <div className='dashboard-summary-total-monthly-body'>
                                <h1>${totalSpendingcalculator(props.transactionsList.currentMonth,'type','earning')-totalBudgetCal(props.budgetSettingsInfo.categories)}</h1>
                            </div>
                        </div>
                        <div className='dashboard-summary-total-monthly'>
                            <h4 className='dashboard-summary-total-monthly-title'>Total earning</h4>
                            <div className='dashboard-summary-total-monthly-body'>
                                    <h1>${totalSpendingcalculator(props.transactionsList.currentMonth,'type','earning')}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-main-bottom-bars-title'>
                        <p>Used Budget for each category</p>
                        <p><span style={{color:'#F27BA7'}}></span>Last Month</p>
                        <p><span style={{color:'#6266EA'}}></span>This Month</p>
                    </div>
                    <div className="dashboard-main-bottom">
                        <div className="dashboard-main-bottom-bars">
                            {Object.keys(props.budgetSettingsInfo.categories).map(category=>
                                <div className='dashboard-main-bottom-bar'>
                                    <span className='dashboard-main-bottom-bar-span-1' style={{
                                        backgroundColor:'#6266EA',
                                        height:(totalSpendingcalculator(props.transactionsList.currentMonth,'category',category)/props.budgetSettingsInfo.categories[category]*100).toFixed(1)+'%'}}><h5>{(totalSpendingcalculator(props.transactionsList.currentMonth,'category',category)/props.budgetSettingsInfo.categories[category]*100).toFixed()+'%'}</h5>
                                    </span>
                                    <span className='dashboard-main-bottom-bar-span-2' style={{
                                        backgroundColor:'#F27BA7',
                                        height:(totalSpendingcalculator(props.transactionsList.lastMonth,'category',category)/props.budgetSettingsInfo.categories[category]*100).toFixed(1)+'%'}}><h5>{(totalSpendingcalculator(props.transactionsList.lastMonth,'category',category)/props.budgetSettingsInfo.categories[category]*100).toFixed()+'%'}</h5>
                                    </span>
                                    <p>{category}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>:<Alert/>}
        </div>
    )
    
}

export default dashBoardOverview