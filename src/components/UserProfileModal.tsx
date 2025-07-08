
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Star, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  Shield,
  Edit,
  Camera,
  Award,
  TrendingUp
} from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal = ({ isOpen, onClose }: UserProfileModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Alex Johnson",
    username: "alex_shopper",
    email: "alex@example.com",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    rating: 4.8,
    totalReviews: 47,
    bio: "Tech enthusiast and collector. I love finding unique gadgets and vintage electronics. Fast responder and reliable seller/buyer.",
    verified: true,
    completedDeals: 23,
    responseTime: "< 1 hour"
  });

  const recentActivity = [
    { type: "sold", item: "iPhone 14 Pro Max", amount: 899, date: "2 days ago" },
    { type: "bought", item: "Vintage Camera", amount: 250, date: "1 week ago" },
    { type: "sold", item: "Gaming Headset", amount: 180, date: "2 weeks ago" }
  ];

  const achievements = [
    { name: "Verified Seller", icon: Shield, description: "Identity verified" },
    { name: "Fast Responder", icon: MessageCircle, description: "Responds within 1 hour" },
    { name: "Top Rated", icon: Star, description: "4.5+ star rating" },
    { name: "Deal Maker", icon: Award, description: "20+ completed transactions" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto backdrop-blur-sm bg-white/95 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">User Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="border-0 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{userProfile.name}</h3>
                      <p className="text-gray-600">@{userProfile.username}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      {isEditing ? 'Save' : 'Edit'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {userProfile.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined {userProfile.joinDate}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{userProfile.rating}</span>
                      <span className="text-gray-600 ml-1">({userProfile.totalReviews} reviews)</span>
                    </div>
                    {userProfile.verified && (
                      <Badge className="bg-green-100 text-green-700">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-700">{userProfile.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{userProfile.completedDeals}</div>
                <div className="text-sm text-gray-600">Completed Deals</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{userProfile.rating}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{userProfile.responseTime}</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              {recentActivity.map((activity, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'sold' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {activity.type === 'sold' ? <TrendingUp className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-medium">
                            {activity.type === 'sold' ? 'Sold' : 'Bought'} {activity.item}
                          </p>
                          <p className="text-sm text-gray-600">{activity.date}</p>
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-green-600">
                        ${activity.amount}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                          <achievement.icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{achievement.name}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium">Display Name</label>
                    <Input value={userProfile.name} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input value={userProfile.location} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Bio</label>
                    <Input value={userProfile.bio} className="mt-1" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
