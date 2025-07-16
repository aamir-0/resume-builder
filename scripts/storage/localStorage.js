import { getUserData } from '../data/userData.js';
import { showNotification } from '../ui/notifications.js';

// Local Storage functions
export function saveToLocalStorage() {
    try {
        const userData = getUserData();
        localStorage.setItem('resumeData', JSON.stringify(userData));
        showNotification('Resume data saved successfully!', 'success');
        console.log('Data saved to localStorage');
        return true;
    } catch (error) {
        showNotification('Error saving data: ' + error.message, 'error');
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

export function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            populateFormFields(parsedData);
            showNotification('Previous data loaded!', 'info');
            console.log('Data loaded from localStorage');
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
}

function populateFormFields(data) {
    // Personal info
    if (data.personal_info) {
        Object.entries(data.personal_info).forEach(([key, value]) => {
            const input = document.querySelector(`.js_${key}`) || document.querySelector(`.${key}_js`) || document.querySelector(`.${key}`);
            if (input && value) {
                input.value = value;
            }
        });
    }

    // Education
    if (data.education && data.education[0]) {
        Object.entries(data.education[0]).forEach(([key, value]) => {
            const input = document.querySelector(`.${key}`);
            if (input && value) {
                input.value = value;
            }
        });
    }

    // Work Experience
    if (data.work_experience && data.work_experience[0]) {
        Object.entries(data.work_experience[0]).forEach(([key, value]) => {
            const input = document.querySelector(`.${key}`);
            if (input && value) {
                input.value = value;
            }
        });
    }

    // Projects
    if (data.projects && data.projects[0]) {
        Object.entries(data.projects[0]).forEach(([key, value]) => {
            const input = document.querySelector(`.${key}`);
            if (input && value) {
                input.value = value;
            }
        });
    }

    // Skills
    if (data.skills && data.skills[0]) {
        Object.entries(data.skills[0]).forEach(([key, value]) => {
            const input = document.querySelector(`.${key}`);
            if (input && value) {
                input.value = value;
            }
        });
    }

    // Achievements
    if (data.achievements) {
        Object.entries(data.achievements).forEach(([key, value]) => {
            const input = document.querySelector(`.${key}`);
            if (input && value) {
                input.value = value;
            }
        });
    }

    console.log('Form fields populated with saved data');
}
