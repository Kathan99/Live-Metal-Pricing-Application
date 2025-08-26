import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { fetchMetalDetails, MetalDetails } from '../api/metalService_temp';
import { FontAwesome } from '@expo/vector-icons';
import { useTimer } from '../contexts/TimerContext'; 

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const DetailsScreen = () => {
  const { metalName } = useLocalSearchParams<{ metalName: string }>();

  const [details, setDetails] = useState<MetalDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { countdown, lastUpdated } = useTimer();

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchMetalDetails(metalName);
        setDetails(data);
      } catch (err) {
        setError('Failed to fetch details.');
      } finally {
        if (isLoading) {
            setIsLoading(false);
        }
      }
    };
    if (lastUpdated) {
      loadDetails();
    }
  }, [metalName, lastUpdated]); 

  const renderContent = () => {
    if (isLoading) {
      return <View style={styles.centered}><ActivityIndicator size="large" color="#FFD700" /></View>;
    }

    if (error) {
      return <View style={styles.centered}><Text style={styles.errorText}>{error}</Text></View>;
    }

    if (details) {
      const isPositiveChange = details.change >= 0;
      const changeColor = isPositiveChange ? '#4CAF50' : '#F44336';
      const changeSign = isPositiveChange ? '+' : '';
      const iconName = isPositiveChange ? 'caret-up' : 'caret-down';

      return (
        <View style={styles.contentContainer}>
          <View style={styles.priceHeader}>
            <Text style={styles.price}>${details.price.toFixed(2)}</Text>
            <View style={styles.changeContainer}>
              <FontAwesome name={iconName} size={20} color={changeColor} style={styles.icon} />
              <Text style={[styles.change, { color: changeColor }]}>
                {changeSign}{details.change.toFixed(2)} ({changeSign}{details.changePercentage.toFixed(2)}%)
              </Text>
            </View>
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>Next update in {countdown}s</Text>
            </View>
          </View>
          
          <View style={styles.detailsCard}>
            <DetailRow label="Previous Close" value={`$${details.previousClose.toFixed(2)}`} />
            <DetailRow label="Open" value={`$${details.open.toFixed(2)}`} />
            <DetailRow label="Day High" value={`$${details.dayHigh.toFixed(2)}`} />
            <DetailRow label="Day Low" value={`$${details.dayLow.toFixed(2)}`} />
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Stack.Screen options={{ headerTitle: `${metalName} Details` }} />
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#121212' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    contentContainer: { padding: 16 },
    priceHeader: { alignItems: 'center', marginBottom: 24, paddingVertical: 16 },
    price: { fontSize: 48, fontWeight: 'bold', color: '#FFFFFF' },
    changeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    icon: { marginRight: 6 },
    change: { fontSize: 18, fontWeight: '600' },
    detailsCard: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#333' },
    label: { fontSize: 16, color: '#A0A0A0' },
    value: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
    errorText: { color: '#FF6B6B', fontSize: 18 },
    timerContainer: {
      marginTop: 12,
      paddingVertical: 4,
      paddingHorizontal: 10,
      backgroundColor: '#2A2A2A',
      borderRadius: 15,
    },
    timerText: {
      color: '#B0B0B0',
      fontSize: 12,
      fontWeight: '500',
    },
});
  
export default DetailsScreen;