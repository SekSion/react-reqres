import React, { useState } from "react";
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter } from "tw-elements-react";

interface CreateProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalHeaderContent: JSX.Element;
  modalBodyContent: JSX.Element;
  modalFooterContent: JSX.Element;
}

export default function Modal({
  showModal,
  setShowModal,
  modalHeaderContent,
  modalBodyContent,
  modalFooterContent,
}: CreateProps): JSX.Element {
  return (
    <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
      <TEModalDialog centered>
        <TEModalContent className="max-w-lg dark:bg-gray-800 dark:text-white">
          <TEModalHeader>{modalHeaderContent}</TEModalHeader>
          <TEModalBody>{modalBodyContent}</TEModalBody>
          <TEModalFooter>{modalFooterContent}</TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}
