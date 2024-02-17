import React from "react";
import './CustomerInput.css';

const CustomerInput = (props) => {
    return (
        <div>
            <label className='customer-label'>{props.label}</label>
            <input 
                className='customer-input' 
                type={props.type}
                value={props.value} 
                onChange={(e)=>props.setValue(e.target.value)} />
        </div>
    )
}

CustomerInput.defaultProps = {
    type: "text",
}

export default CustomerInput