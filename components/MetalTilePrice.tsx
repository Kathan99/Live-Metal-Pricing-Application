import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { fetchMetalSummary, MetalSummary } from '../api/metalService_temp';
import { useTimer } from '../contexts/TimerContext'; 

const MetalPriceTile = ({ metalName }: { metalName: string }) => {
  const [data, setData] = useState<MetalSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  
  const { countdown, lastUpdated } = useTimer();

  useEffect(() => {
    
    const loadData = async () => {
      try {
        const summary = await fetchMetalSummary(metalName);
        setData(summary);
      } catch (err) {
        setError('Failed to fetch price.');
      } finally {
        if (isLoading) {
          setIsLoading(false);
        }
      }
    };

    if (lastUpdated) {
        loadData();
    }
  }, [metalName, lastUpdated]); 

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#FFD700" />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    if (data) {
      const formattedPrice = `$${data.price.toFixed(2)}`;
      
      const formattedTimestamp = new Date(data.timestamp).toLocaleString([], {
        year: 'numeric', month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      
      return (
        <>
          <Text style={styles.price}>{formattedPrice}</Text>
          <Text style={styles.timestamp}>{formattedTimestamp}</Text>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>Next update in {countdown}s</Text>
          </View>
        </>
      );
    }

    return null;
  };

  return (
    <Link href={{ pathname: '/details', params: { metalName } }} asChild>
      <TouchableOpacity style={styles.container} disabled={isLoading || !!error}>
        <View>
          <Text style={styles.title}>{metalName} / USD</Text>
          <Text style={styles.subtitle}>24 Carat</Text>
        </View>
        <View style={styles.priceContainer}>{renderContent()}</View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#A0A0A0',
    fontSize: 14,
    marginTop: 4,
  },
  priceContainer: {
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  price: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#A0A0A0',
    fontSize: 10,
    marginTop: 2,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'right',
  },
  timerContainer: {
    marginTop: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
  },
  timerText: {
    color: '#B0B0B0',
    fontSize: 10,
    fontWeight: '500',
  },
});

export default MetalPriceTile;
