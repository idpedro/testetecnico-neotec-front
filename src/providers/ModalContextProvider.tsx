import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Modal } from "../components/Modal";

interface ModalContextProps {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  setModalContent: (content: React.ReactElement) => void;
}

const ModalContext = createContext({} as ModalContextProps);

interface ModalProviderProps {
  children: React.ReactNode;
  isInitialOpen?: boolean;
}

export const ModalProvider = ({
  children,
  isInitialOpen,
}: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(isInitialOpen ?? false);
  const [content, setContent] = useState<ReactNode>();

  const setModalContent = useCallback((content) => {
    setContent(content);
  }, []);
  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, open, close, setModalContent }}>
      <Modal content={content} />
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const { close, isOpen, open, setModalContent } = useContext(ModalContext);
  return { close, isOpen, open, setModalContent };
};
