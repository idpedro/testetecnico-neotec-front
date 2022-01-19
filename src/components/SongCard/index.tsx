import { useCallback } from "react";
import { API_CONTANTS } from "../../hooks/URL";
import { useModal } from "../../providers/ModalContextProvider";
import { useSongsApi } from "../../providers/SongProvider";
import { Song } from "../Song";
import styles from "./styles.module.scss";

type SongEntity = {
  id: number;
  nome: string;
  ano: number;
  descricao: string;
};

interface SongProps {
  songInfo: SongEntity;
}

export const SongCard = ({ songInfo }: SongProps) => {
  const { open, setModalContent } = useModal();
  const { getById } = useSongsApi();

  const handlerOpenModal = useCallback(async () => {
    const song = await getById(songInfo?.id);
    if (song) {
      setModalContent(<Song songInfo={song} />);
      open();
    }
  }, [getById, open, setModalContent, songInfo]);

  return (
    <div className={styles.card} onClick={handlerOpenModal}>
      <div>
        <picture>
          <img
            src={`${API_CONTANTS.STATIC_FILES_URL}/musicas/${songInfo.id}.jpeg`}
          />
        </picture>
        <h3>{songInfo.nome}</h3>
      </div>
      <span>{songInfo.ano}</span>
    </div>
  );
};
