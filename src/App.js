
import './App.css';
import CustomInput from './components/userInput';
import CustomButton from './components/userButton';
import ActionsButton from './components/actions';
import { useEffect, useState } from 'react';
import CustomEditInput from './components/userInputEdit';

function App() {
  const [userData, setUserData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [UpdateMode, setUpdateMode] = useState(false);
  const [editMode, setEditMode] = useState({});
  const [editedValues, setEditedValues] = useState({});

  const [newValue, setNewValue ] = useState("");
  const url = "http://localhost:8080/api/v1/user";

  async function getAllUser() {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("An error occurred while fetching user data:", error);
    }
  }


  const handleUpdateUser = async (userId) => {

    const updatedFirstName = editedValues[`${userId}_firstName`] || userData.find(user => user.id === userId).firstName;
    const updatedLastName = editedValues[`${userId}_lastName`] || userData.find(user => user.id === userId).lastName;

    const updatedUserData = {
      firstName: updatedFirstName,
      lastName: updatedLastName,
    };

    console.log(updatedUserData)

    try {
      const response = await fetch(url+`/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        setUpdateMode(false)
        console.log(`User ${userId} updated successfully.`);

        setEditMode((prevEditMode) => ({
          ...prevEditMode,
          [userId]: false,
        }));
        setEditedValues((prevEditedValues) => ({
          ...prevEditedValues,
          [`${userId}_firstName`]: "",
          [`${userId}_lastName`]: "",
        }));

        getAllUser();
      } else {
        console.error(`Failed to update user ${userId}.`);
      }
    } catch (error) {
      console.error(`An error occurred while updating user ${userId}.`, error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  async function handleAddUser() {
    try {
      if (firstName === "") {
        console.log("Empty Fields")
        return 0;
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      });

      if (response.ok) {
        console.log("User added successfully.");
        setFirstName("")
        setLastName("")
        getAllUser();
      } else {
        console.error("Failed to add user.");
      }
    } catch (error) {
      console.error("An error occurred while adding user:", error);
    }
  }

  async function handleDeleteUser(userId, index) {
    const deletedRow = document.getElementById(`userRow_${index}`);
    
    deletedRow.classList.add('fade-out');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    deletedRow.classList.remove('fade-out');
    
    try {
      const response = await fetch(url + `/${userId}`, {
        method: "DELETE",
      });
      
      if (response.ok) {

        console.log(`User ${userId} deleted successfully.`);
        
        const updatedUserDataWithoutDeleted = userData.filter(user => user.id !== userId);
        setUserData(updatedUserDataWithoutDeleted);
      } else {
        console.error(`Failed to delete user ${userId}.`);
      }
    } catch (error) {
      console.error(`An error occurred while deleting user ${userId}:`, error);
    }
  }
  


  const handleEditUser = (userId) => {
    setUpdateMode(true);
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [userId]: !prevEditMode[userId],
    }));
  };

  const handleInputChange = (event, userId, fieldName) => {
    const newValue = event.target.value;
    setNewValue(newValue);
    setEditedValues((prevEditedValues) => ({
      ...prevEditedValues,
      [`${userId}_${fieldName}`]: newValue,
    }));
  };



  return (
    <div className="App">
      <div className='myform'>
      <CustomInput name={"First Name"} setNewValue={setFirstName} value={firstName} />
      <CustomInput name={"Last Name"} setNewValue={setLastName} value={lastName} />

        <CustomButton name={"Add User"} onAddClick={handleAddUser} />
      </div>
      <table id="userdata">
        <caption>Existing Users</caption>
        <thead>
          <tr>
            <th className='number'>S No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th className='actions-col'>Actions</th>
          </tr>
        </thead>
        <tbody className='transition-anim'>
          {userData.map((user, index) => (
            <tr key={index}
              id={`userRow_${index}`}
              className='animate__animated '
              style={{padding: "10px 15px"}}
              >
                <td>{index + 1}</td>
              <td>
                {editMode[user.id] ? (
                  <CustomEditInput 
                  name={"First Name"}
                  defaultValue={user.firstName}
                  onChangeV={(event) => handleInputChange(event, user.id, "firstName")}
                  />
                  ) : (
                    user.firstName
                    )}
              </td>
              <td>
                {editMode[user.id] ? (
                  <CustomEditInput 
                  name={"Last Name"}
                  defaultValue={user.lastName}
                  onChangeV={(event) => handleInputChange(event, user.id, "lastName")}
                  />

                ) : (
                  user.lastName
                )}
              </td>
              <td>
                <ActionsButton
                    user={{
                      id: user.id,
                      editTrue: UpdateMode,
                    }}
                  onEditClick={() => handleEditUser(user.id)}
                  onUpdateClick={() => handleUpdateUser(user.id)}
                  onDeleteClick={() => handleDeleteUser(user.id, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;