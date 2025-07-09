export interface PropertyLocation {
  country: string;
  city: string;
  district: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number;
  location: PropertyLocation;
  images: string[];
}
