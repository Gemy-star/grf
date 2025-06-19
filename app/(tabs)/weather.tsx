import { ScrollView, Text, StyleSheet, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useApi } from '@/hooks/useApi';
import { api, WeatherResponse } from '@/services/api';
import { Sun, Cloud, Droplets, Wind, MapPin } from 'lucide-react-native';
import * as Location from 'expo-location';

export default function WeatherScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationName, setLocationName] = useState('Current Location');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // Use default coordinates (New York) if permission denied
        setLocation({ latitude: 40.7128, longitude: -74.0060 });
        setLocationName('New York, NY');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      // Get location name
      let address = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      
      if (address[0]) {
        setLocationName(`${address[0].city}, ${address[0].region}`);
      }
    })();
  }, []);

  const { data: weather, loading, error, refetch } = useApi(
    () => location ? api.getWeather(location.latitude, location.longitude) : Promise.resolve({ data: null, success: false }),
    [location]
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <LoadingSpinner />;
  }

  if (error && !weather) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={onRefresh}
      />
    );
  }

  const getWeatherIcon = (code: number) => {
    // Simplified weather code interpretation
    if (code <= 3) return Sun;
    if (code <= 48) return Cloud;
    return Cloud;
  };

  const WeatherIcon = weather ? getWeatherIcon(weather.current_weather.weathercode) : Sun;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Weather</Text>
          <View style={styles.locationRow}>
            <MapPin color="#8E8E93" size={16} strokeWidth={2} />
            <Text style={styles.locationText}>{locationName}</Text>
          </View>
        </View>

        {weather && (
          <>
            <Card style={styles.mainWeatherCard}>
              <View style={styles.currentWeather}>
                <WeatherIcon color="#007AFF" size={64} strokeWidth={1.5} />
                <Text style={styles.temperature}>
                  {Math.round(weather.current_weather.temperature)}°C
                </Text>
              </View>
              <Text style={styles.weatherDescription}>
                {weather.current_weather.temperature > 20 ? 'Pleasant' : 'Cool'}
              </Text>
            </Card>

            <View style={styles.detailsContainer}>
              <Card style={styles.detailCard}>
                <Wind color="#34C759" size={24} strokeWidth={2} />
                <Text style={styles.detailValue}>
                  {Math.round(weather.current_weather.windspeed)} km/h
                </Text>
                <Text style={styles.detailLabel}>Wind Speed</Text>
              </Card>

              <Card style={styles.detailCard}>
                <Droplets color="#007AFF" size={24} strokeWidth={2} />
                <Text style={styles.detailValue}>
                  {weather.hourly.precipitation[0] || 0}mm
                </Text>
                <Text style={styles.detailLabel}>Precipitation</Text>
              </Card>
            </View>

            <Card>
              <Text style={styles.sectionTitle}>Hourly Forecast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.hourlyContainer}>
                  {weather.hourly.temperature_2m.slice(0, 12).map((temp, index) => (
                    <View key={index} style={styles.hourlyItem}>
                      <Text style={styles.hourlyTime}>
                        {new Date(weather.hourly.time[index]).getHours()}:00
                      </Text>
                      <Sun color="#FF9500" size={20} strokeWidth={2} />
                      <Text style={styles.hourlyTemp}>{Math.round(temp)}°</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </Card>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  mainWeatherCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  currentWeather: {
    alignItems: 'center',
    marginBottom: 16,
  },
  temperature: {
    fontSize: 64,
    fontWeight: '200',
    color: '#1D1D1F',
    marginTop: 8,
  },
  weatherDescription: {
    fontSize: 18,
    color: '#8E8E93',
    fontWeight: '500',
  },
  detailsContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  detailCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D1D1F',
    marginTop: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 16,
  },
  hourlyContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 16,
  },
  hourlyItem: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    minWidth: 60,
  },
  hourlyTime: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  hourlyTemp: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D1D1F',
  },
});