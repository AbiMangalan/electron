# Renderer Process Directory

This directory contains all code that runs in Electron's renderer processes (the browser windows).

The renderer process is responsible for:
- User interface
- Direct user interaction
- Displaying content
- Browser-based operations

For security reasons, renderer process code should:
- Avoid direct Node.js access
- Use IPC to communicate with the main process for privileged operations
- Follow web security best practices