import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../store/allPost';

function Explore() {
    const user = useSelector((state) => state.session?.user)
    const posts = useSelector((state) => Object.values(state.allPosts))


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllPosts(user?.id))
    }, [dispatch])

    return (
        <div className="explore-outer-container">
            { posts ? <div className="all-posts-container">
                {posts.map((post) => (
                    <Link to={`/posts/${post.id}`}>
                        <div key={post.id}>
                            <img className="post-image" src={post.imageUrl}></img>
                            {/* <div>{post.body}</div> */}
                        </div>
                    </Link>
                ))}
            </div> : <div>You don't have any posts yet!</div>}
        </div>
    )
}

export default Explore;
