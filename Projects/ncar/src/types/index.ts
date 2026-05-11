
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type TransmissionType = 'Automatic' | 'Manual' | 'CVT';
export type CarCondition = 'New' | 'Used' | 'Foreign Used';
export type DealerStatus = 'PENDING_VERIFICATION' | 'VERIFIED_DEALER' | 'REJECTED';
export type VehicleStatus = 'PENDING' | 'LIVE' | 'SOLD' | 'REJECTED';
export type RentalType = 'Self-drive' | 'With Driver' | 'Both';
export type DriveTrain = 'FWD' | 'RWD' | 'AWD' | '4WD';
export type BodyType = 'SUV' | 'Sedan' | 'Hatchback' | 'Pickup' | 'Coupe' | 'Van' | 'Bus' | 'Truck';

export interface VaultFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
  uploadedAt: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  engineSize: string;
  enginePower?: string;
  torque?: string;
  seatingCapacity: number;
  driveTrain: DriveTrain;
  bodyType: BodyType;
  vin?: string;
  condition: CarCondition;
  location: string;
  dealerId: string;
  images: string[];
  description: string;
  isVerified: boolean;
  isFeatured: boolean;
  createdAt: string;
  status: VehicleStatus;
  color: string;
  regNumber: string;
  features: string[];
  financeOptions?: boolean;
  warrantyOptions?: boolean;
  unitsAvailable: number;
  // Rental specific fields
  isRentalAvailable: boolean;
  rentalType?: RentalType;
  dailyRate?: number;
  driverIncluded?: boolean;
  driverName?: string;
}

export interface Dealer {
  id: string;
  name: string;
  location: string;
  phone: string;
  whatsapp: string;
  email: string;
  logo: string;
  isVerified: boolean;
  joinedDate: string;
  status: DealerStatus;
  businessRegNo: string;
  representativeName: string;
  district: string;
  docs?: {
    regCertificate: string;
    tradingLicense: string;
    nationalId: string;
  };
  vaultFiles: VaultFile[];
  rejectionReason?: string;
  paymentStatus: 'PAID' | 'UNPAID';
  paymentMethod?: 'MTN' | 'AIRTEL' | 'CARD';
  subscriptionExpiry?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'admin' | 'dealer';
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  vehicleId: string;
  buyerId: string;
  dealerId: string;
  messages: Message[];
  lastMessageDate: string;
  unreadCount?: number;
}

export interface AppState {
  userType: 'guest' | 'buyer' | 'dealer' | 'admin';
  userId: string | null;
  userData: User | Dealer | null;
  isAdminAuthenticated?: boolean;
  comparisonIds?: string[];
}
