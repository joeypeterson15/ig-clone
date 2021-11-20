import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { createOnePost } from '../../store/post';
import { useDispatch } from 'react-redux';
import { useSelector} from 'react-redux';
import { createOneHashtag } from '../../store/hashtag';

function AddPostModal () {
    const [showModal, setShowModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('')
    const [body, setBody] = useState('')

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
    }

    return (
        <>
        <div onClick={() => setShowModal(true)}>
          <div>
            <i className="fas fa-plus">Create Post</i>
          </div>
        </div>
        {showModal && (
        <Modal  onClose={() => setShowModal(false)}>
            <form onSubmit={createPost}>
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="text" placeholder="imageUrl"></input>
                <input value={body} onChange={(e) => setBody(e.target.value)}type="text" placeholder="content"></input>
                <button type="submit">Create Post</button>
            </form>
        </Modal>
      )}
    </>
    )
}

export default AddPostModal;
