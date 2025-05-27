const Toggleable=(props)=>{
    if(props.state){
        return(
            <div>
                {props.children}
            </div>
            )
    }
    else{
        return null;
    }
}
export default Toggleable