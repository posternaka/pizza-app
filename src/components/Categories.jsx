import React from 'react';

function Categories({ value, cbSetCategory}) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
}

export default Categories;