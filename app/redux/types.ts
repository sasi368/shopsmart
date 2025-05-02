import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
