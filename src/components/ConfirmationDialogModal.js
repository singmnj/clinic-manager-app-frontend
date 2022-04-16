import React from 'react';
import ReactModal from 'react-modal';

const ConfirmationDialogModal = ({show, handleClose}) => {
    return(
        <ReactModal isOpen={show} ariaHideApp={false}>
            <div>
                <p>Are you sure you want to delete ?</p>
                <button>yes</button>
                <button onClick={handleClose}>close</button>
            </div>
        </ReactModal>
    );
};

export default ConfirmationDialogModal;