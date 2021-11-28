import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { createOneChannel } from "../../store/channel"
import { useHistory } from "react-router"
import './Search.css'

const Search = ({ setShowModal }) => {

  let history = useHistory()

  const [term, setTerm] = useState("")
  const [results, setResults] = useState([])
  const sessionUser = useSelector(state => state.session?.user)
  const users = useSelector(state => Object.values(state.allUsers))
  const [friend, setFriend] = useState('')
  console.log(users)

  const dispatch = useDispatch()


  useEffect(()=> {
    if(term.length > 0) {

      fetch(`/api/users/search/${term}`).then(res => res.json()).then(json => {setResults(json.users.filter(user => user.username !== sessionUser?.username )); console.log(json)}).catch(e => console.log(e));

    } else (setResults(""));

  }, [term])


  const createChannel = () => {
    const payload = {
        friendId : friend?.id,
        friendAvatar : friend?.avatar,
        friendUsername : friend?.username,
        userId: sessionUser?.id
    }
    dispatch(createOneChannel(payload))
    setShowModal(false)
    history.push(`/messages/${sessionUser?.id}/${friend?.id}`)
    setTerm('')
  }

  const setupFriend = (user) => {
    setFriend(user)

  }





  return (
    <div className="search-container" >
      <div className="top-search-channel-container">
        <i onClick={() => setShowModal(false)} class="exit fas fa-times"></i>
        <div className="new-message-header">New Message</div>
        <div onClick={createChannel}>Next</div>
      </div>

      <form className='search-bar-channel' autoComplete="off">
        <div className="to-div">To:</div>
        <input className="search-channel-input" type="search"
           placeholder='Search...' value={term} onChange={(e) => setTerm(e.target.value)} />

      </form>

      <div className="channel-text" >Suggested</div>



            { !!results.length && results?.map(user => (

            <div className={friend ? 'search-channel-clicked-results-div' :'search-channel-results-div'} onClick={() => setFriend(user)} >
                <img className="channel-results-image" alt="" src={user.avatar}></img>
                <p>{user.username}</p>
            </div>))}


    </div>
  )
}

export default Search;
