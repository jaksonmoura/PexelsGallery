import React from 'react'

const Modal = ({ isModalOpen, setIsModalOpen, photo = {} }) => {

    
    const handleClickOutsideModal = () => {
        document.body.addEventListener("click", function(e) {
            e.stopPropagation()
            let modal = document.querySelector(".modal.open .modal-box")
            let path = e.path || (e.composedPath && e.composedPath())
            if (modal && (!path.includes(modal) )) {
                setIsModalOpen(false)
            }
        })
    }

    React.useEffect(() => {
        handleClickOutsideModal()
    })

    return(
        <div className={"modal " + (isModalOpen ? "open" : "")}>
            <div 
            className="modal-box" 
            style={{top: isModalOpen.top,
                    left: isModalOpen.left,
                    width: isModalOpen.width,
                    height: isModalOpen.height
                }}
             >
                <div className="modal-title">Photo by {photo.photographer}</div>
                <div className="modal-img"><img src={(photo.id > 0 ? photo.src.large2x : "")} alt="" /></div>
            </div>
        </div>
    )
}

export default Modal