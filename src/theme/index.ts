import {palette, gradients, radii} from './colors';
import {typography} from './typography';

export const theme = {
  palette,
  gradients,
  radii,
  typography,
  spacing: (factor: number) => factor * 8,
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 18,
      shadowOffset: {width: 0, height: 10},
      elevation: 10,
    },
  },
};

export type Theme = typeof theme;
