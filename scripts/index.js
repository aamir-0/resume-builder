// Main application entry point - imports all modules
import { initializeLottieAnimations } from './animations/lottieHandler.js';
import { setupInputHandlers } from './forms/inputHandler.js';
import { setupSubmitButton, setupSaveButton } from './ui/buttonHandlers.js';
import { loadFromLocalStorage } from './storage/localStorage.js';

console.log('Script loaded successfully!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Initialize all functionality using modular imports
    initializeLottieAnimations();
    setupInputHandlers();
    setupSubmitButton();
    setupSaveButton();
    loadFromLocalStorage();
    
    console.log('Resume builder initialized with modular architecture');
});
