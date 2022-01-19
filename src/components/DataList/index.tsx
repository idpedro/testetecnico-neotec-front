import { MouseEvent } from "react";
import styles from "./styles.module.scss";

type DataListProps<T> = {
  list?: string[];
  onSelected: (item: string) => (event: MouseEvent<HTMLButtonElement>) => any;
};
export function DataList<T>({ list, onSelected }: DataListProps<T>) {
  if (!list || list.length < 1) return <></>;

  return (
    <div className={styles.datalist}>
      <ul>
        {list.map((item, index) => {
          return (
            <li key={`dataset__${index}`}>
              <button onClick={onSelected(item)}>{item}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
