import { classes, vars } from '@/features/theme';
import { style, styleVariants } from '@vanilla-extract/css';

const baseContainer = style({
  width: 'fit-content',

  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  gap: '8px',
});

export const container = styleVariants({
  other: [baseContainer, {
    flexDirection: 'row',
  }],
  mine: [baseContainer, {
    flexDirection: 'row-reverse',
  }],
});

export const profile = style({
  width: '48px',
  height: '48px',
});

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '4px',
});

export const sender = style([classes.typography.title, {
  color: vars.color.glassSecondary.fillPrimary,
  fontWeight: 700,
}]);

const baseBubble = style({
  borderRadius: vars.radius.large,

  padding: '12px 18px',
});

export const bubble = styleVariants({
  other: [baseBubble, {
    backgroundColor: vars.color.solidSecondary.background,
    color: vars.color.solidSecondary.fillPrimary,

    borderBottomLeftRadius: 0,
  }],
  mine: [baseBubble, {
    backgroundColor: vars.color.primary.background,
    color: vars.color.primary.fillPrimary,

    borderBottomRightRadius: 0,
  }],
});

const baseInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',

  margin: '2px 4px',
});

export const infoContainer = styleVariants({
  other: [baseInfoContainer, {
    alignItems: 'flex-start',
  }],
  mine: [baseInfoContainer, {
    alignItems: 'flex-end',
  }],
});

export const unread = style([classes.typography.number1, {
  color: vars.color.glassSecondary.attention,
}]);

export const time = style([classes.typography.number1, {
  color: vars.color.glassSecondary.fillSecondary,
}]);
