import { saveToLocalStorage } from '../storage/localStorage.js';
import { generateResume } from '../pdf/pdfGenerator.js';

// Submit button functionality
export function setupSubmitButton() {
    const submitBtn = document.querySelector('.js_submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            console.log('Submit button clicked');
            
            // Save to localStorage first
            saveToLocalStorage();
            
            // Generate PDF
            generateResume();
        });
        console.log('Submit button event added');
    } else {
        console.error('Submit button not found');
    }
}

// Save button functionality
export function setupSaveButton() {
    const saveBtn = document.querySelector('.save_js');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            console.log('Save button clicked');
            saveToLocalStorage();
        });
        console.log('Save button event added');
    }
}
