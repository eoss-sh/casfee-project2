import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { functions } from "../../config/firebase";
import { fetchAllUsers } from "./allUserSlice";
import { deleteUser } from "../Auth/authSlice";
import { Table, Button } from "react-bootstrap";
import { BsTrash, BsBricks } from "react-icons/bs";

const AllUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useAppSelector((state) => state.allUser.users);
  const addAdminRole = functions.httpsCallable("addAdminRole");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="container">
      <section className="alluser-list">
        <h1 className="alluser-list__titel">Alle User der App</h1>
        <Table striped hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>HCP</th>
              <th>Make Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.hcp}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={async () => {
                        return await addAdminRole({
                          email: user.email,
                        });
                      }}
                    >
                      <BsBricks />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => dispatch(deleteUser(user.id))}
                    >
                      <BsTrash />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </section>
    </div>
  );
};

export default AllUsers;
