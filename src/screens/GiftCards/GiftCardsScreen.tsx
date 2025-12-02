import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import PrimaryButton from '@components/PrimaryButton';
import {useFetch} from '@hooks/useFetch';
import {listGiftCardTypes, listGiftCardHistory} from '@api/giftcards';
import {theme} from '@theme/index';

const GiftCardsScreen: React.FC = () => {
  const navigation = useNavigation();
  const {data: cards, loading} = useFetch(listGiftCardTypes, []);
  const {data: history} = useFetch(listGiftCardHistory, []);

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Gift cards</Text>
          <PrimaryButton
            label="Submit"
            onPress={() => navigation.navigate('SubmitGiftCard' as never)}
            style={{minWidth: 120}}
          />
        </View>

        <Text style={styles.sectionTitle}>Top rates</Text>
        {cards?.data?.map(card => (
          <GlassCard key={card.id} style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>{card.name}</Text>
              <Text style={styles.cardSubtitle}>
                {card.country} • {card.currency}
              </Text>
            </View>
            <Text style={styles.cardRate}>{card.rate}%</Text>
          </GlassCard>
        ))}
        {loading ? <Text style={styles.muted}>Loading rates…</Text> : null}

        <Text style={styles.sectionTitle}>Recent submissions</Text>
        {history?.data?.length ? (
          history.data.map(item => (
            <GlassCard key={item.id} style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>{item.card_type}</Text>
                <Text style={styles.cardSubtitle}>{item.status}</Text>
              </View>
              <Text style={styles.cardRate}>₦{item.amount}</Text>
            </GlassCard>
          ))
        ) : (
          <GlassCard>
            <Text style={styles.muted}>No submissions yet.</Text>
          </GlassCard>
        )}
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing(1.5),
    paddingBottom: theme.spacing(3),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
  },
  sectionTitle: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  cardSubtitle: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  cardRate: {
    color: theme.palette.cyan,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  muted: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
});

export default GiftCardsScreen;
