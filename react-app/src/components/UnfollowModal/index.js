import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { useSelector} from 'react-redux';
import { deleteOneFollow, getFollows } from '../../store/follow';


function UnfollowModal ({ userId, followId}) {
    const [showModal, setShowModal] = useState(false);

    // const user = useSelector((state) => state.session?.user)

    const dispatch = useDispatch()

    const deleteFollow = (e) => {
        e.preventDefault()
        // dispatch(deleteOneFollow(id))
        setShowModal(false)
        dispatch(deleteOneFollow(userId, followId))
        // dispatch(getFollows(userId))
    }


    return (
        <>
        <button onClick={() => setShowModal(true)}>
          Unfollow
        </button>
        {showModal && (
        <Modal  onClose={() => setShowModal(false)}>
            <form onSubmit={deleteFollow}>
                <button type="submit">Unfollow</button>
                <div>Cancel</div>
            </form>
        </Modal>
      )}
    </>
    )
}

export default UnfollowModal;
