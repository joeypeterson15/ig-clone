import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import { getAllHashPosts } from "../../store/hashposts"

function Hashtag () {

    const params = useParams()
    const { name } = params
    console.log(name)

    const posts = useSelector(state => Object.values(state.hashPosts))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllHashPosts(String(name)))
    }, [dispatch])

    return (
        <div>
            {posts.map(post => (
                <div>{post.body}</div>
            ))}
        </div>
    )
}

export default Hashtag
