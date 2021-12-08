import React from 'react'
import './Modal.css'

const Modal = ({active, setActive, children}) => {
    return (
        <div className={active ? "modalComponent active" : "modalComponent"} onClick={() => setActive(false)}>
            <div className={active ? "modal_content active" : "modal_content"} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal

