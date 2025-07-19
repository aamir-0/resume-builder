// Main application entry point - imports all modules
import { initializeLottieAnimations } from './animations/lottieHandler.js';
import { setupInputHandlers } from './forms/inputHandler.js';
import { setupSubmitButton, setupSaveButton } from './ui/buttonHandlers.js';
import { loadFromLocalStorage } from './storage/localStorage.js';
import { initializePreview } from './ui/previewHandler.js';

console.log('Script loaded successfully!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Initialize all functionality using modular imports
    initializeLottieAnimations();
    setupInputHandlers();
    setupSubmitButton();
    setupSaveButton();
    loadFromLocalStorage();
    initializePreview();

    function loadDummyData() {
        console.log('Loading dummy data into form...');
        
        const dummyData = {
            personal_info: {
                name: "Ananya Sharma",
                email: "ananya.sharma@gmail.com",
                phone_no: "+91-9876543210",
                address: "A-25, Green Park, New Delhi, India",
                linkedin: "https://linkedin.com/in/ananya-sharma",
                github: "https://github.com/ananya-sharma",
                portfolio: "https://ananyasharma.dev"
            },
            education: [
                {
                    school_name: "Indian Institute of Technology (IIT) Bombay",
                    degree: "Bachelor of Technology",
                    field_of_study: "Computer Science and Engineering",
                    graduation_year: "2025",
                    gpa: "9.2 / 10"
                }
            ],
            work_experience: [
                {
                    company_name: "Tata Consultancy Services",
                    job_title: "Software Engineering Intern",
                    start_date: "May 2024",
                    end_date: "July 2024",
                    job_description: "Worked on developing scalable REST APIs for internal tools. Improved database performance by 20% through query optimization."
                }
            ],
            projects: [
                {
                    project_name: "Smart Resume Builder",
                    project_description: "A web app to help users generate professional resumes using AI suggestions and export them to PDF.",
                    technologies_used: "React, Tailwind CSS, Node.js, pdfMake",
                    project_url: "https://smartresume.ai",
                    project_github: "https://github.com/ananya-sharma/smart-resume-builder"
                }
            ],
            skills: [
                {
                    technical_skills: "JavaScript, Python, React, Node.js, SQL, Git, Firebase",
                    soft_skills: "Team collaboration, Public speaking, Time management, Critical thinking",
                    languages: "English, Hindi, Marathi",
                    certifications: "Google Cloud Essentials, Microsoft Azure AI Fundamentals, HackerRank Python (Gold)"
                }
            ],
            achievements: {
                awards: "Winner - Smart India Hackathon 2023, Top 1% - LeetCode Weekly Contest #312",
                publications: "Paper on 'AI in EdTech' - Published in IEEE Xplore, 2024",
                volunteer_work: "Mentor at Girls Who Code India, Technical Head, Coding Club IIT Bombay",
                other_achievements: ""
            }
        };

        // Fill personal info fields
        Object.entries(dummyData.personal_info).forEach(([key, value]) => {
            const input = document.querySelector(`.js_${key}`) || 
                         document.querySelector(`.${key}_js`) || 
                         document.querySelector(`.${key}`);
            if (input) {
                input.value = value;
                // Trigger input event to update userData
               
            }
        });

        // Fill education fields
        if (dummyData.education[0]) {
            Object.entries(dummyData.education[0]).forEach(([key, value]) => {
                const input = document.querySelector(`.${key}`);
                if (input) {
                    input.value = value;
                   
                }
            });
        }

        // Fill work experience fields
        if (dummyData.work_experience[0]) {
            Object.entries(dummyData.work_experience[0]).forEach(([key, value]) => {
                const input = document.querySelector(`.${key}`);
                if (input) {
                    input.value = value;
                    
                }
            });
        }

        // Fill project fields (only first project for now)
        if (dummyData.projects[0]) {
            Object.entries(dummyData.projects[0]).forEach(([key, value]) => {
                const input = document.querySelector(`.${key}`);
                if (input) {
                    input.value = value;
                   
                }
            });
        }

        // Fill skills fields
        if (dummyData.skills[0]) {
            Object.entries(dummyData.skills[0]).forEach(([key, value]) => {
                const input = document.querySelector(`.${key}`);
                if (input) {
                    input.value = value;
                    
        }});
        
        }

        // Fill achievements fields
        Object.entries(dummyData.achievements).forEach(([key, value]) => {
            const input = document.querySelector(`.${key}`);
            if (input) {
                input.value = value;
               
            }
        });

        console.log('Dummy data loaded successfully!');
    }



    // Call the function to load dummy data
    loadDummyData();
    
});
