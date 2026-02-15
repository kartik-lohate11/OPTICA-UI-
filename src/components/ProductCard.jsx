import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const ProductCard = ({ product }) => {
  return (
    <Card 
      className="group overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      data-testid={`product-card-${product.id}`}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <button 
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            data-testid={`wishlist-button-${product.id}`}
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid={`product-name-${product.id}`}>
            {product.brand} {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{product.description}</p>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">{product.material} • {product.fit}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900" data-testid={`product-price-${product.id}`}>
              ${product.price}
            </span>
            <Button 
              variant="outline" 
              className="hover:bg-gray-900 hover:text-white transition-colors"
              data-testid={`add-to-cart-${product.id}`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
