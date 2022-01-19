import { createContext, useCallback, useContext, useState } from "react";
import { API_CONTANTS } from "../hooks/URL";

type Song = {
  id: number;
  nome: string;
  descricao: string;
  ano: number;
};

interface SongContextProps {
  songList: Song[];
  getByName: (name: string) => void;
  getSongNames: (name: string) => Promise<string[]>;
  getById: (id: number) => Promise<Song | undefined>;
  loadMore: () => void;
  canLoadMore: boolean;
  requestIsDone: boolean;
}

type ApiResponse = {
  songsList: Song[];
  nextPage: Number;
};

const SongContext = createContext({} as SongContextProps);

interface SongContextProvider {
  children: React.ReactNode;
}
export const SongContextProvider = ({ children }: SongContextProvider) => {
  const [page, setPage] = useState(1);
  const [requestIsDone, setRequestIsDone] = useState(true);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [songList, setSongList] = useState<Song[]>([]);

  const base_url = `${API_CONTANTS.BASE_URL}/musicas`;

  const getAPIData = useCallback(async (url: string) => {
    setRequestIsDone(false);
    const response = await fetch(url, {
      method: "get",
    });
    return response
      .json()
      .then((data) => {
        setRequestIsDone(true);
        return data;
      })
      .catch((error) => {
        setRequestIsDone(true);
        console.log(error);
        return {};
      });
  }, []);

  const getByName = useCallback(
    async (name: string) => {
      try {
        const { songsList, nextPage } = (await getAPIData(
          `${base_url}${name ? `/autocomplete/${name}` : ""}`
        )) as ApiResponse;
        setSongList(songsList as Song[]);
        setCanLoadMore(nextPage > 0);
        setPage(1);
      } catch (error) {
        setSongList([]);
        setCanLoadMore(false);
        setPage(1);
      }
    },
    [base_url, getAPIData]
  );

  const getById = useCallback(
    async (id: number) => {
      try {
        const songs = (await getAPIData(`${base_url}/${id}`)) as Song;
        return songs;
      } catch (error) {
        return;
      }
    },
    [base_url, getAPIData]
  );

  const getSongNames = useCallback(
    async (name: string) => {
      try {
        const data = (await getAPIData(
          `${base_url}/autocomplete/${name}`
        )) as ApiResponse;
        const { songsList, nextPage } = data;
        setCanLoadMore(nextPage > 0);
        return (songsList as Song[]).reduce(
          (nameList, song) => [...nameList, song.nome],
          [] as string[]
        );
      } catch (error) {
        return [];
      }
    },
    [base_url, getAPIData]
  );

  const loadMore = useCallback(async () => {
    try {
      const response = (await getAPIData(
        `${base_url}/?page=${page + 1}`
      )) as ApiResponse;
      const { nextPage, songsList } = response;
      setCanLoadMore(nextPage > 0);
      setSongList((oldList) => [...oldList, ...songsList]);
      setPage((oldPage) => oldPage + 1);
    } catch (error) {
      console.log(error);
    }
  }, [base_url, getAPIData, page]);

  return (
    <SongContext.Provider
      value={{
        songList,
        getByName,
        getSongNames,
        getById,
        loadMore,
        canLoadMore,
        requestIsDone,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongsApi = () => {
  const {
    getByName,
    getSongNames,
    songList,
    getById,
    canLoadMore,
    loadMore,
    requestIsDone,
  } = useContext(SongContext);
  return {
    getByName,
    getSongNames,
    songList,
    getById,
    canLoadMore,
    loadMore,
    requestIsDone,
  };
};
