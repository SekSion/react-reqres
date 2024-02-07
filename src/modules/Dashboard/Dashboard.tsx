import { useEffect, useState } from "react";
import { useAuth } from "../../services/Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { listUsers, updateUser } from "../../services/users";
import { IUsers } from "../../models/IUsers";
import Modal from "../../components/Modal";
import * as Create from "./Create/Create";
import * as Edit from "./Edit/Edit";
import * as Delete from "./Delete/Delete";

function Dashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUsers[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState<IUsers | null>(null); // State to track the selected user
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<"create" | "edit" | "delete">("create"); // State to track modal action

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
    getUsers(currentPage);
  }, []);

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const getUsers = async (page?: number) => {
    try {
      const res = await listUsers(page);
      setUsers(res.data);
      setTotalPages(res.total_pages);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };

  const handleUserSelect = (user: IUsers) => {
    if (user.id == selectedUser?.id) {
      setSelectedUser(null);
      return;
    }
    setSelectedUser(user);
  };

  const handleCreateBtn = () => {
    // Handle edit action here
    setModalAction("create");
    setShowModal(true);
  };

  const handleEditBtn = () => {
    // Handle edit action here
    setModalAction("edit");
    setShowModal(true);
  };

  const handleDeleteBtn = () => {
    // Handle delete action here
    setModalAction("delete");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Logic to handle closing the modal
    setShowModal(false);
  };

  const handleSaveModal = (u: IUsers) => {
    switch (modalAction) {
      case "create":
      case "edit":
        if (u && u.id) {
          updateUser(u.id, u).then((res) => {
            setUsers((prevUsers) => prevUsers.map((user) => (user.id === res.id ? (res as IUsers) : user)));
          });
        }
        break;
      case "delete":
    }
  };
  return (
    <>
      <div className="min-h-[calc(100vh-60px)] flex bg-gray-100 dark:bg-gray-800 overflow-hidden flex-col items-center">
        <div className="w-full flex items-end justify-end pr-5 pt-5">
          <button className="p-2 ml-4 min-w-[90px] bg-blue-600 dark:bg-blue-gray-900 text-white rounded-md" onClick={handleCreateBtn}>
            Create
          </button>

          <button
            className={`p-2 ml-4 min-w-[90px] bg-blue-600 dark:bg-blue-gray-900 text-white rounded-md ${
              selectedUser ? "" : "opacity-50 pointer-events-none"
            }`}
            onClick={handleEditBtn}
            disabled={!selectedUser}
          >
            Edit
          </button>

          <button
            className={`p-2 ml-4 min-w-[90px] bg-blue-600 dark:bg-blue-gray-900 text-white rounded-md ${
              selectedUser ? "" : "opacity-50 pointer-events-none"
            }`}
            onClick={handleDeleteBtn}
            disabled={!selectedUser}
          >
            Delete
          </button>
        </div>
        <div className="flex flex-col w-full">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light dark:text-white text-black">
                  <thead className="border-b font-medium border-black dark:border-white">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Avatar
                      </th>
                      <th scope="col" className="px-6 py-4">
                        First Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Last Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`hover:bg-gray-500 cursor-pointer border-b transition duration-300 ease-in-out hover:bg-neutral-100 border-black dark:border-white dark:hover:bg-neutral-600 ${
                          selectedUser?.id === user.id ? "bg-blue-200" : ""
                        }`}
                        onClick={() => handleUserSelect(user)}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{user.id}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <img className="max-w-[60px] rounded-full" src={user.avatar} />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">{user.first_name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{user.last_name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="list-style-none flex">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-500 hover:bg-neutral-100 dark:text-white dark:hover:text-blue-600  hover:text-blue-600 ${
                  currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages).keys()].map((page) => (
              <li key={page + 1}>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className={`relative block font-bold rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-500 hover:bg-neutral-100 dark:text-white dark:hover:text-blue-600 hover:text-blue-600 ${
                    currentPage === page + 1 ? "font-bold text-blue-600 dark:text-blue-600" : ""
                  }`}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-500 hover:bg-neutral-100 dark:text-white dark:hover:text-blue-600 hover:text-blue-600 ${
                  currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          modalHeaderContent={
            modalAction == "create" ? (
              <Create.Header onClose={handleCloseModal}></Create.Header>
            ) : modalAction == "edit" ? (
              <Edit.Header user={selectedUser} onClose={handleCloseModal}></Edit.Header>
            ) : modalAction == "delete" ? (
              <Delete.Header onClose={handleCloseModal}></Delete.Header>
            ) : (
              <></>
            )
          }
          modalBodyContent={
            modalAction == "create" ? (
              <Create.Body></Create.Body>
            ) : modalAction == "edit" ? (
              <Edit.Body user={selectedUser}></Edit.Body>
            ) : modalAction == "delete" ? (
              <Delete.Body></Delete.Body>
            ) : (
              <></>
            )
          }
          modalFooterContent={
            modalAction == "create" ? (
              <Create.Footer onClose={handleCloseModal} onSave={handleSaveModal}></Create.Footer>
            ) : modalAction == "edit" ? (
              <Edit.Footer onClose={handleCloseModal} saveUser={handleSaveModal}></Edit.Footer>
            ) : modalAction == "delete" ? (
              <Delete.Footer onClose={handleCloseModal}></Delete.Footer>
            ) : (
              <></>
            )
          }
        />
      </div>
    </>
  );
}

export default Dashboard;
