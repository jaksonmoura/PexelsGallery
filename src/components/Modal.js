import React, { useContext } from 'react'
import {GalleryContext} from '../containers/Home';

const Modal = ({isModalOpen, photo = {}}) => {
    const gallery = useContext(GalleryContext)
    return(
        <div className={"modal " + (isModalOpen ? "open" : "")}>
            <div className="modal-box">
                <div className="modal-title">Photo by {photo.photographer}</div>
                <div className="modal-img"><img src={(photo.id > 0 ? photo.src.large : "")} alt="" /></div>
                <p>section under development</p>
            </div>
        </div>
    )
}

export default Modal