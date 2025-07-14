import { userData } from '../data/user_data.js';
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // to get all lottie-player elements in the sidebar
    const lottieAnimations = document.querySelectorAll('.side_bar lottie-player');
    
//loop through all LA in sidebar
    lottieAnimations.forEach(animation => {
        const parentLi = animation.closest('li');
        
        // Start animation on of li
        parentLi.addEventListener('mouseenter', () => {
            animation.play();
        });

       //animation on click for mobile devices
        parentLi.addEventListener('click', () => {
            
            animation.stop();
            animation.play();
        });
    

        // Stop animation when hover ends
        parentLi.addEventListener('mouseleave', () => {
            animation.stop();
        });
        
       
    });
    
    console.log('Lottie hover animations initialized');


    function setupInputHandlers() {
        // Defined input mappings for each section
        const inputMappings = {
            
            personal_info: {
                '.js_name': 'name',
                '.js_email': 'email', 
                '.js_phone_no': 'phone_no',
                '.address_js': 'address',
                '.linkedin': 'linkedin',
                '.github': 'github',
                '.portfolio': 'portfolio'
            },
            
           
            education: {
                '.school_name': 'school_name',
                '.degree': 'degree',
                '.field_of_study': 'field_of_study',
                '.graduation_year': 'graduation_year',
                '.gpa': 'gpa'
            },
            
       
            work_experience: {
                '.company_name': 'company_name',
                '.job_title': 'job_title',
                '.start_date': 'start_date',
                '.end_date': 'end_date',
                '.job_description': 'job_description'
            },
            
            
            projects: {
                '.project_name': 'project_name',
                '.project_description': 'project_description',
                '.technologies_used': 'technologies_used',
                '.project_url': 'project_url',
                '.project_github': 'project_github'
            },


            skills:{
                '.technical_skills':'',
                '.soft_skills':'soft_skills',
                '.languages':'languages',
                '.certifications':'certifications'
            },

            achievements: {
                '.awards': 'awards',
                '.publications': 'publications',
                '.volunteer_work': 'volunteer_work'
                }
        };

        // Setup personal_info object in user_data arr for inputs 
        Object.entries(inputMappings.personal_info).forEach(([selector, property]) => {
            const input = document.querySelector(selector);
            if (input) {
                input.addEventListener('input', function() {
                    userData.personal_info[property] = this.value;//this.value gets the value of the input field(whatever user types)
                    
                });
            }
        });

        // Setup education inputs 
        Object.entries(inputMappings.education).forEach(([selector, property]) => {
            const input = document.querySelector(selector);
            if (input) {
                input.addEventListener('input', function() {
                    // Initialize first education entry if it doesn't exist
                    if (!userData.education[0]) {
                        userData.education[0] = {};
                    }
                    userData.education[0][property] = this.value;
                    
                });
            }
        });

        // Setup work experience inputs
        Object.entries(inputMappings.work_experience).forEach(([selector, property]) => {
            const input = document.querySelector(selector);
            if (input) {
                input.addEventListener('input', function() {
                    if (!userData.work_experience[0]) {
                        userData.work_experience[0] = {};
                    }
                    userData.work_experience[0][property] = this.value;
                    
                });
            }
        });

        // Setup project inputs 
        Object.entries(inputMappings.projects).forEach(([selector, property]) => {
            const input = document.querySelector(selector);
            if (input) {
                input.addEventListener('input', function() {
                    if (!userData.projects[0]) {
                        userData.projects[0] = {};
                    }
                    userData.projects[0][property] = this.value;
                    
                });
            }
        });

//setup skills inputs
        Object.entries(inputMappings.skills).forEach(([selector, property]) => {
            const input = document.querySelector(selector);
            if(input){
                input.addEventListener('input', function() {
                    userData.skills[0][property] = this.value;  
                });
            }
        })

        // Setup achievements inputs
        Object.entries(inputMappings.achievements).forEach(([selector, property]) => {
            const input = document.querySelector(selector);
            if(input){
                input.addEventListener('input', function() {
                   
                    if (!userData.achievements) {
                        userData.achievements = {};
                    }
                    if (!userData.achievements[property]) {
                        userData.achievements[property] = [];
                    }
                    userData.achievements[property].push(this.value); //should i use array or object?
                });
            }
        })

        console.log('All input handlers initialized');
    }

    // Call the function to initialize input handlers
    setupInputHandlers();
});

if(userData){
console.log('User data initialized:', userData);
}