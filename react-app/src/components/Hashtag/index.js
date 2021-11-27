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

    const countPosts = () => {
        let count = 0
        for (let i = 0; i < posts.length; i++) {
            count ++
        }
        return count
    }

    return (
        <div>
            <div className="my-profile-container">
                <div className="profile-picture" style={{backgroundImage: `url(${posts[0].imageUrl})`}}></div>
                <div className="my-profile-content">
                        <div className="top-my-profile-content">
                            <div className="profile-username">#{name}</div>
                        </div>
                        <div className="middle-my-profile-content">
                            <div className="flex">
                                <div className="bold-numbers">{countPosts()}</div>
                                <div className='space'>posts</div>
                            </div>


                        </div>
                        
                </div>
            </div>
            { posts ? <div className="my-posts-container">
                {posts.map((post) => (
                    <Link to={`/hashtags/${name}/${post?.id}`}>
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
