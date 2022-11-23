import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.auth.login.user);
  return (
    <div>
      <h1>Profile Page</h1>
      <ul>
        <li>
          <b>Email:</b> {user.email}
        </li>
        <li>
          <b>First Name:</b> {user.firstName}
        </li>
        <li>
          <b>Last Name:</b> {user.lastName}
        </li>
        <li>
          <b>Address:</b> {user.address}
        </li>
        <li>
          <b>Phone Number:</b> {user.phoneNumber}
        </li>
        <li>
          <b>Roles:</b> {user.roles.toString()}
        </li>
      </ul>
    </div>
  );
};

export default Profile;
