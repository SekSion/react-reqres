import { TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter, TERipple, TEInput } from 'tw-elements-react';
import { IUsers } from '../../../models/IUsers';
import { useEffect, useState } from 'react';
import { createUser, updateUser } from '../../../services/users';
import toast from 'react-hot-toast';

interface CreateEditModalProps {
  setShowModal: (bool: boolean) => void;
  showModal: boolean;
  listUsers: IUsers[];
  setUsers: (users: IUsers[]) => void;
  initialUser?: IUsers | null; // New prop for initial user data when editing
}

export default function CreateEditModal(props: CreateEditModalProps): JSX.Element {
  const [saving, setSaving] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<IUsers>({ first_name: '', last_name: '', email: '' });
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({
    first_name: false,
    last_name: false,
    email: false,
  });

  useEffect(() => {
    if (props.initialUser) {
      setNewUser(props.initialUser); // Use initial user data when editing
    } else {
      setNewUser({ first_name: '', last_name: '', email: '' });
    }
    setTouchedFields({
      first_name: false,
      last_name: false,
      email: false,
    });
  }, [props.showModal, props.initialUser]);

  useEffect(() => {
    setFormValid(!!newUser.first_name && !!newUser.last_name && !!newUser.email && validEmail);
  }, [newUser, validEmail]);

  const handleInputChange = (field: string, value: string) => {
    setTouchedFields({ ...touchedFields, [field]: true });
    setNewUser({ ...newUser, [field]: value });

    if (field === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidEmail(emailPattern.test(value));
    }
  };

  const saveUser = () => {
    setSaving(true);
    setTimeout(() => {
      if (props.initialUser && newUser && newUser.id) {
        // Update existing user
        updateUser(newUser.id, newUser)
          .then(
            () => {
              toast.success(`User ${newUser && `${newUser.first_name} ${newUser.last_name}`} updated successfully.`);
              const updatedUsers = props.listUsers.map((user) => (user.id === newUser.id ? newUser : user));
              props.setUsers(updatedUsers);
            },
            () => {},
          )
          .finally(() => {
            setSaving(false);
            props.setShowModal(false);
          });
      } else {
        // Create new user
        createUser(newUser)
          .then(
            (createdUser: IUsers) => {
              toast.success(`User ${createdUser && `${createdUser.first_name} ${createdUser.last_name}`} created successfully.`);
              createdUser.avatar = 'https://reqres.in/img/faces/6-image.jpg';
              props.setUsers([...props.listUsers, createdUser]);
            },
            () => {},
          )
          .finally(() => {
            setSaving(false);
            props.setShowModal(false);
          });
      }
    }, 2000);
  };

  return (
    <TEModal staticBackdrop show={props.showModal} setShow={props.setShowModal}>
      <TEModalDialog centered>
        <TEModalContent className="max-w-lg dark:bg-gray-800 dark:text-white">
          <TEModalHeader>
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">{props.initialUser ? 'Edit' : 'Create'} Modal</h5>
          </TEModalHeader>
          <TEModalBody className="mt-4 mb-4">
            <div className="space-y-4">
              <TEInput
                type="text"
                id="first_name"
                label="First Name"
                value={newUser.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
              >
                {touchedFields.first_name && !newUser.first_name && (
                  <div className="absolute w-full text-sm text-red-500 dark:text-red-500">First name is required</div>
                )}
              </TEInput>

              <TEInput
                className="mt-8"
                type="text"
                id="last_name"
                label="Last Name"
                value={newUser.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
              >
                {touchedFields.last_name && !newUser.last_name && (
                  <div className="absolute w-full text-sm text-red-500 dark:text-red-500">Last name is required</div>
                )}
              </TEInput>

              <TEInput
                className="mt-8"
                type="email"
                id="email"
                label="Email"
                value={newUser.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              >
                {touchedFields.email && !validEmail && <div className="absolute w-full text-sm text-red-500 dark:text-red-500">Invalid email format</div>}
              </TEInput>
            </div>
          </TEModalBody>
          <TEModalFooter>
            <TERipple rippleColor="light">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                onClick={() => props.setShowModal(false)}
              >
                Close
              </button>
            </TERipple>
            <TERipple rippleColor="light">
              <button
                type="button"
                className={` save-modal-btn ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out ${
                  formValid ? 'hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700' : 'cursor-not-allowed bg-opacity-50'
                }`}
                onClick={saveUser}
                disabled={!formValid || saving}
              >
                {saving ? (
                  <>
                    <div
                      className=" inline-block h-3 w-3 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></div>
                  </>
                ) : (
                  <>{props.initialUser ? 'Save' : 'Create'}</>
                )}
              </button>
            </TERipple>
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}
