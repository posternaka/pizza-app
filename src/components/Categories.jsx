import React from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  console.log(activeCategory);

  return (
    <div className="categories">
        <ul>
            {
              categories.map((category, index) => (
                <li 
                  onClick={(index) => setActiveCategory(index)} 
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