import React, { useState } from 'react'
import _ from "lodash"
const Debounce = () => {

    const [pressed, setPressed] = useState(0);
    const [triggerPressed, setTriggerPressed] = useState(0);

    let timer;


    const myDebounce = (cb, d) => {
        let timer;
        return function(...args) {
            timer = setTimeout(() => {
                cb(...args)
            }, d)
        }
    }

    const handleClick = () => {



        // const debounceTriggerCount = _.debounce(() => {
        //     setTriggerPressed(triggerPressed+1)
        // }, 800)
        // setPressed(pressed + 1)
        // debounceTriggerCount()
        




    }

    const myFun  = () => {
        return (
        // setInterval(() => {
                <img src='/gift-card.gif' style={{ height: "200px", width: "200px"}} />
            )
        // }, 1000)
    }

    return (
        <>
            {/* <button onClick={handleClick}> Increment </button>
            <h4> Button Pressed : {pressed} </h4>
            <h4> Increment Triggered : {triggerPressed} </h4> */}

            {myFun()}
        </>
    )
}

export default Debounce
