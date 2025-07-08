
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Star, MessageCircle, Eye, Clock, Shield } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  location: string;
  distance: string;
  seller: string;
  rating: number;
  condition: string;
  category: string;
  tags: string[];
  timePosted: string;
  verified: boolean;
}

interface ProductCardProps {
  product: Product;
  onContact: (productId: number) => void;
  onWishlist: (productId: number) => void;
}

const ProductCard = ({ product, onContact, onWishlist }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist(product.id);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 backdrop-blur-sm bg-white/80 border-white/20 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay with quick actions */}
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } flex items-center justify-center space-x-2`}>
          <Button size="sm" variant="secondary" className="backdrop-blur-sm">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button size="sm" onClick={() => onContact(product.id)} className="backdrop-blur-sm">
            <MessageCircle className="w-4 h-4 mr-1" />
            Contact
          </Button>
        </div>
        
        {/* Top badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discountPercentage > 0 && (
            <Badge className="bg-red-500 text-white">
              -{discountPercentage}%
            </Badge>
          )}
          {product.verified && (
            <Badge className="bg-green-500 text-white">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
        
        {/* Condition badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="backdrop-blur-sm bg-white/80">
            {product.condition}
          </Badge>
        </div>
        
        {/* Wishlist button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-2 right-2 p-2 backdrop-blur-sm bg-white/20 hover:bg-white/40"
          onClick={handleWishlist}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'
            }`}
          />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title and Category */}
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-purple-600 transition-colors">
              {product.title}
            </h3>
            <Badge variant="outline" className="text-xs mt-1">
              {product.category}
            </Badge>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {/* Location and Distance */}
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{product.location}</span>
            <span className="mx-2">•</span>
            <span className="text-blue-600 font-medium">{product.distance}</span>
          </div>
          
          {/* Seller Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {product.seller[0]}
              </div>
              <span className="text-sm font-medium">{product.seller}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span>{product.rating}</span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Badge>
            ))}
          </div>
          
          {/* Time Posted */}
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            <span>{product.timePosted}</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              onClick={() => onContact(product.id)}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Contact
            </Button>
            <Button size="sm" variant="outline" className="px-3">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
