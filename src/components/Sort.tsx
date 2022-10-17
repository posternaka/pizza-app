import React from 'react';

type FilterTypeItem = {
  name: string;
  sortType: string;
  order: string;
}

type SortProps = {
  sortType: {
    name: string;
  };
  cbSetSort: any;
}

const filter: FilterTypeItem[] = [
  {name: 'популярности ↑', sortType: 'rating', order: 'asc'}, 
  {name: 'популярности ↓', sortType: 'rating', order: 'desc'}, 
  {name: 'цене ↑', sortType: 'price', order: 'asc'}, 
  {name: 'цене ↓', sortType: 'price', order: 'desc'}, 
  {name: 'алфавиту ↑', sortType: 'name', order: 'asc'},
  {name: 'алфавиту ↓', sortType: 'name', order: 'desc'},
];

const Sort: React.FC<SortProps> = ({ sortType, cbSetSort }) => {
  const [isVisiblePopup, setIsVisiblePopup] = React.useState(false);
  const modalRef = React.useRef<HTMLSpanElement>(null);


  React.useEffect(() => {
    const handleClickOut = (e: any) => {
      if(!e.composedPath().includes(modalRef.current)) {
        setIsVisiblePopup(false);
      } 
    };

    document.body.addEventListener('click', handleClickOut);

    return () => {
      document.body.removeEventListener('click', handleClickOut);
    };
  }, []);

  const handleSetSort = (values: FilterTypeItem) => {
    cbSetSort(values)
    setIsVisiblePopup(false)
  }


  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          className={isVisiblePopup ? '' : 'rotate'}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span 
          ref={modalRef}
          onClick={() => setIsVisiblePopup(!isVisiblePopup)}
        >
          {sortType.name}
        </span>
      </div>
      {
        isVisiblePopup &&
          (<div className="sort__popup">
            <ul>
              {
                filter.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSetSort(item)} 
                      className={item.name === sortType.name ? "active" : ''}
                    >
                      {item.name}
                    </li>
                ))
              }
            </ul>
          </div>)
      }
    </div>
  )
}

export default Sort;