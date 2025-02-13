# Minimal Requirement

* Displays the text "Hello there" in the middle of the screen
* Tapping anywhere on the screen, a background color should be animated to a randomly generated color.

# Bonus improvements

- long tap will cause "Hello there" animate to blink
- swipe up will bring bottom popup with listview in it.
  - view will have randomly generated color palate
  - tapping it will cause background color to animate to choosen color

# UI Design

- Screens
  - screens/MainScreen.tsx - One screen has changing background color "hello there" text in it
- Components
  - bottom popup with listview in it.
    - @gorhom/bottom-sheet

# Logic Design

- Lib
  - generateRandomColor() : generate random color and returns it
- hooks
  - useBackgroundAnimation() : provide animatedStyle to Animated componenet
  - useTextAnimation(): provied anmiatedStyle to Animated Text component
  - useGestureHandlers(): provide gesture handlers(tap, longtap, swipeup)

# Unit Test
- libraries to use
  - jest, @testing-library/react-native
- Things to test
  - generateRandomColor()
  - useBackgroundAnimation()
  - useTextAnimation()
  - useGestureHandlers()