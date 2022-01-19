import styles from "./styles.module.scss";
import { API_CONTANTS } from "../../hooks/URL";
type SongEntity = {
  id: number;
  nome: string;
  ano: number;
  descricao: string;
};

interface SongProps {
  songInfo: SongEntity;
}

export const Song = ({ songInfo }: SongProps) => {
  return (
    <section className={styles.wrapper}>
      <picture className={styles.img__Wrapper}>
        <img
          src={`${API_CONTANTS.STATIC_FILES_URL}/musicas/${songInfo.id}.jpeg`}
        />
      </picture>
      <div>
        <h1>{songInfo.nome}</h1>
        <span>{songInfo.ano}</span>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit quos
          asperiores deserunt, debitis velit odio temporibus aut tempora soluta
          qui obcaecati consequatur aperiam nisi, delectus provident totam, rem
          error placeat.
        </p>
      </div>
    </section>
  );
};
