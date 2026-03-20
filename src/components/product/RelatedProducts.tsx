import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export default function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  const relatedProducts = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
