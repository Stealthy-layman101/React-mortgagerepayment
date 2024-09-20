import React, { useState } from "react";
import Iconcalculator from './assets/Iconcalculator.svg';
import Emptyimg from './assets/Emptyimg.svg';

function Mortgage(){
    const [mortgageamount, setMortgageAmount] = useState();
    const [mortgageterm, setMortgageTerm] = useState();
    const [interest, setInterest] = useState();
    const [monthlyrepayment, setMonthlyRepayment] = useState();
    const [total, setTotal] = useState();
    const [mortgageType, setMortgageType] = useState('');
    let monthlyInterestRate = (interest/100) / 12;
    let loanTerm = mortgageterm * 12;

    function amount(event){
        setMortgageAmount(parseInt(event.target.value));
    }

    function term(event){
        setMortgageTerm(parseInt(event.target.value));
    }

    function rate(event) {
        setInterest(parseFloat(event.target.value));
    }

    function repayment(event){
        const repaymentInput = document.getElementById("repayment-radio");
        event.preventDefault();

        if(mortgageamount && mortgageterm && interest && mortgageType){
            document.getElementById("result-div").style.display="none";
            document.getElementById("result-display-div").style.display="block";
            let top = Math.pow(1 + monthlyInterestRate, loanTerm) * monthlyInterestRate;
            let bottom = Math.pow(1 + monthlyInterestRate, loanTerm) - 1;
            let monthly = mortgageamount * (top / bottom);
            setMonthlyRepayment(monthly.toFixed(2));
            setTotal((monthly * loanTerm).toFixed(2));
    }else{
        console.log("Enter mortgage amount, term, interest and choose mortgage type");
    }
    }

    return(
        <>
        <form className="form" onSubmit={repayment}>
        <div className="back-div"></div>
        <div className='calculator-div'>
            <h1 className='header'>Mortgage Calculator</h1>
            <p className='clear-p' onClick={() => {
                location.reload();
            }}>Clear All</p>
            <div className='amount-div'>
            <p className='amount-p'>Mortgage Amount</p>
            <span className='input-prefix'>£</span>
            <input required value={mortgageamount} style={{
                textIndent: "32px",
            }} onChange={amount} id='amount-input' className='amount-input' type="number" />
            </div>
            <div className="term-rate-desktop">
            <div className='term-div'>
            <p className='term-p'>Mortgage Term</p>
            <span className='input-prefix2'>years</span>
            <input required value={mortgageterm} onChange={term} className='term-input' type="number" />
            </div>
            <div className='rate-div'>
            <p className='rate-p'>Interest Rate</p>
            <span className='input-prefix3'>%</span>
            <input required step="any" value={interest} onChange={rate} className='rate-input' type="number" />
            </div>
            </div>
            <p className='type-p'>Mortgage Type</p>
            <div id="repayment-div" className='repayment-div'>
                <input 
                id="repayment-radio" 
                className='repayment-input' 
                type="radio"
                value = "repayment"
                checked={mortgageType === 'repayment'}
                onChange={(e) => setMortgageType(e.target.value)} 
                onClick={() => {
                    document.getElementById('repayment-div').style.border = "1px solid hsl(61, 70%, 52%)";
                }} 
                ></input>
                <label className='repayment-label'>Repayment</label>
            </div>
            <br />
            <div className='interest-div'>
                <input className='interest-input' type="radio"></input>
                <label className='interest-label'>Interest Only</label>
            </div>


            <button type="submit" className='calculate-btn'> 
            <img className='calculator-img' src={Iconcalculator} alt="calculator" /> 
                 Calculate repayments</button>
        </div>
        </form>

        <div id="result-display-div" className="result-display-div">
        <p className="display-p">Your results</p>
            <p className="display-p2">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again</p>
            <div className="aesthetic"></div>
            <div className="result-display">
                <p className="display-p3">Your monthly repayments</p>
                <p className="monthly-result">£{monthlyrepayment}</p>
                <hr />
                <p className="display-p4">Total you'll repay over the term</p>
                <p className="display-p5">£{total}</p>
            </div>
        </div>

        <div id="result-div" className='result-div'>
            <img className="empty-img" src={Emptyimg} alt="empty" />
            <p className='result-p'>Results shown here</p>
            <p className='result-p2'>Complete the form and click "calculate repayments" to see what your monthly repayments would be</p>
        </div>
        </>
    )
}

export default Mortgage;