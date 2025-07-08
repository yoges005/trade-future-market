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
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // Expanded mock data with proper placeholder images
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "iPhone 14 Pro Max - Excellent Condition",
      price: 899,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      location: "San Francisco, CA",
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
      title: "Vintage Leather Jacket - Authentic",
      price: 150,
      originalPrice: 300,
      image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=300&fit=crop",
      location: "Los Angeles, CA",
      distance: "5.1 km",
      seller: "VintageVibe",
      rating: 4.9,
      condition: "Good",
      category: "Fashion",
      tags: ["vintage", "leather", "classic"],
      timePosted: "1 day ago",
      verified: true
    },
    {
      id: 3,
      title: "Gaming Setup - RTX 4080 Complete",
      price: 2400,
      originalPrice: 3200,
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
      location: "Seattle, WA",
      distance: "12.8 km",
      seller: "GamerPro",
      rating: 4.7,
      condition: "Like New",
      category: "Electronics",
      tags: ["gaming", "computer", "high-end"],
      timePosted: "3 hours ago",
      verified: false
    },
    {
      id: 4,
      title: "MacBook Pro M2 - Perfect for Work",
      price: 1599,
      originalPrice: 1999,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      location: "San Francisco, CA",
      distance: "1.2 km",
      seller: "CreativeDesigner",
      rating: 4.9,
      condition: "Excellent",
      category: "Electronics",
      tags: ["laptop", "apple", "professional"],
      timePosted: "5 hours ago",
      verified: true
    },
    {
      id: 5,
      title: "Modern Sofa Set - Gray Fabric",
      price: 800,
      originalPrice: 1400,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      location: "Portland, OR",
      distance: "8.5 km",
      seller: "HomeDecorLover",
      rating: 4.6,
      condition: "Good",
      category: "Home",
      tags: ["furniture", "living-room", "modern"],
      timePosted: "1 day ago",
      verified: true
    },
    {
      id: 6,
      title: "Canon EOS R5 Camera with Lenses",
      price: 2200,
      originalPrice: 3500,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
      location: "Los Angeles, CA",
      distance: "15.3 km",
      seller: "PhotoPro88",
      rating: 4.8,
      condition: "Excellent",
      category: "Electronics",
      tags: ["camera", "photography", "professional"],
      timePosted: "4 hours ago",
      verified: true
    },
    {
      id: 7,
      title: "Nike Air Jordan Retro - Size 10",
      price: 180,
      originalPrice: 220,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      location: "San Diego, CA",
      distance: "25.7 km",
      seller: "SneakerHead",
      rating: 4.5,
      condition: "Good",
      category: "Fashion",
      tags: ["sneakers", "nike", "basketball"],
      timePosted: "6 hours ago",
      verified: false
    },
    {
      id: 8,
      title: "Electric Guitar Fender Stratocaster",
      price: 650,
      originalPrice: 900,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      location: "Nashville, TN",
      distance: "45.2 km",
      seller: "MusicianLife",
      rating: 4.7,
      condition: "Excellent",
      category: "Music",
      tags: ["guitar", "electric", "fender"],
      timePosted: "8 hours ago",
      verified: true
    },
    {
      id: 9,
      title: "Mountain Bike - Trek Full Suspension",
      price: 1200,
      originalPrice: 1800,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      location: "Denver, CO",
      distance: "35.1 km",
      seller: "OutdoorAdventurer",
      rating: 4.6,
      condition: "Good",
      category: "Sports",
      tags: ["bicycle", "mountain", "trek"],
      timePosted: "12 hours ago",
      verified: true
    },
    {
      id: 10,
      title: "Dining Table Set - Wooden Oak",
      price: 450,
      originalPrice: 750,
      image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop",
      location: "Austin, TX",
      distance: "18.9 km",
      seller: "FurnitureDeals",
      rating: 4.4,
      condition: "Good",
      category: "Home",
      tags: ["dining", "wooden", "family"],
      timePosted: "1 day ago",
      verified: true
    },
    {
      id: 11,
      title: "Smart Watch Apple Series 8",
      price: 320,
      originalPrice: 450,
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop",
      location: "Chicago, IL",
      distance: "7.4 km",
      seller: "TechGuru2023",
      rating: 4.8,
      condition: "Like New",
      category: "Electronics",
      tags: ["smartwatch", "apple", "fitness"],
      timePosted: "3 hours ago",
      verified: true
    },
    {
      id: 12,
      title: "Designer Handbag - Coach Original",
      price: 280,
      originalPrice: 480,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      location: "Miami, FL",
      distance: "22.6 km",
      seller: "LuxuryFashion",
      rating: 4.9,
      condition: "Excellent",
      category: "Fashion",
      tags: ["handbag", "coach", "luxury"],
      timePosted: "5 hours ago",
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
    return matchesSearch && matchesCategory;
  });

  const handleContact = (productId: number) => {
    setShowChatModal(true);
    toast.success("Opening chat with seller...");
  };

  const handleWishlist = (productId: number) => {
    toast.success("Added to wishlist!");
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
                onClick={() => setShowProfileModal(true)}
                className="backdrop-blur-sm"
              >
                <User className="w-4 h-4 mr-2" />
                {currentUser?.name || "Profile"}
              </Button>
              <Button
                onClick={() => setShowSellModal(true)}
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
            The Future of Second-Hand Trading
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing deals, connect with verified sellers, and trade with confidence using AI-powered recommendations
          </p>
          {currentUser && (
            <p className="text-lg text-purple-600 font-semibold">
              Welcome back, {currentUser.name}! 🎉
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
              <Button variant="outline" size="lg" className="backdrop-blur-sm">
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
                  onClick={() => setSelectedCategory(category.id)}
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
              Buy
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
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
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
                  <h4 className="text-lg font-semibold mb-2">Start Selling Today</h4>
                  <p className="text-gray-600 mb-4">List your first item and reach thousands of potential buyers</p>
                  <Button
                    onClick={() => setShowSellModal(true)}
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
        onClose={() => setShowSellModal(false)}
        onSubmit={(data) => {
          console.log("New listing:", data);
          toast.success("Listing created successfully!");
          setShowSellModal(false);
        }}
      />

      <ChatModal
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
      />

      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </div>
  );
};

export default Index;
