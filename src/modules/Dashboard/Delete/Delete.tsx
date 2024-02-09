import { TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter, TERipple } from 'tw-elements-react';
import { IUsers } from '../../../models/IUsers';
import { useState } from 'react';
import { deleteUser } from '../../../services/users';
import toast from 'react-hot-toast';

interface DeleteModalProps {
  setShowModal: (bool: boolean) => void;
  showModal: boolean;
  user: IUsers | null;
  listUsers: IUsers[];
  setUsers: (users: IUsers[]) => void;
}

export default function DeleteModal(props: DeleteModalProps): JSX.Element {
  const [saving, setSaving] = useState<boolean>(false);

  const deleteUserBtn = () => {
    setSaving(true);
    setTimeout(() => {
      if (!props.user?.id) {
        toast.error('No User Selected Found.');
        return;
      }
      deleteUser(props.user?.id)
        .then(
          () => {
            toast.success(`User ${props.user && `${props.user.first_name} ${props.user.last_name}`}`);
            const updatedUsers = props.listUsers.filter((user) => user.id !== props.user?.id);
            props.setUsers(updatedUsers);
          },
          () => {},
        )
        .finally(() => {
          setSaving(false);
          props.setShowModal(false);
        });
    }, 2000);
  };
  return (
    <TEModal staticBackdrop show={props.showModal} setShow={props.setShowModal}>
      <TEModalDialog centered>
        <TEModalContent className="max-w-lg dark:bg-gray-800 dark:text-white">
          <TEModalHeader>
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">Delete Modal</h5>
          </TEModalHeader>
          {/* <!--Modal body--> */}
          <TEModalBody>Are you sure you want to delete {props.user && `${props.user.first_name} ${props.user.last_name}`}?</TEModalBody>
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
                className="delete-modal-btn ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={deleteUserBtn}
              >
                {saving ? (
                  <>
                    <div
                      className="inline-block h-3 w-3 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></div>
                  </>
                ) : (
                  <>Confirm</>
                )}
              </button>
            </TERipple>
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}
