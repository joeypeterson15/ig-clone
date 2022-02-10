import { getAllFollows } from '../../store/allFollows';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { getFollows } from '../../store/follow';
import { createOneFollow } from '../../store/follow';
import BFSFollow from '../BFSFollow';
import { Modal } from '../../context/Modal';
import { logout } from '../../store/session';
import * as sessionActions from '../../store/session'



import './BFS.css'



function BFS ({ follows, posts }) {


    const user = useSelector((state) => state.session?.user)
    const [showModal, setShowModal] = useState(false)

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
            let visited = new Set();

            while (queue.length > 0) {
                let path = queue.shift();
                console.log({ path });

                let id = path[path.length - 1];

                if (!visited.has(id)) {
                    visited.add(id);
                    // console.log({ visited });
                    if (path.length > degrees + 1) break;

                    if (!currentFollows.has(id) && user?.id !== id && path.length > 1) {
                        recommended.push(id);
                        let newUser =users.find(user => user?.id === id)
                        recommendedUsers.push(newUser)
                    }

                    for (let follow of follows.filter(follow => follow.userId === id)) {
                        let pathCopy = [...path];
                        if (!visited.has(follow?.followId)) pathCopy.push(follow?.followId);
                        queue.push(pathCopy);
                    }
                }
            }
            setFinalRecommendedUsers([...recommendedUsers])
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

      const onLogout = async (e) => {
        await dispatch(logout());
      };

      const switchToMarnie = async (e) => {
          await dispatch(logout())
          dispatch(
            sessionActions.login("marnie@aa.io", "password"),
          )
      }
      const switchToDemo = async (e) => {
          await dispatch(logout())
          dispatch(
            sessionActions.login("demo@aa.io", "password"),
          )
      }






    return (
        <>
        <div className="switch-account-container">
            <div className="rec-avatar-username">
                <img className="avatar-switch" alt="" src={user?.avatar}></img>
                <div className="username-switch">{user?.username}</div>
            </div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div className="switch-modal-container">

                    <div id="switch-accounts-div">
                        {user?.username !== "Demo" ?

                            <button onClick={switchToDemo} id="demo-1-switch">Demo 1</button> : ""

                        }
                        <div>
                            Switch Accounts
                        </div>

                        {user?.username !== "marnie" ?

                            <button onClick={switchToMarnie} id="demo-2-switch">Demo 2</button> : ""

                        }
                    </div>

                    <div>


                        <div className="switch-current-user-div">

                            <div className="switch-modal-name-plus-avatar">
                                <img className="avatar-switch" src={user?.avatar}></img>
                                <div className="username-switch">{user?.username}</div>
                            </div>
                            <div className="circle-with-checkmark-switch">
                                <i class="check-switch fas fa-check"></i>
                            </div>
                        </div>

                        <div className="switch-demo-login-buttons">





                        </div>


                    </div>

                    <button onClick={onLogout} id="existing-account-login-button">Login to an Existing Account</button>
                </div>
            </Modal>
          )}

            <button onClick={() => setShowModal(true)} className="switch">Switch</button>
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
