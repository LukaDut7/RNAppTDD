# Minimal Requirement

* Displays the text "Hello there" in the middle of the screen
* Tapping anywhere on the screen, a background color should be animated to a randomly generated color.

# Bonus improvements

- Single tap for background color slowly change to from right side to left side as it looks like spread
- long tap will cause "Hello there" animate to disapear and after release enter screen with animation
- double tap will bring bottom popup with listview in it.
  - view will have randomly generated color palate
  - tapping it will cause background color to animate

# UI Design

- Screens
  - screens/MainScreen.tsx - One screen has changing background color "hello there" text in it
    - Animated expo-linear-gradient - for background
- Components
  - bottom popup with listview in it.
    - @gorhom/bottom-sheet

# Logic Design

- Lib
  - genRandomColor() : generate random color and returns it
- hooks
  - useBackgroundAnimation() : provide animatedProps to Animated expo-linear-gradient componenet
  - useLongTapTextAnimation(): provied anmiatedProps to Animated Text component
  - useTapListeners(): provide handlers for single, long, double tap

# Unit Test

# E2E test
