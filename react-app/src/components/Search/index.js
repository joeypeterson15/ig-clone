import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { createOneChannel } from "../../store/channel"
import { useHistory } from "react-router"
import { getAllUsers } from "../../store/allUsers"
import './Search.css'

const Search = ({ showModal, setShowModal, users }) => {

  let history = useHistory()

  const [term, setTerm] = useState("")
  const sessionUser = useSelector(state => state.session?.user)
  // const users = useSelector(state => Object.values(state.allUsers).filter(user => user?.id !== sessionUser?.id))
  const [results, setResults] = useState([...users])
  const [friend, setFriend] = useState('')


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch, showModal])

  useEffect(()=> {
    if(term.length > 0) {

      fetch(`/api/users/search/${term}`).then(res => res.json()).then(json => {setResults(json.users.filter(user => user.username !== sessionUser?.username )); console.log(json)}).catch(e => console.log(e));

    }
    else {
      setResults([...users])
      setFriend('')
    };

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
        <div className={friend ? "blue-next":"next"} onClick={createChannel}>Next</div>
      </div>

      <form className='search-bar-channel' autoComplete="off">
        <div className="to-div">To:</div>
        <input className="search-channel-input" type="search"
           placeholder='Search...' value={term} onChange={(e) => setTerm(e.target.value)} />

      </form>

      <div className="channel-text" >Suggested</div>



      <div className="search-results-container">
            { !!results.length && results?.map(user => (

                <div className={friend.id === user?.id ? 'search-channel-clicked-results-div' :'search-channel-results-div'} onClick={() => setFriend(user)} >
                    <div className="img-username">
                      <img className="channel-results-image" alt="" src={user.avatar}></img>
                      <p className="username-results">{user.username}</p>

                    </div>
                    { friend.id === user?.id ? <div className="circle-with-checkmark">
                      <i class="check fas fa-check"></i>
                    </div>
                    :
                    <div className="circle"></div>}
                </div>

))}
</div>



    </div>
  )
}

export default Search;
