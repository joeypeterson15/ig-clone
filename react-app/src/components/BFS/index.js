import { getAllFollows } from '../../store/allFollows';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { getFollows } from '../../store/follow';
import { createOneFollow } from '../../store/follow';
import BFSFollow from '../BFSFollow';

import './BFS.css'



function BFS ({ follows, posts }) {


    const user = useSelector((state) => state.session?.user)

    // const follows = useSelector((state) => Object.values(state.allFollows))
    const [users, setUsers] = useState([]);
    const [finalRecommendedUsers, setFinalRecommendedUsers] = useState([])
    console.log('all follows', follows)
    let recommendedUsers = []


    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getAllFollows())
    // }, [dispatch, user])

    useEffect(() => {


        const getRecommendedFollows = async (degrees) => {
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
                        let newUser =users.find(user => user?.id === id)
                        recommendedUsers.push(newUser)
                        // setFinalRecommendedUsers(oldArray => [...oldArray, newUser])
                    }


                    // console.log('recommended', { recommended });

                    for (let follow of follows.filter(follow => follow.userId === id)) {
                        let pathCopy = [...path];
                        if (!visited.has(follow?.followId)) pathCopy.push(follow?.followId);
                        queue.push(pathCopy);
                    }
                }
            }
            console.log('recommended users', finalRecommendedUsers)
            setFinalRecommendedUsers([...recommendedUsers])
            // return recommended;
        }


        getRecommendedFollows(2)

        // return (
        //     setFinalRecommendedUsers([])
        // )
    }, [user, posts])

    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
          console.log('users', users)
        }
        fetchData();
      }, []);



    return (
        <>
        <div className="switch-account-container">
            <div className="rec-avatar-username">
                <img className="avatar-switch" alt="" src={user?.avatar}></img>
                <div className="username-switch">{user?.username}</div>
            </div>

            <button className="switch">Switch</button>
        </div>
        <div id="suggestions-heading">Suggestions For You</div>
        <div className="recommended-users-container">
            {finalRecommendedUsers.map(user => (
                <BFSFollow follow={user}/>
            ))}
        </div>

        </>
    )
}

export default BFS
