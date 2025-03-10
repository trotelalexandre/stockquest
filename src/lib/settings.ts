export const IS_DEV = process.env.NODE_ENV === "development";

export const XP_ANIMATION_DURATION = 4000;

export const CONFETTI_ANIMATION_DURATION = 3000;
export const CONFETTI_NUMBER = 40;

export const BACKTEST_ANIMATION_DURATION = 500;

export const PORTFOLIO_STARTING_VALUE = 10000;

export const BASE_URL = IS_DEV
  ? "http://localhost:3000"
  : "https://stockquest.vercel.app";
