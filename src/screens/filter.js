import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  SafeAreaView, ScrollView 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// Nhập hằng số dữ liệu lọc
import { FILTER_CATEGORIES, FILTER_BRANDS } from '../data';

export default function Filters({ navigation }) {
  const [selectedCategories, setSelectedCategories] = useState(['Eggs']);
  const [selectedBrands, setSelectedBrands] = useState(['Individual Callection']);

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const FilterOption = ({ label, isSelected, onPress }) => (
    <TouchableOpacity style={styles.optionRow} onPress={onPress} activeOpacity={0.7}>
      <MaterialCommunityIcons 
        name={isSelected ? "checkbox-marked" : "checkbox-blank-outline"} 
        size={26} 
        color={isSelected ? "#53B175" : "#B1B1B1"} 
      />
      <Text style={[styles.optionLabel, { color: isSelected ? "#53B175" : "#181725" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <View style={styles.mainContent}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollArea}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            {/* Duyệt qua dữ liệu từ data.js */}
            {FILTER_CATEGORIES.map(item => (
              <FilterOption 
                key={item} 
                label={item} 
                isSelected={selectedCategories.includes(item)} 
                onPress={() => toggleSelection(item, selectedCategories, setSelectedCategories)}
              />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Brand</Text>
            {/* Duyệt qua dữ liệu từ data.js */}
            {FILTER_BRANDS.map(item => (
              <FilterOption 
                key={item} 
                label={item} 
                isSelected={selectedBrands.includes(item)} 
                onPress={() => toggleSelection(item, selectedBrands, setSelectedBrands)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.applyBtn} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.applyBtnText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 15,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  mainContent: { 
    flex: 1, 
    backgroundColor: '#F2F3F2', 
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35,
    marginTop: 10,
  },
  scrollArea: { paddingHorizontal: 20 },
  section: { marginTop: 30 },
  sectionTitle: { fontSize: 24, fontWeight: '600', marginBottom: 20, color: '#181725' },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  optionLabel: { fontSize: 18, marginLeft: 12, fontWeight: '500' },
  footer: { paddingHorizontal: 20, paddingBottom: 30, paddingTop: 10 },
  applyBtn: { 
    backgroundColor: '#53B175', 
    paddingVertical: 20, 
    borderRadius: 18, 
    alignItems: 'center',
    elevation: 3,
  },
  applyBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});