import React, { useEffect, useState } from "react";
import { TEInput } from "tw-elements-react";
import { IUsers } from "../../../models/IUsers";
import toast from "react-hot-toast";

// Define the global state variable for the edited user
let globalEditedUser: IUsers | null = null;

interface HeaderProps {
  onClose: () => void;
  user: IUsers | null;
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => (
  <div className="flex justify-between items-center">
    <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
      Edit {props && props.user && props.user.first_name} {props && props.user && props.user.last_name}
    </h5>
  </div>
);

interface BodyProps {
  user: IUsers | null;
}

export const Body: React.FC<BodyProps> = ({ user }) => {
  // Initialize state for the edited user data
  const [editedUser, setEditedUser] = useState<IUsers | null>(user);

  // Update editedUser state when user prop changes
  useEffect(() => {
    setEditedUser(user);
    // Update the globalEditedUser when user prop changes
    globalEditedUser = user;
  }, [user]);

  // Handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the edited user data state
    setEditedUser((prevUser) => ({
      ...(prevUser as IUsers),
      [name]: value,
    }));
    // Update the globalEditedUser
    if (globalEditedUser) {
      globalEditedUser = { ...globalEditedUser, [name]: value };
    }
  };

  // Array of input fields
  const inputFields = [
    { id: "first_name", name: "first_name", label: "First Name" },
    { id: "last_name", name: "last_name", label: "Last Name" },
    { id: "email_name", name: "email", label: "Email" },
  ];

  return (
    <div>
      {inputFields.map((field) => (
        <TEInput
          key={field.id}
          type="text"
          id={field.id}
          name={field.name}
          label={field.label}
          value={editedUser ? editedUser[field.name as keyof IUsers] || "" : ""}
          className={field.id !== "first_name" ? "mt-4" : ""}
          onChange={handleInputChange}
        />
      ))}
    </div>
  );
};

interface FooterProps {
  onClose: () => void;
  saveUser: (editedUser: IUsers) => void;
}

export const Footer: React.FC<FooterProps> = ({ onClose, saveUser }) => {
  const [saving, setSaving] = useState<boolean>(false);
  // Function to handle saving changes
  const handleSaveChanges = () => {
    // Perform action with globalEditedUser, such as sending it to the parent component
    setSaving(true);
    setTimeout(() => {
      if (globalEditedUser) {
        saveUser(globalEditedUser);
        onClose();
        setSaving(false);
        toast.success("Edited Success");
      }
    }, 2000);
  };

  return (
    <div className="flex justify-end mt-4">
      <button
        type="button"
        className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
        onClick={onClose} // Call onClose when the button is clicked
      >
        Close
      </button>
      <button
        type="button"
        disabled={saving}
        className="ml-1 inline-block rounded min-w-[100px] disabled:opacity-50 disabled:pointer-events-none bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        onClick={handleSaveChanges}
      >
        {saving ? (
          <>
            <div
              className="inline-block h-3 w-3 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </>
        ) : (
          <>Save Changes</>
        )}
      </button>
    </div>
  );
};
