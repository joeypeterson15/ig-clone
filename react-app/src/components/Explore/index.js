import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../store/allPost';
import './Explore.css'

function Explore() {
    const user = useSelector((state) => state.session?.user)
    const posts = useSelector((state) => Object.values(state.allPosts))


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllPosts(user?.id))
    }, [dispatch])

    return (
        <div className="explore-outer-container">
            { posts

            ?

            <div className="all-explore-posts-container">
                {posts.map((post, i) => (


                    <Link className={ (i >= 3) && (i % 4 === 0) ? "big-explore-div" : "explore-div"} to={`/posts/${post.id}`}>
                        <div  key={post.id}>
                            <img className={ (i >= 3) && (i % 4 === 0) ? "big-explore-image" : "explore-image"} src={post.imageUrl}></img>
                            {/* <div>{post.body}</div> */}
                        </div>
                    </Link>
                ))}


            </div>

            :

            <div>You don't have any posts yet!</div>}
        </div>
    )
}

export default Explore;
