import { useState } from 'react';

const useModal = (defaultOpen: boolean = false) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return { isOpen, openModal, closeModal };
};

export default useModal;
