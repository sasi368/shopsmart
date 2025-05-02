import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../redux/actions/cartActions';
import {Colors} from '../global/themes/Colors';
import Icon, {AppIcons} from '../global/components/AppIcons';
import AppText from '../global/components/AppText';

const CartScreen = () => {
  const dispatch = useDispatch();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const cart = useSelector((state: RootState) => state.cart);
  const wishlist = useSelector((state: RootState) => state.wishlist);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderCartItem = ({item}: {item: any}) => (
    <View style={styles.card}>
      <Image source={{uri: item.thumbnail}} style={styles.image} />
      <View style={styles.details}>
        <AppText style={styles.title}>{item.title}</AppText>
        <AppText style={styles.price}>
          ${(item.price * item.quantity).toFixed(2)}
        </AppText>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => {
              if (item.quantity > 1) {
                dispatch(decreaseQuantity(item.id));
              } else {
                dispatch(removeFromCart(item.id));
              }
            }}>
            <Icon
              type={AppIcons.AntDesign}
              name={'minus'}
              size={20}
              color={Colors.WHITE}
            />
          </TouchableOpacity>
          <AppText style={styles.quantityText}>{item.quantity}</AppText>
          <TouchableOpacity
            style={styles.quantityButton2}
            onPress={() => dispatch(increaseQuantity(item.id))}>
            <Icon
              type={AppIcons.AntDesign}
              name={'plus'}
              size={20}
              color={Colors.WHITE}
            />
          </TouchableOpacity>
          {item.quantity > 1 && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => dispatch(removeFromCart(item.id))}>
              <Icon
                type={AppIcons.AntDesign}
                name={'delete'}
                size={20}
                color={Colors.RED}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const renderWishlistItem = ({item}: {item: any}) => (
    <View style={styles.card}>
      <Image source={{uri: item.thumbnail}} style={styles.image} />
      <View style={styles.details}>
        <AppText style={styles.title}>{item.title}</AppText>
        <AppText style={styles.price}>${item.price}</AppText>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            selectedTabIndex === 0 && styles.selectedButton,
          ]}
          onPress={() => setSelectedTabIndex(0)}>
          <AppText
            style={[
              styles.segmentText,
              {color: selectedTabIndex === 0 ? Colors.WHITE : Colors.BLACK},
            ]}>
            Cart
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            selectedTabIndex === 1 && styles.selectedButton,
          ]}
          onPress={() => setSelectedTabIndex(1)}>
          <AppText
            style={[
              styles.segmentText,
              {color: selectedTabIndex === 1 ? Colors.WHITE : Colors.BLACK},
            ]}>
            Wishlist
          </AppText>
        </TouchableOpacity>
      </View>

      {selectedTabIndex === 0 ? (
        <View style={styles.section}>
          {cart.length === 0 ? (
            <View style={styles.centered}>
              <AppText style={styles.empty}>Your cart is empty.</AppText>
            </View>
          ) : (
            <FlatList
              data={cart}
              keyExtractor={item => item.id.toString()}
              renderItem={renderCartItem}
            />
          )}
          <View style={styles.totalContainer}>
            <AppText style={styles.totalText}>
              Total: ${total.toFixed(2)}
            </AppText>
          </View>
        </View>
      ) : (
        <View style={styles.section}>
          {wishlist.length === 0 ? (
            <View style={styles.centered}>
              <AppText style={styles.empty}>Your wishlist is empty.</AppText>
            </View>
          ) : (
            <FlatList
              data={wishlist}
              keyExtractor={item => item.id.toString()}
              renderItem={renderWishlistItem}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  segmentedControl: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  selectedButton: {
    backgroundColor: Colors.PRIMARY,
  },
  segmentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 18,
    color: '#999',
  },
  card: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: Colors.RED,
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButton2: {
    backgroundColor: Colors.GREEN,
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: Colors.GREEN,
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  totalContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
