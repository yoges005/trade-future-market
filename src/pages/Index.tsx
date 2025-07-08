
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Heart, Star, MessageCircle, Filter, Plus, User, ShoppingBag, TrendingUp, Zap } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import LocationPicker from "@/components/LocationPicker";
import SellModal from "@/components/SellModal";
import ChatModal from "@/components/ChatModal";
import UserProfileModal from "@/components/UserProfileModal";
import { toast } from "sonner";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showSellModal, setShowSellModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeTab, setActiveTab] = useState("buy");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [wishlistedItems, setWishlistedItems] = useState<number[]>([]);
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    window.location.href = "/";
  };

  // Updated products with Tamil Nadu and Indian locations
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "iPhone 14 Pro Max - Excellent Condition",
      price: 75000,
      originalPrice: 95000,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      location: "Chennai, Tamil Nadu",
      distance: "2.3 km",
      seller: "TechEnthusiast92",
      rating: 4.8,
      condition: "Excellent",
      category: "Electronics",
      tags: ["smartphone", "apple", "premium"],
      timePosted: "2 hours ago",
      verified: true
    },
    {
      id: 2,
      title: "Royal Enfield Classic 350 - Well Maintained",
      price: 125000,
      originalPrice: 180000,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      location: "Coimbatore, Tamil Nadu",
      distance: "15.1 km",
      seller: "BikeEnthusiast",
      rating: 4.9,
      condition: "Good",
      category: "Vehicles",
      tags: ["motorcycle", "royal-enfield", "classic"],
      timePosted: "1 day ago",
      verified: true
    },
    {
      id: 3,
      title: "Gaming Laptop RTX 4070 Complete Setup",
      price: 85000,
      originalPrice: 120000,
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
      location: "Madurai, Tamil Nadu",
      distance: "45.8 km",
      seller: "GamerPro",
      rating: 4.7,
      condition: "Like New",
      category: "Electronics",
      tags: ["gaming", "laptop", "high-end"],
      timePosted: "3 hours ago",
      verified: false
    },
    {
      id: 4,
      title: "Traditional Silk Sarees Collection",
      price: 8500,
      originalPrice: 15000,
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=300&fit=crop",
      location: "Kanchipuram, Tamil Nadu",
      distance: "32.2 km",
      seller: "SilkWeaver",
      rating: 4.9,
      condition: "Brand New",
      category: "Fashion",
      tags: ["saree", "silk", "traditional", "kanchipuram"],
      timePosted: "5 hours ago",
      verified: true
    },
    {
      id: 5,
      title: "Wooden Dining Table Set - Teak Wood",
      price: 25000,
      originalPrice: 45000,
      image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop",
      location: "Salem, Tamil Nadu",
      distance: "85 km",
      seller: "WoodCraftsman",
      rating: 4.6,
      condition: "Good",
      category: "Home",
      tags: ["furniture", "dining-table", "teak", "handmade"],
      timePosted: "1 day ago",
      verified: true
    },
    {
      id: 6,
      title: "Canon DSLR Camera with Multiple Lenses",
      price: 45000,
      originalPrice: 75000,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
      location: "Tiruchirappalli, Tamil Nadu",
      distance: "125 km",
      seller: "PhotoPro88",
      rating: 4.8,
      condition: "Excellent",
      category: "Electronics",
      tags: ["camera", "photography", "professional", "dslr"],
      timePosted: "4 hours ago",
      verified: true
    },
    {
      id: 7,
      title: "Air Jordan Retro Collection - Size 9",
      price: 12000,
      originalPrice: 18000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      location: "Vellore, Tamil Nadu",
      distance: "95 km",
      seller: "SneakerHead",
      rating: 4.5,
      condition: "Good",
      category: "Fashion",
      tags: ["sneakers", "nike", "basketball", "collection"],
      timePosted: "6 hours ago",
      verified: false
    },
    {
      id: 8,
      title: "Yamaha Acoustic Guitar FG830",
      price: 18000,
      originalPrice: 25000,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      location: "Thanjavur, Tamil Nadu",
      distance: "165 km",
      seller: "MusicianLife",
      rating: 4.7,
      condition: "Excellent",
      category: "Music",
      tags: ["guitar", "acoustic", "yamaha", "musical-instrument"],
      timePosted: "8 hours ago",
      verified: true
    },
    {
      id: 9,
      title: "Hero Bicycle - Mountain Bike",
      price: 8500,
      originalPrice: 15000,
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop",
      location: "Erode, Tamil Nadu",
      distance: "125 km",
      seller: "CycleShop",
      rating: 4.6,
      condition: "Good",
      category: "Sports",
      tags: ["bicycle", "mountain-bike", "hero", "cycling"],
      timePosted: "12 hours ago",
      verified: true
    },
    {
      id: 10,
      title: "Traditional Brass Items Collection",
      price: 5500,
      originalPrice: 8500,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      location: "Kumbakonam, Tamil Nadu",
      distance: "145 km",
      seller: "AntiqueBrass",
      rating: 4.4,
      condition: "Good",
      category: "Home",
      tags: ["brass", "traditional", "antique", "home-decor"],
      timePosted: "1 day ago",
      verified: true
    },
    {
      id: 11,
      title: "OnePlus 11 5G - Mint Condition",
      price: 35000,
      originalPrice: 56000,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      location: "Tirunelveli, Tamil Nadu",
      distance: "245 km",
      seller: "TechGuru2023",
      rating: 4.8,
      condition: "Like New",
      category: "Electronics",
      tags: ["smartphone", "oneplus", "5g", "android"],
      timePosted: "3 hours ago",
      verified: true
    },
    {
      id: 12,
      title: "Designer Handbag - Genuine Leather",
      price: 4500,
      originalPrice: 8500,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      location: "Puducherry",
      distance: "185 km",
      seller: "FashionStore",
      rating: 4.9,
      condition: "Excellent",
      category: "Fashion",
      tags: ["handbag", "leather", "designer", "accessories"],
      timePosted: "5 hours ago",
      verified: true
    },
    {
      id: 13,
      title: "Bajaj Pulsar 150 - Single Owner",
      price: 65000,
      originalPrice: 95000,
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop",
      location: "Bangalore, Karnataka",
      distance: "350 km",
      seller: "BikeDealer",
      rating: 4.7,
      condition: "Good",
      category: "Vehicles",
      tags: ["motorcycle", "bajaj", "pulsar", "single-owner"],
      timePosted: "2 days ago",
      verified: true
    },
    {
      id: 14,
      title: "Mixer Grinder - Preethi Blue Leaf",
      price: 3500,
      originalPrice: 6500,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      location: "Hosur, Tamil Nadu",
      distance: "65 km",
      seller: "KitchenAppliances",
      rating: 4.5,
      condition: "Good",
      category: "Home",
      tags: ["mixer-grinder", "kitchen", "preethi", "appliance"],
      timePosted: "6 hours ago",
      verified: false
    },
    {
      id: 15,
      title: "Cricket Kit - Complete Set with Bag",
      price: 4500,
      originalPrice: 8000,
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop",
      location: "Karur, Tamil Nadu",
      distance: "115 km",
      seller: "SportsEquipment",
      rating: 4.6,
      condition: "Good",
      category: "Sports",
      tags: ["cricket", "sports", "equipment", "complete-set"],
      timePosted: "1 day ago",
      verified: true
    }
  ]);

  const categories = [
    { id: "all", name: "All Categories", icon: "🔍" },
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "fashion", name: "Fashion", icon: "👕" },
    { id: "home", name: "Home & Garden", icon: "🏠" },
    { id: "vehicles", name: "Vehicles", icon: "🚗" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "music", name: "Music", icon: "🎵" },
    { id: "books", name: "Books", icon: "📚" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || 
                           product.category.toLowerCase() === selectedCategory;
    const matchesLocation = selectedLocation === "All Locations" ||
                           product.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleContact = (productId: number) => {
    console.log("Opening chat for product:", productId);
    setShowChatModal(true);
    toast.success("Opening chat with seller...");
  };

  const handleWishlist = (productId: number) => {
    console.log("Toggling wishlist for product:", productId);
    setWishlistedItems(prev => {
      if (prev.includes(productId)) {
        toast.success("Removed from wishlist!");
        return prev.filter(id => id !== productId);
      } else {
        toast.success("Added to wishlist!");
        return [...prev, productId];
      }
    });
  };

  const handleSellSubmit = (data: any) => {
    console.log("New listing created:", data);
    toast.success("Listing created successfully!");
    setShowSellModal(false);
    // Add the new product to the list
    const newProduct = {
      id: products.length + 1,
      title: data.title,
      price: parseFloat(data.price),
      originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : undefined,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      location: data.location || "Chennai, Tamil Nadu",
      distance: "0 km",
      seller: currentUser?.name || "You",
      rating: 5.0,
      condition: data.condition,
      category: data.category,
      tags: data.tags || [],
      timePosted: "Just now",
      verified: false
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleFilterClick = () => {
    console.log("Filter button clicked");
    toast.info("Advanced filters coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  FutureMarket
                </h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
              {currentUser && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {currentUser.type === "buyer" ? "👤 Buyer" : "🏪 Seller"} - {currentUser.city}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log("Profile button clicked");
                  setShowProfileModal(true);
                }}
                className="backdrop-blur-sm"
              >
                <User className="w-4 h-4 mr-2" />
                {currentUser?.name || "Profile"}
              </Button>
              <Button
                onClick={() => {
                  console.log("Sell button clicked");
                  setShowSellModal(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Sell Item
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Tamil Nadu's Premier Marketplace
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing deals from Tamil Nadu and across India. Connect with verified sellers and trade with confidence!
          </p>
          {currentUser && (
            <p className="text-lg text-purple-600 font-semibold">
              Welcome back, {currentUser.name}! 🎉 Showing products near Tamil Nadu
            </p>
          )}
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 backdrop-blur-sm bg-white/70 border-white/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for products, brands, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-white/20 bg-white/50"
                />
              </div>
              <LocationPicker
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
              />
              <Button 
                variant="outline" 
                size="lg" 
                className="backdrop-blur-sm"
                onClick={handleFilterClick}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedCategory === category.id 
                      ? "bg-gradient-to-r from-purple-600 to-blue-600" 
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    console.log("Category selected:", category.id);
                    setSelectedCategory(category.id);
                  }}
                >
                  {category.icon} {category.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Buy/Sell View */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 backdrop-blur-sm bg-white/70">
            <TabsTrigger value="buy" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Buy ({filteredProducts.length})
            </TabsTrigger>
            <TabsTrigger value="sell" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              My Listings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy">
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onContact={handleContact}
                  onWishlist={handleWishlist}
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search terms, location, or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sell">
            <Card className="backdrop-blur-sm bg-white/70 border-white/20">
              <CardHeader>
                <h3 className="text-xl font-semibold">Your Listings</h3>
                <p className="text-gray-600">Manage your products and track performance</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Start Selling in Tamil Nadu</h4>
                  <p className="text-gray-600 mb-4">List your first item and reach thousands of potential buyers across Tamil Nadu and India</p>
                  <Button
                    onClick={() => {
                      console.log("Create listing button clicked");
                      setShowSellModal(true);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Listing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Modals */}
      <SellModal
        isOpen={showSellModal}
        onClose={() => {
          console.log("Sell modal closed");
          setShowSellModal(false);
        }}
        onSubmit={handleSellSubmit}
      />

      <ChatModal
        isOpen={showChatModal}
        onClose={() => {
          console.log("Chat modal closed");
          setShowChatModal(false);
        }}
      />

      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => {
          console.log("Profile modal closed");
          setShowProfileModal(false);
        }}
      />
    </div>
  );
};

export default Index;
