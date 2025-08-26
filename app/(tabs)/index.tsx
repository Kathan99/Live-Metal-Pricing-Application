import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Text } from 'react-native';
import MetalPriceTile from '../../components/MetalTilePrice';

const METALS_TO_DISPLAY = ['Gold', 'Silver', 'Platinum', 'Palladium'];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Live Metal Prices</Text>
        </View>
        
        {/* We map over our array to create a tile for each metal */}
        {METALS_TO_DISPLAY.map((metal) => (
          <MetalPriceTile key={metal} metalName={metal} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default HomeScreen;