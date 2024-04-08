import React from 'react';
import {connect} from 'react-redux';
import {incrementActionCreator, decrementActionCreator, stepActionCreator} from '../src/actions/actions';


const Component = (props) => {

    console.log(props);


     return (
        <div>
            <h1>{props.counter}</h1>
             <input type="number" name="step" onChange={props.changeStep} value={props.step}/>
            <button onClick={props.increment}>+</button>
            <button onClick={props.decrement}>-</button> 
        </div>
    );
}

const mapStateToProps = state => state;

// const mapDispatchToProps = (dispatch) => {
//     return {
//         increment: () => dispatch(incrementActionCreator()),
//         decrement: () => dispatch(decrementActionCreator()),
//         changeStep: (event) => dispatch(stepActionCreator(event))
//     }
// }

const mapDispatchToProps = {
    increment: incrementActionCreator,
    decrement: decrementActionCreator,
    changeStep: stepActionCreator
}



export default connect(mapStateToProps, mapDispatchToProps)(Component);
