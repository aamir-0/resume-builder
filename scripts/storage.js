import { userData } from '../data/user_data.js';

export function saveToLocalStorage() {
    try {
        localStorage.setItem('resumeData', JSON.stringify(userData));
        showNotification('Resume data saved successfully!', 'success');
        return true;
    } catch (error) {
        showNotification('Error saving data: ' + error.message, 'error');
        return false;
    }
}

export function loadFromLocalStorage() {
    try {
        const resumeString = localStorage.getItem('resumeData');
        if (resumeString) {
            const parsedData = JSON.parse(resumeString);
            populateFormFields(parsedData);
            showNotification('Previous data loaded!', 'info');
            return parsedData;
        }
    } catch (error) {
        console.error('Error loading data:', error);
        showNotification('Error loading saved data', 'error');
    }
    return null;
}

export function populateFormFields(data) {
    // Personal info
    if (data.personal_info) {
        Object.entries(data.personal_info).forEach(([key, value]) => {
            const input = document.querySelector(`.${key}`) || document.querySelector(`.js_${key}`);
            if (input && value) {
                input.value = value;
            }
        });
    }

    // Education
    if (data.education && data.education.length > 0) {
        Object.entries(data.education[0]).forEach(([key, value]) => {
            const input = document.querySelector(`.${key}`);
            if (input && value) {
                input.value = value;
            }
        });
    }

    // Work Experience
    if (data.work_experience && data.work_experience.length > 0) {
        Object.entries(data.work_experience[0]).forEach(([key, value]) => {
            const input = document.querySelector(`.${key}`);
            if (input && value) {
                input.value = value;
            }
        });
    }

    // Projects
    if (data.projects && data.projects.length > 0) {
        Object.entries(data.projects[0]).forEach(([key, value]) => {
            const input = document.querySelector(`.${key}`);
            if (input && value) {
                input.value = value;
            }
        });
    }

    // Skills
    if (data.skills && data.skills.length > 0) {
        Object.entries(data.skills[0]).forEach(([key, value]) => {
            const input = document.querySelector(`.${key}`);
            if (input && value) {
                input.value = value;
            }
        });
    }

    // Achievements
    if (data.achievements) {
        Object.entries(data.achievements).forEach(([key, values]) => {
            const input = document.querySelector(`.${key}`);
            if (input && Array.isArray(values)) {
                input.value = values.join(', ');
            }
        });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        color: white;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.style.opacity = '1', 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}