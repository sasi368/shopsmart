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
  thumbnail: string;
  title: string;
  price: number;
  rating: number;
}

const PAGE_SIZE = 10;

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
      const skip = (pageNumber - 1) * PAGE_SIZE;
      const response = await fetchPaginatedProducts(PAGE_SIZE, skip);
      const fetchedProducts = response.products || [];
      setProducts(prev =>
        isRefresh ? fetchedProducts : [...prev, ...fetchedProducts],
      );
      setPage(pageNumber);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProducts(1);
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

  const renderItem = ({item}: {item: Product}) => {
    const isWishlisted = wishlist.find((i: any) => i.id === item.id);
    const isAdded = cart.find((i: any) => i.id === item.id);

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.wishlistIconContainer}
          onPress={() => toggleWishlist(item)}>
          <AppText textType="bold18" style={styles.wishlistIcon}>
            {isWishlisted ? '⭐' : '☆'}
          </AppText>
        </TouchableOpacity>
        <Image source={{uri: item.thumbnail}} style={styles.image} />
        <AppText textType="medium14" style={styles.title}>
          {item.title}
        </AppText>
        <AppText textType="regular12" style={styles.rating}>
          Rating: ⭐ {item.rating}
        </AppText>
        <AppText textType="bold14" style={styles.price}>
          ${item.price}
        </AppText>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: isAdded ? Colors.RED : Colors.GREEN,
              },
            ]}
            onPress={() => toggleCart(item)}>
            <AppText textType="regular12" style={styles.buttonText}>
              {isAdded ? 'Remove from Cart' : 'Add to Cart'}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
        numColumns={2}
        columnWrapperStyle={styles.row}
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
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: Colors.WHITE,
    width: '48%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
  },
  wishlistIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  wishlistIcon: {
    fontSize: 20,
    color: Colors.PRIMARY,
  },
  image: {
    height: 120,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  title: {
    marginTop: 5,
  },
  rating: {
    marginVertical: 5,
    color: Colors.GREY,
  },
  price: {
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 12,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  retry: {
    color: Colors.PRIMARY,
    textDecorationLine: 'underline',
  },
});
