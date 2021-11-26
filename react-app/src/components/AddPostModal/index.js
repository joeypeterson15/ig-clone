import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { createOnePost } from '../../store/post';
import { useDispatch } from 'react-redux';
import { useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import './AddPostModal.css'


function AddPostModal () {
    const [showModal, setShowModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('')
    const [body, setBody] = useState('')

    let history = useHistory()

    const user = useSelector((state) => state.session?.user)

    const dispatch = useDispatch()
    const createPost = (e) => {
        e.preventDefault()

        const payload = {
            userId : user?.id,
            body,
            imageUrl,
            avatar: user?.avatar,
            username: user?.username
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


        setShowModal(false)
        dispatch(createOnePost(payload, hashArray))
        setBody('')
        setImageUrl('')

        if (!window.location.href.includes('profile')) {
            history.push('/profile')
        }
    }

    return (
        <>
        <div onClick={() => setShowModal(true)}>
          <div className="nav-icon">
          <i class="far fa-plus-square"></i>
          </div>
        </div>
        {showModal && (
        <Modal  onClose={() => setShowModal(false)}>
            <form className="modal-form" onSubmit={createPost}>
                <input className="modal-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="text" placeholder="imageUrl"></input>
                <textarea className="modal-textarea" rows={15} value={body} onChange={(e) => setBody(e.target.value)}type="text" placeholder="content"></textarea>
                <button className="submit-modal-button" type="submit">Create Post</button>
            </form>
        </Modal>
      )}
    </>
    )
}

export default AddPostModal;
