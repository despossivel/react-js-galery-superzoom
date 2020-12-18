import React, {memo, useCallback, useState} from 'react';
import Modal from 'react-modal';
import customStyles from './styles';

Modal.setAppElement('body')

const ModalSuperzoom = ({  isOpen, setView, children }) => {
    const closeModal =  useCallback(() => setView(false),[]);
    
      return <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >{children}</Modal>;
}

export default memo(ModalSuperzoom);