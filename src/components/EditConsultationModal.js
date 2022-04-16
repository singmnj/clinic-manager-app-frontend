import React from 'react';
import ReactModal from 'react-modal';

const EditConsultationModal = ({ show, handleClose }) => {
    return(
        <ReactModal isOpen={show} ariaHideApp={false}> 
            <div>
                Editing ....
                <button onClick={handleClose}>close</button>
            </div>
        </ReactModal>
    );
};

export default EditConsultationModal;