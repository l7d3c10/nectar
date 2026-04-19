import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image,
  TouchableOpacity, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Nhập dữ liệu từ file data.js
import { FAVORITES_DATA } from '../data'; 

export default function Favorites({ navigation }) {
  // Khởi tạo state với dữ liệu từ data.js
  const [items, setItems] = useState(FAVORITES_DATA);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.weight}>{item.weight}, Price</Text>
      </View>

      <Text style={styles.price}>${item.price.toFixed(2)}</Text>

      <Ionicons name="chevron-forward" size={20} color="#B3B3B3" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourite</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      />

      {/* BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addAllBtn}>
          <Text style={styles.addAllText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2'
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20
  },
  image: { width: 60, height: 60, marginRight: 15 },
  name: { fontSize: 16, fontWeight: 'bold' },
  weight: { color: '#7C7C7C', marginTop: 5 },
  price: { fontSize: 16, fontWeight: 'bold', marginRight: 10 },
  separator: { height: 1, backgroundColor: '#E2E2E2' },
  footer: {
    position: 'absolute',
    bottom: 20, // Đã điều chỉnh lại vị trí khi bỏ tab thủ công
    width: '100%',
    paddingHorizontal: 20
  },
  addAllBtn: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addAllText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});