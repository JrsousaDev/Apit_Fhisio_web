import { 
  Button, Modal, ModalBody, ModalCloseButton, 
  ModalContent, ModalFooter, ModalHeader, ModalOverlay, 
  useDisclosure } from "@chakra-ui/react";

import React, { useState } from "react";

interface IModalConfirmProps {
  patientName?: string;
  OpenModal: boolean;
  toggleModal: () => void;
  functionAction: any;
}

const ModalConfirm = (props: IModalConfirmProps) => {
  
  return (
    <>
      <Modal
        isCentered
        onClose={props.toggleModal}
        isOpen={props.OpenModal}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir Paciente</ModalHeader>
          <hr />
          <ModalCloseButton />
          <ModalBody>
            Você tem certeza que deseja excluir o paciente: <br /> <strong>{props.patientName}</strong>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={props.functionAction}>
              Confirmar
            </Button>
            <Button colorScheme='gray' onClick={props.toggleModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalConfirm;
