import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, Image, 
  TouchableOpacity, SafeAreaView, Modal, Alert 
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
// Nhập dữ liệu giỏ hàng ban đầu
import { CART_DATA } from '../data'; 

export default function Cart({ navigation }) {
  const [cartItems, setCartItems] = useState(CART_DATA);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const updateQuantity = (id, type) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQty = type === 'add' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      <View style={styles.itemInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => setCartItems(cartItems.filter(i => i.id !== item.id))}>
            <Ionicons name="close" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemWeight}>{item.weight}, Price</Text>

        <View style={styles.actionRow}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, 'sub')}>
              <Feather name="minus" size={20} color="#B3B3B3" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, 'add')}>
              <Feather name="plus" size={20} color="#53B175" />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.checkoutBtn} 
          onPress={() => setIsCheckoutVisible(true)}
        >
          <View style={styles.btnContent}>
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <View style={styles.priceTag}>
              <Text style={styles.totalPriceText}>${getTotalPrice()}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isCheckoutVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCheckoutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setIsCheckoutVisible(false)}>
                <Ionicons name="close" size={28} />
              </TouchableOpacity>
            </View>
            <Text style={{marginTop: 10, fontSize: 16}}>Total Order: ${getTotalPrice()}</Text>
            <TouchableOpacity 
              style={styles.placeOrderBtn}
              onPress={() => {
                setIsCheckoutVisible(false);
                Alert.alert("Success", "Order Placed!");
              }}
            >
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingVertical: 20, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  cartItem: { flexDirection: 'row', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  itemImage: { width: 80, height: 80, marginRight: 20 },
  itemInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between' },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemWeight: { color: '#7C7C7C', marginVertical: 5 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 15, padding: 8 },
  qtyText: { marginHorizontal: 15, fontWeight: 'bold' },
  itemPrice: { fontSize: 18, fontWeight: 'bold' },
  footer: { position: 'absolute', bottom: 20, width: '100%', paddingHorizontal: 20 },
  checkoutBtn: { backgroundColor: '#53B175', borderRadius: 19, height: 65, justifyContent: 'center' },
  btnContent: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  priceTag: { position: 'absolute', right: 20, backgroundColor: '#489E67', paddingHorizontal: 10, borderRadius: 5 },
  totalPriceText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  modalTitle: { fontSize: 24, fontWeight: 'bold' },
  placeOrderBtn: { backgroundColor: '#53B175', borderRadius: 19, height: 60, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  placeOrderText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});