import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import DashboardScreen from '@screens/Dashboard/DashboardScreen';
import FundingScreen from '@screens/Funding/FundingScreen';
import GiftCardsScreen from '@screens/GiftCards/GiftCardsScreen';
import SubmitGiftCardScreen from '@screens/GiftCards/SubmitGiftCardScreen';
import BankAccountsScreen from '@screens/Banks/BankAccountsScreen';
import WithdrawalsScreen from '@screens/Withdrawals/WithdrawalsScreen';
import BillsScreen from '@screens/Bills/BillsScreen';
import RewardsScreen from '@screens/Rewards/RewardsScreen';
import NotificationsScreen from '@screens/Notifications/NotificationsScreen';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import LoginScreen from '@screens/Auth/LoginScreen';
import RegisterScreen from '@screens/Auth/RegisterScreen';
import VerificationScreen from '@screens/Auth/VerificationScreen';
import {useSession} from '@hooks/useSession';
import {theme} from '@theme/index';

export type RootStackParamList = {
  Tabs: undefined;
  SubmitGiftCard: undefined;
  AddBank: undefined;
  Withdraw: undefined;
  Login: undefined;
  Register: undefined;
  VerifyEmail: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: theme.palette.deep,
        borderTopWidth: 0,
      },
    tabBarActiveTintColor: theme.palette.cyan,
    tabBarInactiveTintColor: theme.palette.textSecondary,
    }}>
    <Tab.Screen name="Home" component={DashboardScreen} />
    <Tab.Screen name="Cards" component={GiftCardsScreen} />
    <Tab.Screen name="Finance" component={FundingScreen} />
    <Tab.Screen name="Bills" component={BillsScreen} />
    <Tab.Screen name="Alerts" component={NotificationsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.palette.cyan,
    background: theme.palette.night,
    card: theme.palette.deep,
    text: theme.palette.textPrimary,
    border: theme.palette.stroke,
    notification: theme.palette.coral,
  },
};

export const RootNavigator = () => {
  const {authenticated, loading} = useSession(true);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={theme.palette.cyan} />
        <Text style={styles.loadingText}>Unlocking your session…</Text>
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      {loading ? null : authenticated ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="SubmitGiftCard" component={SubmitGiftCardScreen} />
          <Stack.Screen name="AddBank" component={BankAccountsScreen} />
          <Stack.Screen name="Withdraw" component={WithdrawalsScreen} />
          <Stack.Screen name="Rewards" component={RewardsScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="VerifyEmail" component={VerificationScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: theme.palette.night,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: theme.palette.textSecondary,
    marginTop: theme.spacing(1),
    fontFamily: 'SpaceGrotesk-Regular',
  },
});
