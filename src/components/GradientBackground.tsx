import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '@theme/index';

type Props = {
  children: ReactNode;
  variant?: 'primary' | 'accent';
  paddingHorizontal?: number;
};

export const GradientBackground: React.FC<Props> = ({
  children,
  variant = 'primary',
  paddingHorizontal = theme.spacing(2),
}) => (
  <LinearGradient
    colors={theme.gradients[variant]}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    style={[styles.container, {paddingHorizontal}]}>
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.spacing(3),
  },
});

export default GradientBackground;
