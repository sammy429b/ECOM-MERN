import ProductCard from '@/components/custom/Main/ProductCard';
import data from '../db.json';
import { useParams } from 'react-router-dom';

function Category() {
  const { category } = useParams();
  const selectedCategory = category.toLowerCase(); // Ensure case-insensitive comparison
  const filteredProducts = data.filter(product => product.category.toLowerCase() === selectedCategory);

  if (filteredProducts.length === 0) {
    // Handle case when no products are found for the selected category
    return <div>No products found for {selectedCategory}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {filteredProducts.map(item => (
        <ProductCard details={item} key={item.id} />
      ))}
    </div>
  );
}

export default Category;
