
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Search, Navigation } from "lucide-react";

interface LocationPickerProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

const LocationPicker = ({ selectedLocation, onLocationChange }: LocationPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const popularLocations = [
    "San Francisco, CA",
    "Los Angeles, CA",
    "New York, NY",
    "Seattle, WA",
    "Chicago, IL",
    "Austin, TX",
    "Boston, MA",
    "Miami, FL"
  ];
  
  const filteredLocations = popularLocations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationSelect = (location: string) => {
    onLocationChange(location);
    setIsOpen(false);
    setSearchTerm("");
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          const { latitude, longitude } = position.coords;
          onLocationChange(`Current Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[200px] justify-start backdrop-blur-sm bg-white/50 border-white/20"
        >
          <MapPin className="w-4 h-4 mr-2" />
          <span className="truncate">{selectedLocation}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 backdrop-blur-sm bg-white/95 border-white/20">
        <div className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={getCurrentLocation}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Use Current Location
          </Button>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700 px-2">Popular Locations</p>
            {filteredLocations.map((location) => (
              <Button
                key={location}
                variant="ghost"
                className="w-full justify-start text-left h-auto p-2"
                onClick={() => handleLocationSelect(location)}
              >
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span>{location}</span>
              </Button>
            ))}
          </div>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-600"
            onClick={() => handleLocationSelect("All Locations")}
          >
            Show all locations
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationPicker;
