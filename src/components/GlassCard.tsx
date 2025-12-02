import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {theme} from '@theme/index';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  padding?: number;
};

export const GlassCard: React.FC<Props> = ({children, style, padding}) => {
  return (
    <View style={[styles.card, padding ? {padding} : null, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.palette.card,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.palette.stroke,
    padding: theme.spacing(2),
    ...theme.shadow.card,
  },
});

export default GlassCard;
