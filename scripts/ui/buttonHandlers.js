import { saveToLocalStorage } from '../storage/localStorage.js';
import { generateResume , generateImprovedResume } from '../pdf/pdfGenerator.js';
import { getUserData } from '../data/userData.js';

// Function to collect data directly from form fields
function collectDataFromFormFields() {
    const formData = {
        personal_info: {
            name: document.querySelector('.js_name')?.value || '',
            email: document.querySelector('.js_email')?.value || '',
            phone_no: document.querySelector('.js_phone_no')?.value || '',
            address: document.querySelector('.address_js')?.value || '',
            linkedin: document.querySelector('.linkedin')?.value || '',
            github: document.querySelector('.github')?.value || '',
            portfolio: document.querySelector('.portfolio')?.value || ''
        },
        education: [{
            school_name: document.querySelector('.school_name')?.value || '',
            degree: document.querySelector('.degree')?.value || '',
            field_of_study: document.querySelector('.field_of_study')?.value || '',
            graduation_year: document.querySelector('.graduation_year')?.value || '',
            gpa: document.querySelector('.gpa')?.value || ''
        }],
        work_experience: [{
            company_name: document.querySelector('.company_name')?.value || '',
            job_title: document.querySelector('.job_title')?.value || '',
            start_date: document.querySelector('.start_date')?.value || '',
            end_date: document.querySelector('.end_date')?.value || '',
            job_description: document.querySelector('.job_description')?.value || ''
        }],
        projects: [{
            project_name: document.querySelector('.project_name')?.value || '',
            project_description: document.querySelector('.project_description')?.value || '',
            technologies_used: document.querySelector('.technologies_used')?.value || '',
            project_url: document.querySelector('.project_url')?.value || '',
            project_github: document.querySelector('.project_github')?.value || ''
        }],
        skills: [{
            technical_skills: document.querySelector('.technical_skills')?.value || '',
            soft_skills: document.querySelector('.soft_skills')?.value || '',
            languages: document.querySelector('.languages')?.value || '',
            certifications: document.querySelector('.certifications')?.value || ''
        }],
        achievements: {
            awards: document.querySelector('.awards')?.value || '',
            publications: document.querySelector('.publications')?.value || '',
            volunteer_work: document.querySelector('.volunteer_work')?.value || '',
            other_achievements: document.querySelector('.other_achievements')?.value || ''
        }
    };
    return formData;
}

// Submit button functionality
export function setupSubmitButton() {
    const submitBtn = document.querySelector('.js_submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            console.log('Submit button clicked');
            
            // Save to localStorage first
            saveToLocalStorage();
            
            // Generate PDF with current user data
            const currentUserData = getUserData();
            
            // Check if data is empty and collect from form fields directly
            if (!currentUserData.personal_info.name) {
                const formData = collectDataFromFormFields();
                generateImprovedResume(formData);
            } else {
                generateImprovedResume(currentUserData);
            }
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
