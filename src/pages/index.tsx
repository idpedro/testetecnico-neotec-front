import type { NextPage } from "next";
import { Playlist } from "../components/Playlist";
import { SeachBar } from "../components/SearchBar";
import { ModalProvider } from "../providers/ModalContextProvider";
import { SongContextProvider } from "../providers/SongProvider";
import styles from "./Home.module.scss";

type SongEntity = {
  nome: string;
  ano: number;
  descricao: string;
  created?: Date;
  updaded?: Date;
};

const Home: NextPage = () => {
  return (
    <ModalProvider>
      <SongContextProvider>
        <SeachBar />
        <main className={styles.main}>
          <Playlist />
        </main>
      </SongContextProvider>
    </ModalProvider>
  );
};

export default Home;
