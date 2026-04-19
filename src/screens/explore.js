import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

const categories = [
  { id: '1', name: 'Fresh Fruits\n& Vegetable', image: require('../../assets/FrashFruits.png'), bgColor: 'rgba(83, 177, 117, 0.1)', borderColor: '#53B175' },
  { id: '2', name: 'Cooking Oil\n& Ghee', image: require('../../assets/CookingOil.png'), bgColor: 'rgba(248, 164, 76, 0.1)', borderColor: '#F8A44C' },
  { id: '3', name: 'Meat & Fish', image: require('../../assets/MeatFish.png'), bgColor: 'rgba(247, 165, 147, 0.1)', borderColor: '#F7A593' },
  { id: '4', name: 'Bakery & Snacks', image: require('../../assets/Bakery.png'), bgColor: 'rgba(211, 176, 224, 0.1)', borderColor: '#D3B0E0' },
  { id: '5', name: 'Dairy & Eggs', image: require('../../assets/Dairy.png'), bgColor: 'rgba(253, 229, 152, 0.1)', borderColor: '#FDE598' },
  { id: '6', name: 'Beverages', image: require('../../assets/Beverages.png'), bgColor: 'rgba(183, 223, 245, 0.1)', borderColor: '#B7DFF5' },
];

export default function Explore({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = (windowWidth - 60) / 2; 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Find Products</Text>

      <TouchableOpacity 
        style={styles.searchWrapper}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Search')} // Chuyển sang màn hình Search
      >
        <Text style={{ color: '#181725', fontSize: 18, marginRight: 10 }}>🔍</Text>
        
        <View pointerEvents="none" style={{ flex: 1 }}>
          <TextInput 
            placeholder="Search Store" 
            style={styles.searchInput} 
            placeholderTextColor="#7C7C7C" 
            editable={false} 
          />
        </View>
      </TouchableOpacity>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }} 
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.card, 
              { 
                width: cardWidth, 
                backgroundColor: item.bgColor, 
                borderColor: item.borderColor 
              }
            ]}
            onPress={() => {
              if (item.name === 'Beverages') {
                navigation.navigate('Beverages');
              }
            }}
          >
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#181725', textAlign: 'center', marginTop: 15, marginBottom: 20 },
  
  searchWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F2F3F2', 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    paddingVertical: 12, 
    marginHorizontal: 20, 
    marginBottom: 20 
  },
  
  searchInput: { flex: 1, fontSize: 16, color: '#181725', fontWeight: '600' },
  
  card: { height: 190, borderRadius: 18, borderWidth: 1, padding: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  image: { width: '100%', height: 75, marginBottom: 20 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#181725', textAlign: 'center', lineHeight: 22 },
});