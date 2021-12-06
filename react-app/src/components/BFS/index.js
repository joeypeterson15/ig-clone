import { getAllFollows } from '../../store/allFollows';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import './BFS.css'



function BFS () {

    const user = useSelector((state) => state.session?.user)
    const follows = useSelector((state) => Object.values(state.allFollows))
    const [users, setUsers] = useState([]);
    const [finalRecommendedUsers, setFinalRecommendedUsers] = useState([])
    console.log('all follows', follows)
    let recommendedUsers = []


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllFollows())
        getRecommendedFollows(user?.id, 2)
    }, [dispatch, user])

    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
          console.log('users', users)
        }
        fetchData();
      }, []);

   function getRecommendedFollows(userID, degrees) {
        let queue = [[userID]];

        let recommended = [];

        // let arrayFollows = follows.filter(follow => follow.userId === user?.id)


        // let currentFollows = {}
        // arrayFollows.forEach(follow => currentFollows[follow.followId] = follow)
        // console.log('cureentFollows', currentFollows);


        let currentFollows = new Set ()

        follows.forEach(follow => {
            if (follow.userId === user?.id)
            currentFollows.add(follow?.followId)
        })

        console.log('cureentFollows', currentFollows);


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



                // if (path.length > degrees + Object.keys(currentFollows).length + 1) break;

                // // if (path.length > currentFollows.size + 1) recommended.push(id);
                // if (!currentFollows[id] && user?.id !== id && path.length > currentFollows.size + 1) {
                //     recommended.push(id);
                // }



                console.log('recommended', { recommended });

                for (let follow of follows.filter(follow => follow.userId === id)) {
                    let pathCopy = [...path];
                    if (!visited.has(follow?.followId)) pathCopy.push(follow?.followId);
                    queue.push(pathCopy);
                }
            }
        }
        console.log('recommended users', recommendedUsers)
        setFinalRecommendedUsers(recommendedUsers)
        return recommended;
    }


    return (
        <div className="recommended-users-container">
            {finalRecommendedUsers.map(user => (
                <div className="recommended-user">{user?.username}</div>
            ))}
        </div>
    )
}

export default BFS
