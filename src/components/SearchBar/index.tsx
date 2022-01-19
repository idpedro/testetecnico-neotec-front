import { useCallback } from "react";
import styles from "./styles.module.scss";
import { Search } from "./Search";
import { useSongsApi } from "../../providers/SongProvider";

type SongEntity = {
  nome: string;
  ano: number;
  descricao: string;
  created?: Date;
  updaded?: Date;
};

export const SeachBar = () => {
  const { getSongNames, getByName } = useSongsApi();

  return (
    <nav className={styles.navbar}>
      <Search
        getAutocompleteOptions={getSongNames}
        searchCallback={getByName}
      />
    </nav>
  );
};
