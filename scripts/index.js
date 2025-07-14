console.log('Script loaded successfully!');

// Simple data storage object
const userData = {
    personal_info: {
        name: '',
        email: '',
        phone_no: '',
        address: '',
        linkedin: '',
        github: '',
        portfolio: ''
    },
    education: [{
        school_name: '',
        degree: '',
        field_of_study: '',
        graduation_year: '',
        gpa: ''
    }],
    work_experience: [{
        company_name: '',
        job_title: '',
        start_date: '',
        end_date: '',
        job_description: ''
    }],
    projects: [{
        project_name: '',
        project_description: '',
        technologies_used: '',
        project_url: '',
        project_github: ''
    }],
    skills: [{
        technical_skills: '',
        soft_skills: '',
        languages: '',
        certifications: ''
    }],
    achievements: {
        awards: '',
        publications: '',
        volunteer_work: '',
        other_achievements: ''
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Initialize all functionality
    initializeLottieAnimations();
    setupInputHandlers();
    setupSubmitButton();
    setupSaveButton();
    loadFromLocalStorage();
    
    console.log('Resume builder initialized');
});

// Lottie animations functionality
function initializeLottieAnimations() {
    const lottieAnimations = document.querySelectorAll('.side_bar lottie-player');
    console.log('Found', lottieAnimations.length, 'lottie animations');
    
    lottieAnimations.forEach((animation, index) => {
        const parentLi = animation.closest('li');
        
        if (parentLi) {
            // Hover functionality
            parentLi.addEventListener('mouseenter', () => {
                console.log('Animation', index, 'hovered');
                animation.play();
            });

            // Click functionality for mobile + navigation
            parentLi.addEventListener('click', () => {
                console.log('Animation', index, 'clicked');
                animation.stop();
                animation.play();

                // Navigation functionality
                const sectionName = parentLi.querySelector('span').textContent.toLowerCase().trim();
                let targetSection = null;
                
                // Map section names to actual section IDs
                switch(sectionName) {
                    case 'personal':
                        targetSection = document.querySelector('#personal_info');
                        break;
                    case 'education':
                        targetSection = document.querySelector('#education');
                        break;
                    case 'experience':
                        targetSection = document.querySelector('#work_exp');
                        break;
                    case 'projects':
                        targetSection = document.querySelector('#projects');
                        break;
                    case 'skills':
                        targetSection = document.querySelector('#skills');
                        break;
                    case 'achievements':
                        targetSection = document.querySelector('#achivments');
                        break;
                    case 'save':
                        // Handle save button click in setupSaveButton function
                        return;
                }
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    console.log('Scrolled to', sectionName, 'section');
                }
            });

            // Stop animation when hover ends
            parentLi.addEventListener('mouseleave', () => {
                animation.stop();
            });
        }
    });
    
    console.log('Lottie animations initialized');
}

// Input handlers for form data
function setupInputHandlers() {
    // Personal Info inputs
    const personalInputs = {
        '.js_name': 'name',
        '.js_email': 'email',
        '.js_phone_no': 'phone_no',
        '.address_js': 'address',
        '.linkedin': 'linkedin',
        '.github': 'github',
        '.portfolio': 'portfolio'
    };

    // Setup personal info inputs
    Object.entries(personalInputs).forEach(([selector, property]) => {
        const input = document.querySelector(selector);
        if (input) {
            input.addEventListener('input', function() {
                userData.personal_info[property] = this.value;
                console.log(`Personal ${property} updated:`, this.value);
            });
        }
    });

    // Education inputs
    const educationInputs = {
        '.school_name': 'school_name',
        '.degree': 'degree',
        '.field_of_study': 'field_of_study',
        '.graduation_year': 'graduation_year',
        '.gpa': 'gpa'
    };

    Object.entries(educationInputs).forEach(([selector, property]) => {
        const input = document.querySelector(selector);
        if (input) {
            input.addEventListener('input', function() {
                if (!userData.education[0]) {
                    userData.education[0] = {};
                }
                userData.education[0][property] = this.value;
                console.log(`Education ${property} updated:`, this.value);
            });
        }
    });

    // Work Experience inputs
    const workInputs = {
        '.company_name': 'company_name',
        '.job_title': 'job_title',
        '.start_date': 'start_date',
        '.end_date': 'end_date',
        '.job_description': 'job_description'
    };

    Object.entries(workInputs).forEach(([selector, property]) => {
        const input = document.querySelector(selector);
        if (input) {
            input.addEventListener('input', function() {
                if (!userData.work_experience[0]) {
                    userData.work_experience[0] = {};
                }
                userData.work_experience[0][property] = this.value;
                console.log(`Work Experience ${property} updated:`, this.value);
            });
        }
    });

    // Projects inputs
    const projectInputs = {
        '.project_name': 'project_name',
        '.project_description': 'project_description',
        '.technologies_used': 'technologies_used',
        '.project_url': 'project_url',
        '.project_github': 'project_github'
    };

    Object.entries(projectInputs).forEach(([selector, property]) => {
        const input = document.querySelector(selector);
        if (input) {
            input.addEventListener('input', function() {
                if (!userData.projects[0]) {
                    userData.projects[0] = {};
                }
                userData.projects[0][property] = this.value;
                console.log(`Project ${property} updated:`, this.value);
            });
        }
    });

    // Skills inputs
    const skillsInputs = {
        '.technical_skills': 'technical_skills',
        '.soft_skills': 'soft_skills',
        '.languages': 'languages',
        '.certifications': 'certifications'
    };

    Object.entries(skillsInputs).forEach(([selector, property]) => {
        const input = document.querySelector(selector);
        if (input) {
            input.addEventListener('input', function() {
                if (!userData.skills[0]) {
                    userData.skills[0] = {};
                }
                userData.skills[0][property] = this.value;
                console.log(`Skills ${property} updated:`, this.value);
            });
        }
    });

    // Achievements inputs
    const achievementInputs = {
        '.awards': 'awards',
        '.publications': 'publications',
        '.volunteer_work': 'volunteer_work',
        '.other_achievements': 'other_achievements'
    };

    Object.entries(achievementInputs).forEach(([selector, property]) => {
        const input = document.querySelector(selector);
        if (input) {
            input.addEventListener('input', function() {
                userData.achievements[property] = this.value;
                console.log(`Achievement ${property} updated:`, this.value);
            });
        }
    });

    console.log('Input handlers initialized');
}

