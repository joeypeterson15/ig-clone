import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { createOnePost } from '../../store/post';
import { useDispatch } from 'react-redux';
import { useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import './AddPostModal.css'


function AddPostModal () {
    const [showModal, setShowModal] = useState(false);
    const [showCaptionModal, setShowCaptionModal] = useState(false)
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

    const nextModal = () => {
        if (!imageUrl) {

            window.alert('please provde an image url')

        } else {

            setShowModal(false)
            setShowCaptionModal(true)
        }
    }

    const prevModal = () => {
        setShowCaptionModal(false)
        setShowModal(true)
        // const url = document.getElementById('modal-input')
        // console.log('imageUrl', imageUrl, url)
        // if (imageUrl) url.value = imageUrl
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
            <div className="add-post-first-card">

                <div className="upper-image-add-div">

                    <div className="new-post-heading">Create new post</div>


                    <div className="arrow-right">
                        <div onClick={nextModal} className={imageUrl ? "next-button-blue":"next-button"}>Next</div>
                    </div>

                </div>

                {/* {imageUrl ? */}
                    {/* <img src={imageUrl} className="instagram-image-add"></img> */}
                    {/* : */}
                    <a href="https://ibb.co/CwFnmJZ"><img className="instagram-image-add"  src="https://i.ibb.co/8mVjNzp/black-white-instagram-add-post.png" alt="black-white-instagram-add-post" border="0"></img></a>

                {/* <a href="https://ibb.co/T2PT7XP"><img className="instagram-image-add" src="https://i.ibb.co/QQYcTBY/instagram-add-post.jpg" alt="instagram-add-post" border="0"></img></a> */}

                <textarea id="modal-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="text" placeholder="Add Image..."></textarea>
                {/* <textarea className="modal-textarea" rows={15} value={body} onChange={(e) => setBody(e.target.value)}type="text" placeholder="content"></textarea> */}
                {/* <button className="submit-modal-button" type="submit">Create Post</button> */}



            </div>

        </Modal>
      )}
        {showCaptionModal && (
            <Modal onClose={() => setShowCaptionModal(false)}>

                <div className="add-post-second-card">

                    <div className="upper-image-add-div">

                        <div className="arrow-left">
                            <i onClick={prevModal} class="fas fa-arrow-left"></i>
                        </div>
                        <div className="new-post-heading">
                            Create new post
                        </div>

                    </div>

                    <div className="image-plus-caption-body">


                        <div className="upload-image">
                            <img src={imageUrl} className="instagram-image-add"></img>
                        </div>


                        <form className="modal-form" onSubmit={createPost}>
                            <div className="ye flex">
                                <img src={user?.avatar} className="avatar-image"></img>
                                <div className="username">{user?.username}</div>
                            </div>
                            {/* <input className="modal-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="text" placeholder="imageUrl"></input> */}
                            <textarea className="modal-addcaption-textarea" rows={12} value={body} onChange={(e) => setBody(e.target.value)}type="text" placeholder="Write a caption..."></textarea>
                            <button className="submit-post-modal-button" type="submit">Share</button>
                        </form>


                    </div>



                </div>
            </Modal>
        )}
    </>
    )
}

export default AddPostModal;
