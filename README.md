# TL-Shipper - Driver Rating & Review Panel

This project implements a fully interactive **Driver Rating & Review** experience built with **Expo (React Native)** and **TypeScript**, using **Gluestack UI**, **Nativewind**, and **Expo Router**.  

This project demonstrates advanced gesture-based interactions, sticky headers, and smooth draggable panels, closely following the provided design screens and flow video.

---

## Features

- **Draggable Panel**:
  - Supports three positions:
    - **Collapsed (COLLAPSED)**: Hidden view
    - **Mid (MID)**: Intermediate state for flexibility
    - **Expanded (EXPANDED)**: Full-screen
  - Panel can be dragged freely between all states
  - Smooth snapping with `Animated.spring`
  - Scroll enabled only in full-screen (expanded) mode

- **Full-Screen Expansion**:
  - Panel expands naturally while preserving the rating card scroll
  - Collapsed panel shows a partial view
  - Spring animation ensures responsive, natural motion

- **Sticky Header**:
  - Top section (rating card + driver info) scrolls internally
  - Header + sort/filter remain sticky using `stickyHeaderIndices`
  - Dynamic border appears on scroll for visual separation

- **Review List**:
  - Handles loading and empty states
  - Each review displays:
    - Star rating
    - Review text
    - Date / tags
  - Memoized sorting and filtering for performance

---

## Get started

1. **Clone the repository**
   
   ```bash
   git clone https://github.com/yourusername/repo-name.git
   cd repo-name
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app (run on iOS / Android / Web)

   ```bash
    npx expo start
   ```
   Scan the QR code with Expo Go or launch an emulator.

   In the output, you'll find options to open the app in a

      - [development build](https://docs.expo.dev/develop/development-builds/introduction/)
      - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
      - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
      - [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo 

5. Run specific platform:

   ```bash
   npm run android   # Android
   npm run ios       # iOS
   npm run web
   ```     



---

## Tech Stack

- React Native 0.81

- TypeScript 5.9

- Gluestack UI for component styling and layout

- Nativewind / TailwindCSS for utility-first styling

- Expo Router for file-based routing

- React Native Gesture Handler & Reanimated for smooth gestures & panel animations

- Vector Icons / Lucide Icons for icons

---

## Technical Choices

- Gluestack UI + Nativewind: Consistent, reusable, and responsive components

- Animated API + PanResponder: Smooth, gesture-driven draggable panel

- Sticky Header using stickyHeaderIndices: Rating info, sort, and filter stay visible

- Memoization (useMemo) for reviews: Efficient sorting and filtering

- Scroll control via refs and scrollEnabled: Prevent conflicts between dragging and scroll

---

## Code Overview

- **GRID_SIZE**: Size of the grid (5x5).  
- **OBSTACLES**: List of grid coordinates that cannot be entered.  
- **HAZARDS**: Grid coordinates with negative rewards and possible stochastic effects.  
- **GOAL**: The target state with positive reward.  
- **ACTIONS**: Possible moves (up, down, left, right).  
- **value_iteration()**: Main algorithm that computes values and policy.  
- **apply_stochastic_hazard()**: Applies random hazard effects in stochastic mode.  
- **print_value_function()** and **print_policy()**: Display results with colors.  

---

## Customization

- Modify grid size, obstacles, hazards, and rewards by changing the respective variables.  
- Adjust stochastic hazard probabilities (`HAZARD_TELEPORT_PROB`, `HAZARD_PUSH_PROB`).  
- Tweak discount factor (`GAMMA`) and action success probability (`ACTION_SUCCESS_PROB`).  

---

## References

- Sutton, R. S., & Barto, A. G. (2018). *Reinforcement Learning: An Introduction* (2nd ed.).  
- Classic grid world examples in reinforcement learning.  

---

## Contact

For questions or suggestions, please contact **Afia Anjum Tamanna**:

- Email: [afiatamanna06@gmail.com](mailto:afiatamanna06@gmail.com)  
- GitHub: [https://github.com/afiatamanna06](https://github.com/afiatamanna06)  
