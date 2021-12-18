import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { createOnePost } from '../../store/post';
import { useDispatch } from 'react-redux';
import { useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import ImageUploading from 'react-images-uploading';

import './AddPostModal.css'


function AddPostModal () {
    const [showModal, setShowModal] = useState(false);
    const [showCaptionModal, setShowCaptionModal] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [body, setBody] = useState('')
    // console.log(ImageUploading)


    //image upload
    const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    setImageUrl(imageList[0]['data_url'])
  };








    let history = useHistory()

    const user = useSelector((state) => state.session?.user)

    const dispatch = useDispatch()
    const createPost = (e) => {
        e.preventDefault()

        if (!body) {
            window.alert('Please provide a caption for your post')
            return
        }


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

            }
        }


        setShowModal(false)
        setShowCaptionModal(false)
        dispatch(createOnePost(payload, hashArray))
        setBody('')
        setImageUrl('')
        setImages([])

        if (!window.location.href.includes('profile')) {
            history.push('/profile')
        }
    }

    const nextModal = () => {
        if (!imageUrl) {

            window.alert('please provde an image url')
            return
        }
        // if (imageUrl && !isValidImageURL(imageUrl)) {
        //     window.alert('please provide a valid image url')
        //     return
        // }

         else {

            setShowModal(false)
            setShowCaptionModal(true)
            console.log(imageUrl)
        }
    }

    function isValidImageURL(url){
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    const prevModal = () => {
        setShowCaptionModal(false)
        setShowModal(true)

    }

    const discardPost = () => {
        setShowModal(false)
        setShowCaptionModal(false)
        setImageUrl('')
    }


    const onCloseFirstModal = () => {
        setShowModal(false)
        setImages([])
        setImageUrl('')

    }

    const onCloseSecondModal = () => {
        setShowCaptionModal(false)
        setImages([])
        setImageUrl('')
    }

    const discardFirstModalImage = () => {
        setImages([])
        setImageUrl('')
    }



    return (
        <>
        <div onClick={() => setShowModal(true)}>
          <div className="nav-icon">
          <i class="far fa-plus-square"></i>
          </div>
        </div>
        {showModal && (
        <Modal  onClose={onCloseFirstModal}>

            <div className="add-post-first-card">

                { imageUrl ?

                    <div className="arrow-left">
                        <i onClick={discardFirstModalImage} class="fas fa-arrow-left"></i>

                    </div> : ""

                }

                <div className="upper-image-add-div">


                    <div className="new-post-heading">Create new post</div>


                    <div className="arrow-right">
                        <div onClick={nextModal} className={imageUrl ? "next-button-blue":"next-button"}>Next</div>
                    </div>

                </div>

                    <div className="instagram-image-container">
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                        >
                            {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                            }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <button id={imageUrl ? "hidden-button-image-upload" :"button-image-upload"}
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                >
                                Select from computer
                                </button>

                                {imageList

                                ?

                                imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img id="upload-image-first-modal" src={image['data_url']} alt="" width="100" />
                                        {/* <button onClick={() => onImageRemove(index)}>Remove</button> */}

                                        {/* <div className="image-item__btn-wrapper">
                                            <button onClick={() => onImageUpdate(index)}>Update</button>
                                        </div> */}
                                    </div>
                                    ))

                                :

                                <a href="https://ibb.co/Z84ZmVs"><img className="instagram-image-add" src="https://i.ibb.co/cFfmL15/outline-gray-instagram-icon.jpg" alt="outline-gray-instagram-icon" border="0"></img></a>
                                }


                                &nbsp;
                                {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}


                                {/* {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image['data_url']} alt="" width="100" />

                                </div>
                                ))} */}
                            </div>
                            )}
                        </ImageUploading>

                    </div>
                    {/* <div className="instagram-image-container">
                        <a href="https://ibb.co/Z84ZmVs"><img className="instagram-image-add" src="https://i.ibb.co/cFfmL15/outline-gray-instagram-icon.jpg" alt="outline-gray-instagram-icon" border="0"></img></a>
                    </div> */}

                {/* <textarea id="modal-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="text" placeholder="Add Image..."></textarea> */}







            </div>

        </Modal>
      )}
        {showCaptionModal && (
            <Modal onClose={onCloseSecondModal}>

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
