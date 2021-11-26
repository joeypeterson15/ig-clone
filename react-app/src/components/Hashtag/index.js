import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import { getAllHashPosts } from "../../store/hashposts"
import { Link } from "react-router-dom"

function Hashtag () {

    const params = useParams()
    const { name } = params
    console.log(name)

    const sessionUser = useSelector(state => Object.values(state.session?.user))
    const posts = useSelector(state => Object.values(state.hashPosts))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllHashPosts(String(name)))
    }, [dispatch])

    return (
        <div>
            { posts ? <div className="my-posts-container">
                {posts.map((post) => (
                    <Link to={post.userId === sessionUser?.id ? `/${post?.id}` : `/p/${post?.userId}/${post?.id}}`}>
                        <div key={post.id}>
                            <img alt="" className="post-image" src={post.imageUrl}></img>
                            {/* <div>{post.body}</div> */}
                        </div>
                    </Link>
                ))}
            </div> : <div>You don't have any posts yet!</div>}
        </div>
    )
}

export default Hashtag
