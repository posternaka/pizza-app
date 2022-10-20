import React from 'react';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesProps = {
  value: number;
  cbSetCategory: (i: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, cbSetCategory}) => {
  useWhyDidYouUpdate('Categories', { value, cbSetCategory})

  return (
    <div className="categories">
        <ul>
            {
              categories.map((category, index) => (
                <li 
                  key={index}
                  onClick={() => cbSetCategory(index)} 
                  className={value === index ? 'active' : ''}
                >
                  {category}
                </li>
              ))
            }
        </ul>
    </div>
  )
})

export default Categories;