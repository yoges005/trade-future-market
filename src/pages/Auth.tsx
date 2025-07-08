
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Store, Users, MapPin, Shield, Zap } from "lucide-react";
import BuyerAuth from "@/components/auth/BuyerAuth";
import SellerAuth from "@/components/auth/SellerAuth";

const Auth = () => {
  const [selectedUserType, setSelectedUserType] = useState<"buyer" | "seller" | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  if (selectedUserType) {
    return selectedUserType === "buyer" ? (
      <BuyerAuth 
        mode={authMode} 
        onBack={() => setSelectedUserType(null)}
        onModeChange={setAuthMode}
      />
    ) : (
      <SellerAuth 
        mode={authMode} 
        onBack={() => setSelectedUserType(null)}
        onModeChange={setAuthMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="container mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              FutureMarket
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            India's Premier Second-Hand Marketplace
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join millions of Indians buying and selling pre-owned items with complete trust and security. 
            Choose your journey below.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">10M+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50M+</div>
              <div className="text-sm text-gray-600">Products Listed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">500+</div>
              <div className="text-sm text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>

        {/* User Type Selection */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8">Choose Your Experience</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Buyer Card */}
            <Card 
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm bg-white/70 border-2 hover:border-purple-300"
              onClick={() => {
                setSelectedUserType("buyer");
                setAuthMode("login");
              }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-purple-700">I'm a Buyer</CardTitle>
                <p className="text-gray-600">Find amazing deals on pre-owned items</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Verified sellers only</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">Local pickup available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span className="text-sm">Chat with sellers directly</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUserType("buyer");
                    setAuthMode("signup");
                  }}
                >
                  Get Started as Buyer
                </Button>
              </CardContent>
            </Card>

            {/* Seller Card */}
            <Card 
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm bg-white/70 border-2 hover:border-blue-300"
              onClick={() => {
                setSelectedUserType("seller");
                setAuthMode("login");
              }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-700">I'm a Seller</CardTitle>
                <p className="text-gray-600">Turn your unused items into cash</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">Quick listing process</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Reach local buyers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">Secure payment options</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUserType("seller");
                    setAuthMode("signup");
                  }}
                >
                  Get Started as Seller
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-center mb-12">Why Choose FutureMarket?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">100% Secure</h4>
              <p className="text-gray-600">All transactions are protected with advanced security measures</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Pan-India Coverage</h4>
              <p className="text-gray-600">Available in 500+ cities across India</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">AI-Powered</h4>
              <p className="text-gray-600">Smart recommendations and price suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
