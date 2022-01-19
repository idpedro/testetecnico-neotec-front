import Img from "next/image";

import styles from "./styles.module.scss";
import { DataList } from "../../DataList";
import magnifierIcon from "../../../../public/magnifier.png";

import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDebounce } from "../../../hooks/useDebounce";

interface SearchProps {
  getAutocompleteOptions: (value: string) => Promise<string[]>;
  searchCallback: (value: string) => any;
}

export function Search({
  getAutocompleteOptions,
  searchCallback,
}: SearchProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [autocompleteList, setAutocompleteList] = useState<string[]>([]);
  const seachSong = useDebounce(inputValue, 500);

  const handlerSelectSong = useCallback(
    (autocompleteSelected: string) => {
      return () => {
        setInputValue(autocompleteSelected);
        setAutocompleteList([]);
        searchCallback(inputValue);
      };
    },
    [inputValue, searchCallback]
  );

  const submitSearch = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setAutocompleteList([]);
        searchCallback(inputValue);
      }
    },
    [inputValue, searchCallback]
  );
  useEffect(() => {
    if (seachSong) {
      getAutocompleteOptions(seachSong as string).then((options) =>
        setAutocompleteList(options)
      );
    } else setAutocompleteList([]);
  }, [getAutocompleteOptions, seachSong, setAutocompleteList]);

  const handlerInputchage = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <div className={styles.inputGroup}>
        <i>
          <Img src={magnifierIcon} alt="lupa" layout="responsive" />
        </i>
        <input
          type="text"
          value={inputValue}
          onChange={handlerInputchage}
          onKeyDown={submitSearch}
        />
      </div>
      <DataList list={autocompleteList} onSelected={handlerSelectSong} />
    </div>
  );
}
