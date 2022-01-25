import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteOneFollow } from '../../store/follow';
import { getFollows } from '../../store/follow';
import { useEffect} from 'react';
// import { getMainFeedPosts } from '../../store/mainFeedPosts';
import '../Profile/Profile.css'
import '../UserProfile/UserProfile.css'


function UnfollowModal ({ setIsFollowed, userId, followId, showModal, setShowModal}) {
    // const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        return (
            setIsFollowed(false)
        )
    })

    const deleteFollow = (e) => {
        e.preventDefault()
        // dispatch(deleteOneFollow(id))
        setShowModal(false)
        dispatch(deleteOneFollow(userId, followId))
        setIsFollowed(false)
        dispatch(getFollows(userId))
        // dispatch(getMainFeedPosts(userId))
    }


    return (
        <>
        <button className="unfollow-button" onClick={() => setShowModal(true)}>
            <i class="fas fa-user-check"></i>
        </button>
        {showModal && (
        <Modal  onClose={() => setShowModal(false)}>
            <form className="delete-comment-modal-form" onSubmit={deleteFollow}>
                <button className="submit-modal-button" type="submit">Unfollow</button>
                <button onClick={() => setShowModal(false)} className="cancel-button-modal">Cancel</button>
            </form>
        </Modal>
      )}
    </>
    )
}

export default UnfollowModal;
