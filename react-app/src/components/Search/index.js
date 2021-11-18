import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"

const Search = () => {
  const [term, setTerm] = useState("")
  const [results, setResults] = useState([])
  const sessionUser = useSelector(state => state.session?.user)

  useEffect(()=> {
    if(term.length > 0) {
      fetch(`/api/users/search/${term}`).then(res => res.json()).then(json => {setResults(json.users.filter(user => user.username !== sessionUser?.username )); console.log(json)}).catch(e => console.log(e));
    } else (setResults(""));
  }, [term])



  return (
    <div onClick={(e)=> e.stopPropagation()}>
      <form className='search-bar' autoComplete="off">

        <input type="search"
           placeholder='Start Up A Conversation' value={term} onChange={(e) => setTerm(e.target.value)} />

        {<ul>
            { !!results.length && results?.map(user => (
            <div>
            <img src={user.avatar}></img>
            <p>{user.username}</p>
            </div>))}
        </ul>}
      </form>
    </div>
  )
}

export default Search;
