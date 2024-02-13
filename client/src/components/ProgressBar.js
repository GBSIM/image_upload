import React from "react";
import "./ProgressBar.css";

const ProgressBar = (props) => {
    return (
        <div className="progress-bar-box">
            <div className="progress-bar" style={{'width':`${props.percentage}%`}}>
            </div>
        </div>
    )
}

export default ProgressBar;