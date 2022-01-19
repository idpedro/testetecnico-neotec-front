import { useSongsApi } from "../../../providers/SongProvider";
import Img from "next/image";
import LoaderGif from "../../../../public/loader.gif";
import styles from "./styles.module.scss";
interface LoaderMoreButtonProps {
  children: React.ReactNode;
}
export function LoaderMoreButton() {
  const { loadMore, requestIsDone } = useSongsApi();
  return requestIsDone ? (
    <button className={styles.button} onClick={loadMore}>
      {"Carregar Mais"}
    </button>
  ) : (
    <Img src={LoaderGif} />
  );
}
