import React from 'react';
import ReactModal from 'react-modal';

const CustomModal = ({ isModalOpen, handleClose, handleConfirm, children }) => {
    return(
        <ReactModal isOpen={isModalOpen} ariaHideApp={false}> 
            {children}
            <button onClick={handleClose}>close</button>
        </ReactModal>
    );
};

export default CustomModal;