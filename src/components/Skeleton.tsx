import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, ViewStyle} from 'react-native';
import {theme} from '@theme/index';

type Props = {
  width?: number | string;
  height?: number;
  style?: ViewStyle;
};

export const Skeleton: React.FC<Props> = ({width = '100%', height = 16, style}) => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return <Animated.View style={[styles.base, {width, height, opacity}, style]} />;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.palette.surface,
    borderRadius: theme.radii.sm,
  },
});

export default Skeleton;
