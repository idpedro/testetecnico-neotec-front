import { useModal } from "../../providers/ModalContextProvider";
import Img from "next/image";
import crossIcon from "../../../public/cross.png";
import styles from "./styles.module.scss";

type ModalProps = {
  content?: React.ReactNode;
};
export const Modal = ({ content }: ModalProps) => {
  const { isOpen, close } = useModal();
  if (isOpen)
    return (
      <div className={styles.modalWrapper}>
        <div>
          <button onClick={close}>
            <Img src={crossIcon} />
          </button>
          <section>{content}</section>
        </div>
      </div>
    );
  return <></>;
};
