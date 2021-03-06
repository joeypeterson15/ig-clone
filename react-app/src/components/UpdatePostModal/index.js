import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { updateOnePost } from '../../store/post';
import { useHistory } from 'react-router';
import "./UpdatePostModal.css"


function UpdatePostModal ({ setPostBody, setHashtags, setShowMenu, post, showModal, setShowModal}) {

    let history = useHistory()

    // const [showModal, setShowModal] = useState(false);
    const [body, setBody] = useState(post?.body)
    const dispatch = useDispatch();

    const submitUpdatePost = (e) => {
        e.preventDefault()
        const payload = {
            body
        }

        let split = body.split(" ")
        let hashArray = []
        for (let i = 0; i < split.length; i++) {
            let e = split[i];
            if (e.includes("#")) {
              hashArray.push(e.substring(1))
                // dispatch(createOneHashtag({name : e.substring(1)}))
                // split.splice(i,1)
            }
        }
        dispatch(updateOnePost(payload, post?.id, hashArray))
        setShowModal(false)
        setShowMenu(false)
        setPostBody([])
        setHashtags([])


        // history.push(`/${post?.id}`)
        // dispatch(getMyPosts(post?.id))

    }

    return (
        <>
            <div>
                <button className="edit-post-button" onClick={() => setShowModal(true)}>Update</button>
            </div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <div className="update-post-modal-card">
                    <img className="upload-image" alt="" src={post?.imageUrl}></img>
                    <form className="modal-form" onSubmit={submitUpdatePost}>
                    <div className="ye flex">
                                <img src={post?.avatar} className="avatar-image"></img>
                                <div className="username">{post?.username}</div>
                            </div>
                        <textarea className="modal-addcaption-textarea"
                        rows={12}
          
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        >
                        </textarea>
                        <button className="update-down update-post-button" type="submit">Update</button>
                        <button className="update-post-button" onClick={() => setShowModal(false)}> Cancel</button>
                    </form>
                </div>
            </Modal>
          )}
        </>
    )
}

export default UpdatePostModal;
