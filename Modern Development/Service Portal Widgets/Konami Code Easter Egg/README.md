# Konami Code Easter Egg

Put this code in the client controller of a widget to listen for the Konami Code. By default it just opens a modal notifying the user that the konami code as activated. Modify to do whatever fun things you want.

## Version 2

[KonamiCodeEasterEggV2.js]("Modern Development\Service Portal Widgets\Konami Code Easter Egg\KonamiCodeEasterEggV2.js") is the same code but improved with:

1. Uses e.key instead of e.keyCode (which is deprecated) with modern arrow key names
2. Automatically tracks only the last N keypresses instead of manual position tracking
3. Resets the sequence if the user pauses too long (more forgiving UX)
4. Removes event listener when widget is destroyed to prevent memory leaks
5. Uses array join comparison instead of position tracking
6. Modern variable declarations for better scoping

<img width="314" height="205" alt="image" src="https://github.com/user-attachments/assets/ea39dbdf-c252-4f7f-942d-8f26319ca6e2" />
