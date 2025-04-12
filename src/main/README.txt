# Main Process Directory

This directory contains all code that runs in Electron's main process.

The main process is responsible for:
- Application lifecycle management
- Native OS integration
- Creating browser windows
- Managing the app menu and tray icons
- File system access
- Any Node.js functionality that shouldn't be exposed to the renderer

Key files:
- main.js: The entry point for the Electron application
- preload.js: Scripts that run before the renderer process loads, providing secure bridges to Node.js functionality