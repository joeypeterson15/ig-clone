import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../store/allUsers';
import Search from '../Search';
import { useDispatch } from 'react-redux';

function SearchModal () {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session?.user)
    const users = useSelector(state => Object.values(state.allUsers).filter(user => user?.id !== sessionUser?.id))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
      }, [dispatch])
    return (
        <>
            <i className="far fa-edit" onClick={() => setShowModal(true)}></i>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <Search users={users} showModal={showModal} setShowModal={setShowModal} />
            </Modal>
            )}
        </>
    )

}

export default SearchModal;
