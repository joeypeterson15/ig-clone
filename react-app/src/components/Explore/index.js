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



    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        while (currentIndex != 0) {

          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
      }

    return (
        <div className="explore-outer-container">
            { posts

            ?

            <div className="all-explore-posts-container">
                {shuffle(posts).map((post, i) => (


                    <Link className={ i === 4 || ((i > 9 && (i % 10) === 0)) ? "big-explore-div" : "explore-div"} to={`/posts/${post.id}`}>
                        <div  key={post.id}>
                            <img className="explore-image" src={post.imageUrl}></img>
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