// Submit button functionality
function setupSubmitButton() {
    const submitBtn = document.querySelector('.js_submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            console.log('Submit button clicked');
            console.log('Current userData:', userData);
            
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
function setupSaveButton() {
    const saveBtn = document.querySelector('.save_js');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            console.log('Save button clicked');
            saveToLocalStorage();
        });
        console.log('Save button event added');
    }
}

// Local Storage functions
function saveToLocalStorage() {
    try {
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

function loadFromLocalStorage() {
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

// PDF Generation function
function generateResume() {
    console.log('Generating PDF...');
    
    const docDefinition = {
        content: [
            { text: userData.personal_info.name || 'Your Name', style: 'header' },
            { text: `${userData.personal_info.email || ''} | ${userData.personal_info.phone_no || ''} | ${userData.personal_info.address || ''}`, style: 'subheader' },
            { text: `${userData.personal_info.linkedin || ''} | ${userData.personal_info.github || ''} | ${userData.personal_info.portfolio || ''}`, style: 'subheader' },
            
            { text: '\nEducation', style: 'sectionHeader' },
            { text: `${userData.education[0]?.degree || ''} in ${userData.education[0]?.field_of_study || ''}` },
            { text: `${userData.education[0]?.school_name || ''} - ${userData.education[0]?.graduation_year || ''}` },
            { text: userData.education[0]?.gpa ? `GPA: ${userData.education[0].gpa}` : '' },
            
            { text: '\nWork Experience', style: 'sectionHeader' },
            { text: `${userData.work_experience[0]?.job_title || ''} at ${userData.work_experience[0]?.company_name || ''}`, style: 'jobTitle' },
            { text: `${userData.work_experience[0]?.start_date || ''} - ${userData.work_experience[0]?.end_date || ''}` },
            { text: userData.work_experience[0]?.job_description || '' },
            
            { text: '\nProjects', style: 'sectionHeader' },
            { text: userData.projects[0]?.project_name || '', style: 'jobTitle' },
            { text: userData.projects[0]?.project_description || '' },
            { text: userData.projects[0]?.technologies_used ? `Technologies: ${userData.projects[0].technologies_used}` : '' },
            { text: userData.projects[0]?.project_url ? `Live: ${userData.projects[0].project_url}` : '' },
            { text: userData.projects[0]?.project_github ? `GitHub: ${userData.projects[0].project_github}` : '' },
            
            { text: '\nSkills', style: 'sectionHeader' },
            { text: userData.skills[0]?.technical_skills ? `Technical Skills: ${userData.skills[0].technical_skills}` : '' },
            { text: userData.skills[0]?.soft_skills ? `Soft Skills: ${userData.skills[0].soft_skills}` : '' },
            { text: userData.skills[0]?.languages ? `Languages: ${userData.skills[0].languages}` : '' },
            { text: userData.skills[0]?.certifications ? `Certifications: ${userData.skills[0].certifications}` : '' },
            
            { text: '\nAchievements', style: 'sectionHeader' },
            { text: userData.achievements.awards ? `Awards: ${userData.achievements.awards}` : '' },
            { text: userData.achievements.publications ? `Publications: ${userData.achievements.publications}` : '' },
            { text: userData.achievements.volunteer_work ? `Volunteer Work: ${userData.achievements.volunteer_work}` : '' },
            { text: userData.achievements.other_achievements ? `Other: ${userData.achievements.other_achievements}` : '' }
        ].filter(item => item.text !== ''), // Remove empty items
        
        styles: {
            header: {
                fontSize: 22,
                bold: true,
                margin: [0, 0, 0, 10],
                alignment: 'center'
            },
            subheader: {
                fontSize: 10,
                margin: [0, 0, 0, 4],
                color: '#555555',
                alignment: 'center'
            },
            sectionHeader: {
                fontSize: 14,
                bold: true,
                margin: [0, 10, 0, 4],
                decoration: 'underline'
            },
            jobTitle: {
                fontSize: 12,
                bold: true,
                margin: [0, 4, 0, 2]
            }
        }
    };

    try {
        pdfMake.createPdf(docDefinition).download("resume.pdf");
        showNotification('PDF generated successfully!', 'success');
        console.log('PDF generated successfully');
    } catch (error) {
        showNotification('Error generating PDF: ' + error.message, 'error');
        console.error('Error generating PDF:', error);
    }
}

// Notification function
function showNotification(message, type = 'info') {
    console.log(`Notification: ${message} (${type})`);
    
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
        font-family: Arial, sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.opacity = '1', 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
