import styles from "./styles.module.scss";
import { SongCard } from "../SongCard";
import { useSongsApi } from "../../providers/SongProvider";
import { LoaderMoreButton } from "./LoaderMoreButton";

export const Playlist = () => {
  const { songList, canLoadMore } = useSongsApi();
  if (!songList || songList?.length < 1) return <></>;

  return (
    <>
      <div className={styles.wrapper}>
        <ul>
          {songList.map((song, index) => (
            <SongCard key={`song_${index}`} songInfo={song} />
          ))}
        </ul>
      </div>
      {canLoadMore ? <LoaderMoreButton /> : <></>}
    </>
  );
};
