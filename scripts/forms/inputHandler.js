import { updateUserData } from '../data/userData.js';

// Input handlers for form data
export function setupInputHandlers() {
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
                updateUserData('personal_info', property, this.value);
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
                updateUserData('education', property, this.value, 0);
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
                updateUserData('work_experience', property, this.value, 0);
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
                updateUserData('projects', property, this.value, 0);
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
                updateUserData('skills', property, this.value, 0);
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
                updateUserData('achievements', property, this.value);
            });
        }
    });

    console.log('Input handlers initialized');
}
