import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationPickerProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

// Tamil Nadu focused cities with other major Indian cities
const indianCities = [
  "All Locations",
  // Tamil Nadu cities (prioritized)
  "Chennai, Tamil Nadu",
  "Coimbatore, Tamil Nadu", 
  "Madurai, Tamil Nadu",
  "Tiruchirappalli, Tamil Nadu",
  "Salem, Tamil Nadu",
  "Tirunelveli, Tamil Nadu",
  "Erode, Tamil Nadu",
  "Vellore, Tamil Nadu",
  "Thoothukudi, Tamil Nadu",
  "Dindigul, Tamil Nadu",
  "Thanjavur, Tamil Nadu",
  "Ranipet, Tamil Nadu",
  "Sivakasi, Tamil Nadu",
  "Karur, Tamil Nadu",
  "Udhagamandalam, Tamil Nadu",
  "Hosur, Tamil Nadu",
  "Kanchipuram, Tamil Nadu",
  "Kumarakoil, Tamil Nadu",
  "Kumbakonam, Tamil Nadu",
  "Pollachi, Tamil Nadu",
  "Rajapalayam, Tamil Nadu",
  "Gudiyatham, Tamil Nadu",
  // Puducherry (nearby UT)
  "Puducherry",
  // Other major Indian cities
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bangalore, Karnataka", 
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Kolkata, West Bengal",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Surat, Gujarat",
  "Lucknow, Uttar Pradesh",
  "Kanpur, Uttar Pradesh",
  "Nagpur, Maharashtra",
  "Indore, Madhya Pradesh",
  "Thane, Maharashtra",
  "Bhopal, Madhya Pradesh",
  "Visakhapatnam, Andhra Pradesh",
  "Patna, Bihar",
  "Vadodara, Gujarat",
  "Ghaziabad, Uttar Pradesh",
  "Ludhiana, Punjab",
  "Agra, Uttar Pradesh",
  "Nashik, Maharashtra",
  "Faridabad, Haryana",
  "Meerut, Uttar Pradesh",
  "Rajkot, Gujarat",
  "Kalyan-Dombivali, Maharashtra",
  "Vasai-Virar, Maharashtra",
  "Varanasi, Uttar Pradesh",
  "Srinagar, Jammu and Kashmir",
  "Aurangabad, Maharashtra",
  "Dhanbad, Jharkhand",
  "Amritsar, Punjab",
  "Navi Mumbai, Maharashtra",
  "Allahabad, Uttar Pradesh",
  "Howrah, West Bengal",
  "Ranchi, Jharkhand",
  "Gwalior, Madhya Pradesh",
  "Jabalpur, Madhya Pradesh",
  "Vijayawada, Andhra Pradesh",
  "Jodhpur, Rajasthan",
  "Raipur, Chhattisgarh",
  "Kota, Rajasthan",
  "Guwahati, Assam",
  "Chandigarh",
  "Solapur, Maharashtra",
  "Hubli-Dharwad, Karnataka",
  "Mysore, Karnataka",
  "Tiruchirappalli, Tamil Nadu",
  "Bareilly, Uttar Pradesh",
  "Aligarh, Uttar Pradesh",
  "Tiruppur, Tamil Nadu",
  "Gurgaon, Haryana",
  "Moradabad, Uttar Pradesh",
  "Jalandhar, Punjab",
  "Bhubaneswar, Odisha",
  "Gorakhpur, Uttar Pradesh",
  "Bikaner, Rajasthan",
  "Saharanpur, Uttar Pradesh",
  "Noida, Uttar Pradesh"
];

const LocationPicker = ({ selectedLocation, onLocationChange }: LocationPickerProps) => {
  const [open, setOpen] = useState(false);

  const handleLocationSelect = (location: string) => {
    console.log("Location selected:", location);
    onLocationChange(location);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between h-12 backdrop-blur-sm bg-white/50"
          onClick={() => {
            console.log("Location picker opened");
            setOpen(!open);
          }}
        >
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="truncate text-left">
              {selectedLocation.length > 20 
                ? selectedLocation.substring(0, 20) + "..." 
                : selectedLocation
              }
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search cities..." />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {indianCities.map((city) => (
                <CommandItem
                  key={city}
                  value={city}
                  onSelect={() => handleLocationSelect(city)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLocation === city ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="truncate">{city}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationPicker;
