import { getAllFollows } from '../../store/allFollows';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { createOneFollow } from '../../store/follow';
import BFSFollow from '../BFSFollow';

import './BFS.css'



function BFS ({ }) {


    const user = useSelector((state) => state.session?.user)
    const follows = useSelector((state) => Object.values(state.allFollows))
    const [users, setUsers] = useState([]);
    const [finalRecommendedUsers, setFinalRecommendedUsers] = useState([])
    console.log('all follows', follows)
    let recommendedUsers = []


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllFollows())

        function getRecommendedFollows( degrees) {
            let queue = [[user?.id]];

            let recommended = [];

            let currentFollows = new Set ()

            follows.forEach(follow => {
                if (follow.userId === user?.id)
                currentFollows.add(follow?.followId)
            })

            console.log('currentFollows', currentFollows);


            let visited = new Set();

            while (queue.length > 0) {
                let path = queue.shift();
                console.log({ path });

                let id = path[path.length - 1];

                if (!visited.has(id)) {
                    visited.add(id);
                    // console.log({ visited });
                    if (path.length > degrees + 1) break;

                    // if (path.length > currentFollows.size + 1) recommended.push(id);
                    if (!currentFollows.has(id) && user?.id !== id && path.length > 1) {
                        recommended.push(id);
                        recommendedUsers.push(users.find(user => user?.id === id))
                    }


                    // console.log('recommended', { recommended });

                    for (let follow of follows.filter(follow => follow.userId === id)) {
                        let pathCopy = [...path];
                        if (!visited.has(follow?.followId)) pathCopy.push(follow?.followId);
                        queue.push(pathCopy);
                    }
                }
            }
            console.log('recommended users', recommendedUsers)
            setFinalRecommendedUsers([...recommendedUsers])
            // return recommended;
        }


        getRecommendedFollows(2)
    }, [dispatch])

    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
          console.log('users', users)
        }
        fetchData();
      }, []);






    //  const createFollow = (follow) => (e) => {
    //     e.preventDefault()
    //     const payload = {
    //         userId : user?.id,
    //         followId : follow?.id
    //     }
    //     dispatch(createOneFollow(payload))
    //     setIsFollowed(true)
    // }


    return (
        <div className="recommended-users-container">
            {finalRecommendedUsers.map(user => (
                // <div className="recommended-user-card">
                //     <div className="recommended-username">{user?.username}</div>
                //     <div className="recommended-follow-div">
                //         {isFollowed
                //         ?
                //         <div>check</div>
                //         :
                //         <button onClick={createFollow(user)} className="follow-button">Follow</button>}
                //     </div>
                // </div>
                <BFSFollow follow={user}/>
            ))}
        </div>
    )
}

export default BFS
