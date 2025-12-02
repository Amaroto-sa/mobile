import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '@theme/index';

type Props = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

export const PrimaryButton: React.FC<Props> = ({
  label,
  onPress,
  disabled,
  loading,
  style,
}) => {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({pressed}) => [
        styles.pressable,
        pressed && {opacity: 0.92},
        isDisabled && {opacity: 0.6},
        style,
      ]}>
      <LinearGradient
        colors={theme.gradients.accent}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}>
        {loading ? (
          <ActivityIndicator color={theme.palette.textPrimary} />
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: theme.radii.md,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: theme.spacing(1.5),
    alignItems: 'center',
    borderRadius: theme.radii.md,
  },
  label: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-SemiBold',
    fontSize: 16,
  },
});

export default PrimaryButton;
