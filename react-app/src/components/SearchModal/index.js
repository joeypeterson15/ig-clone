import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import Search from '../Search';

function SearchModal () {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <i className="far fa-edit" onClick={() => setShowModal(true)}></i>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <Search setShowModal={setShowModal} />
            </Modal>
            )}
        </>
    )

}

export default SearchModal;
