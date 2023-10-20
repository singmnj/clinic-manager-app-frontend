import React from "react";
import ReactModal from "react-modal";

const CustomModal = ({ isModalOpen, handleClose, handleConfirm, children }) => {
	return (
		<div className="position-relative">
			<ReactModal isOpen={isModalOpen} ariaHideApp={false}>
				{children}
				<div className="position-absolute top-0 end-0 mx-2 mt-2">
					<button onClick={handleClose} className="btn btn-outline-primary">
						<i className="bi bi-x-square-fill me-2"></i>
						Close
					</button>
				</div>
			</ReactModal>
		</div>
	);
};

export default CustomModal;
