import React from "react"

export default class GlobalLoading extends React.Component{

    render(){
        return(
            <div style={{height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <h1>...loading...</h1>
            </div>
        )
    }

}