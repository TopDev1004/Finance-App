import React from'react'
import './modal.scss'

function modal (props){
    return (
        <div className="modal">
            <dialog style={props.modalStyle} className="modal__content">
                <button className="modal__close" onClick={props.closeBtnClick}>&times;</button>
                {props.children}
            </dialog>
            <div className="modal__overlay" style={props.overLayStyle} onClick={props.overlayClick}></div>
        </div>
    )
}


export default modal