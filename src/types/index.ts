export type Info<T> = {
  getValue: () => T;
  row: {
    original: T;
  };
};

export interface IProduct {
  code: string;
  createdAt: string;
  descriptions: string[];
  id: string;
  name: string;
  outOfStock: boolean;
  price: number;
  unit: string;
  updatedAt: string;
}
export interface ICartPayload {
  productId: string;
  quantity: number;
}
export interface ICartItems {
  id: string;
  quantity: number;
  productId: string;
  totalPrice: string;
  cartId: string;
  product: IProduct;
}
export interface ICartData {
  totalAmount: number;
  id: string;
  CartItem: ICartItems[];
}
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Viewport extends Coordinates {
  zoom: number;
}

export interface Address {
  streetAndNumber: string;
  place: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface MapProps extends Coordinates {
  updateCoordinates: (latitude: number, longitude: number) => void;
}

export interface AddressFormProps {
  address: Address;
  setAddress: (address: Address) => void;
  handleClick: () => void;
}

export interface AutoCompleteInputProps {
  handleManualInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof Address
  ) => void;
  setAddress: (address: Address) => void;
  streetAndNumber: string;
}

export interface PlaceSuggestion {
  id: string;
  place_name: string;
  center: [number, number];
  context: Array<{
    id: string;
    text: string;
  }>;
}

export interface ICategory {
  name: string;
}

export interface IOrderProduct {
  price: number;
  name: string;
  category: ICategory;
  imageUrl: string;
}

export interface IOrderItem {
  id: string;
  quantity: number;
  orderId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: IOrderProduct;
}

export interface IOrderDetails {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'PENDING' | 'DISPATCHED' | 'COMPLETED' | 'CANCELED';
  userId: string;
  orderId: string;
  totalAmount: string;
  OrderItem: IOrderItem[];
  totalPrice: number;
  totalQuantity: number;
  recipientAddress: string;
  recipientName: string;
  recipientPhoneNumber: string;
}
