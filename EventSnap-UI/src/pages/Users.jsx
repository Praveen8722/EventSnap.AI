import { useEffect, useState } from 'react';
import getUsers from '../services/eventService';

function Users() {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getUsers()
            .then((response) => {
                setUserList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    return (
        <>
       <h1>Users</h1>
      <ul>
        {userList.map((user, index) => (
         <>
          <li key={index}>{user.name}</li>
           <li key={index}>{user.username}</li>
         </>
        ))}
      </ul>
        </>
    )

}
export default Users;