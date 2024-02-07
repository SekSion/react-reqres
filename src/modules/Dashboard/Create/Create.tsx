import React from "react";
import { TEInput } from "tw-elements-react";

interface HeaderProps {
  onClose: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClose }) => (
  <div className="flex justify-between items-center">
    <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">Create User</h5>
  </div>
);

export const Body: React.FC = () => (
  <div>
    <TEInput type="text" id="exampleFormControlInput1" label="Name"></TEInput>

    <TEInput type="text" id="exampleFormControlInput1" className="mt-4" label="Job"></TEInput>
  </div>
);

interface FooterProps {
  onClose: () => void;
  onSave: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onClose, onSave }) => (
  <div className="flex justify-end mt-4">
    <button
      type="button"
      className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
      onClick={onClose}
    >
      Close
    </button>
    <button
      type="button"
      className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      onClick={onSave}
    >
      Save changes
    </button>
  </div>
);
