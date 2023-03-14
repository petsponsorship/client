import { useRecoilState } from "recoil";
import { mainCardData } from "../../../store/MainCard";
import { SortfilterTagState } from "../../../store/sortTag";
import styles from "./Sort.module.css"

function Sort ({cards, setCards}) {
    const [originalData, setOriginalData] = useRecoilState(mainCardData)
    const [filterState, setFilterState] = useRecoilState(SortfilterTagState)

    const onlyadopt = (checked, item) => {
        if (checked) {
          const adoptfilter = [...cards].slice(0).filter((data) => data.adopt === 1);
          setCards(adoptfilter);
        } else if (!checked) {
          setCards(originalData);
        }
      };

      const imminentFilter = () => {
        const sort = [...cards].slice(0).sort((a, b) => {
          return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
        });
        setCards(sort);
        setFilterState('imminent');
      };

      const likeFilter = () => {
        const sort = [...cards].slice(0).sort((a, b) => {
          return b.sponsor - a.sponsor;
        });
        setCards(sort);
        setFilterState('like');
      };

      const newestFilter = () => {
        const sorted = [...cards].slice(0).sort((a, b) => {
          return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
        });
        setCards(sorted);
        setFilterState('newest');
      };


    return (
        <>
        <div>
            <input type="checkbox" onClick={(e) => onlyadopt(e.target.checked, e.target.value)} />
            <span>입양 가능한 아이만 볼래요!</span>
          </div>
          <ul className={styles.selectlist}>
            <li>
              <span
                className={filterState === 'imminent' ? styles.isSelected : styles.select}
                onClick={() => imminentFilter()}>
                마감임박순
              </span>
            </li>
            <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <li>
              <span
                className={filterState === 'newest' ? styles.isSelected : styles.select}
                onClick={() => newestFilter()}>
                최신순
              </span>
            </li>
            <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <li>
              <span className={filterState === 'like' ? styles.isSelected : styles.select} onClick={() => likeFilter()}>
                {' '}
                응원순
              </span>
            </li>
          </ul>
          </>
    )
}

export default Sort;