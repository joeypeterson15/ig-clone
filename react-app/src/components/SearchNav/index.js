import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import '../Search/Search.css'

const SearchNav = () => {
    let history = useHistory()

  const [term, setTerm] = useState("")
  const [results, setResults] = useState([])
  const sessionUser = useSelector(state => state.session?.user)
  const users = useSelector(state => Object.values(state.allUsers))
//   console.log(users)

  const dispatch = useDispatch()


  useEffect(()=> {
    if(term.length > 0) {

      fetch(`/api/users/search/${term}`).then(res => res.json()).then(json => {setResults(json.users.filter(user => user.username !== sessionUser?.username )); console.log(json)}).catch(e => console.log(e));

    } else (setResults(""));

  }, [term])


 const whenClicked = (user) => () => {
     setTerm('')
     history.push(`/p/${user?.id}`)
 }





  return (
    <div className="search-container-nav" >
      <form className='search-bar' autoComplete="off">

        <input className="search-input" type="search"
           placeholder='Search' value={term} onChange={(e) => setTerm(e.target.value)} />

      </form>

        {<ul className={`search-results ${users.length >= 9 ? 'results-found' : "" }`}>

            { !!results.length && results?.map(user => (

            <div className='search-results-div' onClick={whenClicked(user)} >
                <img className="search-results-image-nav" alt="" src={user.avatar}></img>
                <p>{user.username}</p>
            </div>))}

        </ul>}
    </div>
  )
}

export default SearchNav;
