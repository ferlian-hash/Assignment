1. User Interface (Score: 4/4)

Includes a Navigation Bar (Tab Bar) created dynamically using React useState.

Users can add, remove, and update tabs in real time.

Contains Header and Footer components for consistent layout across all pages.

Has an About Page that provides additional information about the project.

The overall interface is responsive, modular, and easy to maintain.

2. Themes (Score: 3/3)

Supports both Light Mode and Dark Mode.

Theme switching is implemented using useState and toggling the dark class on the HTML element.

Background and text colors automatically adjust according to the selected mode.

The design follows a modern, clean approach using Tailwind CSS or CSS variables.

3. Hamburger Menu (Score: 3/3)

Implemented through the hamburgermenu.tsx component for responsive navigation.

Uses CSS Transform and translateX effects for smooth open/close animations.

Controlled with React useState to toggle the menu’s visibility.

The design is simple, interactive, and mobile-friendly.

4. Tabs Page (Operations) (Score: 6/6)

Allows users to create up to 15 tabs dynamically.

Tabs can be removed, renamed, and edited easily.

All tab data is managed using React useState.

Can be extended to use localStorage for saving data persistently.

The main logic is located in app/page.tsx.