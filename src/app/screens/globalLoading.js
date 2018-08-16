import React from "react"

import LoadingSvg from '../assets/img/icon-preloader.svg';

export default class GlobalLoading extends React.Component{
    render(){
        return(
            <div style={{height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div className="preloader">
                    <img src={LoadingSvg}/>
                </div>
            </div>
        )
    }
}