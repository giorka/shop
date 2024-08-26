import React from 'react'
import cl from './SwitchButtons.module.css'

function SwitchButtons({buttonsValue, setButtonsValue, firstButtonText, secondButtonText}) {
    const firstButtonClasses = [cl.button]
    const secondButtonClasses = [cl.button]
    if(buttonsValue === "one") {
        firstButtonClasses.push(cl.select)
    }
    else {
        secondButtonClasses.push(cl.select)
    }

  return (
    <div className={cl.buttons}>
            <button onClick={() => setButtonsValue("one")} className={firstButtonClasses.join(" ")}>{firstButtonText}</button>
            <button onClick={() => setButtonsValue("two")} className={secondButtonClasses.join(" ")}>{secondButtonText}</button>
    </div>
  )
}

export default SwitchButtons
