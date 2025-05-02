import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPaginatedProducts} from '../api/productApi';
import {addToCart, removeFromCart} from '../redux/actions/cartActions';
import {
  addToWishlist,
  removeFromWishlist,
} from '../redux/actions/wishlistActions';
import {RootState} from '../redux/store';
import AppHeader from '../global/components/AppHeader';
import AppText from '../global/components/AppText';
import {Colors} from '../global/themes/Colors';

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
}

const ProductListScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const {cart, wishlist} = useSelector((state: RootState) => state);

  const loadProducts = async (pageNumber = 1, isRefresh = false) => {
    setError(false);
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const response = await fetchPaginatedProducts(10, (pageNumber - 1) * 10);
      setProducts(prev => (isRefresh ? response : [...prev, ...response]));
      setPage(pageNumber);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, []);

  const toggleCart = (product: Product) => {
    if (cart.find((item: any) => item.id === product.id)) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const toggleWishlist = (product: Product) => {
    if (wishlist.find((item: any) => item.id === product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const renderItem = ({item}: {item: Product}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <AppText textType="medium14" style={styles.title}>
        {item.title}
      </AppText>
      <AppText textType="bold14" style={styles.price}>
        ${item.price}
      </AppText>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cartButton]}
          onPress={() => toggleCart(item)}>
          <AppText textType="regular12" style={styles.buttonText}>
            {cart.find((i: any) => i.id === item.id)
              ? 'Remove from Cart'
              : 'Add to Cart'}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.wishlistButton]}
          onPress={() => toggleWishlist(item)}>
          <AppText textType="regular12" style={styles.buttonText}>
            {wishlist.find((i: any) => i.id === item.id)
              ? 'Remove from Wishlist'
              : 'Add to Wishlist'}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <AppText textType="regular14" style={styles.error}>
          Something went wrong.
        </AppText>
        <TouchableOpacity onPress={() => loadProducts(page)}>
          <AppText textType="medium14" style={styles.retry}>
            Retry
          </AppText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppHeader
        name={'Products'}
        leftImage={''}
        rightImage={''}
        rightImage2=""
      />
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => loadProducts(page + 1)}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadProducts(1, true)}
          />
        }
      />
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.WHITE,
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    marginVertical: 10,
  },
  price: {},
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: Colors.GREEN,
  },
  wishlistButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: Colors.WHITE,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  retry: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});
