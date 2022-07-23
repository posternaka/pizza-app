import React from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
        <ul>
            {
              categories.map((category, index) => (
                <li 
                  key={index}
                  onClick={() => setActiveCategory(index)} 
                  className={category === categories[activeCategory] ? 'active' : ''}
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