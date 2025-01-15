# CalcVerse

CalcVerse is a versatile app that combines a **Basic Calculator**, **Unit Converter**, and **Currency Converter** with real-time updates. Built using Electron and TypeScript, this app is part of my **GPTPROJECTS**, where I create apps leveraging the power of ChatGPT. **CalcVerse** is the second project in this series.

## GPTPROJECTS

**GPTPROJECTS** is a collection of applications I create using ChatGPT to assist with the development process. These projects explore various technologies and use cases, with ChatGPT guiding the design, architecture, and coding.

CalcVerse, the second project, offers a feature-packed experience with a calculator, unit conversion, and real-time currency conversion. You can contribute to this project by forking the repo and submitting pull requests with new features or bug fixes.

---

## Features

- **Basic Calculator Functionality**: Supports arithmetic operations like addition, subtraction, multiplication, and division.
- **Unit Converter**: Easily convert between different units (e.g., length, weight, volume, temperature).
- **Currency Converter**: Real-time updates with live currency exchange rates.
- **History Tracking**: Stores past calculations and results, with the ability to view and delete them.
- **Light/Dark Mode**: Adjust the theme according to your preferences.
- **App Hides on Blur**: The app can hide when it loses focus, and restore when refocused.
- **Cross-platform**: Built using Electron for easy distribution across different platforms.

---

## How to Download

To download and run **CalcVerse**, follow these instructions:

### Downloading the App

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aaravsagar/CalcVerse.git
   cd CalcVerse
Install dependencies: You need to have Node.js installed on your machine. Once you have Node.js, run the following command:
```bash

npm install
```
How to Build the App
To build CalcVerse for your platform, follow these steps:

Install Electron Builder (if not already installed):
```
npm install --save-dev electron-builder
```
Build the app: Run the following command to build the app for your platform:
```
npm run build
```
Note: The build process is not fully functional yet, so it's recommended to run the app in development mode for the best experience.


How to Run the App in Development Mode
We recommend running CalcVerse using the following command as the build isn't fully functional yet:

```
npm run dev
```
This will launch the app and allow you to see any changes in real-time as you modify the source code. Live reloading will be enabled for easy development.

Contributing
We welcome contributions!

You can contribute to CalcVerse by:

Forking the repository.
Creating a pull request with any new features or bug fixes you have added.
When submitting pull requests, please ensure the following:

Follow coding standards: Ensure that your code is clean, readable, and adheres to the existing code style.
Write tests: If applicable, include tests for any new features or bug fixes.
Describe your changes: Provide a clear explanation of what you’ve changed and why.
License
CalcVerse is licensed under the MIT License. See LICENSE for more information.

Project Structure
src: Contains the source code for the app.
main: Main Electron process code (handling the window and IPC).
renderer: The renderer process code (front-end logic, HTML, and CSS).
public: Contains the static assets like the app icon.
dist: The build output directory.
Acknowledgements
This app is part of GPTPROJECTS, where I explore building apps with the assistance of ChatGPT. Special thanks to ChatGPT for helping guide the development process.

Contact
If you have any questions, feel free to reach out to me at [aaravsagar29009@gmail.com].

