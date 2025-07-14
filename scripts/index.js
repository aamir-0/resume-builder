import { userData } from '../data/user_data.js';
import {intanimation} from './animation.js';
import {setupInputHandlers} from './inputhandler.js';
import { saveToLocalStorage, loadFromLocalStorage ,populateFormFields} from './storage.js';
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // to get all lottie-player elements in the sidebar
     intanimation();


    // Call the function to initialize input handlers
    setupInputHandlers();

     saveToLocalStorage()
        

    document.querySelector('.save_js').addEventListener('click', function() {
        // Convert userData to JSON and save it
       saveToLocalStorage();
    });//end of save button click event

        function populateFormFields(data) {
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
                    input.value = values.join(', '); // Join array values with a comma
                }
            });
        }
    }


    function loadFromLocalStorage(){
        try{
        const resumeString=localStorage.getItem('resumeData');
        const parseString=JSON.parse(resumeString);
        populateFormFields(parseString);
        }catch{
            console.error('some error occured while loading the data')
        }
    }

      function generateResume() {
      const docDefinition = {
        content: [
          { text: userData.personal_info.name, style: 'header' },
          { text: `${userData.personal_info.email} | ${userData.personal_info.phone_no} | ${userData.personal_info.address}`, style: 'subheader' },
          { text: `${userData.personal_info.linkedin} | ${userData.personal_info.github} | ${userData.personal_info.portfolio}`, style: 'subheader' },
          { text: '\nEducation', style: 'sectionHeader' },
          ...userData.education.map(edu => ({
            margin: [0, 2],
            ul: [
              `${edu.degree} in ${edu.field_of_study} - ${edu.school_name} (${edu.graduation_year})`,
              `GPA: ${edu.gpa}`
            ]
          })),
          { text: '\nWork Experience', style: 'sectionHeader' },
          ...userData.work_experience.map(exp => ({
            margin: [0, 2],
            ul: [
              `${exp.job_title} at ${exp.company_name} (${exp.start_date} – ${exp.end_date})`,
              exp.job_description
            ]
          })),
          { text: '\nProjects', style: 'sectionHeader' },
          ...userData.projects.map(proj => ({
            margin: [0, 2],
            ul: [
              `${proj.project_name}: ${proj.project_description}`,
              `Technologies: ${proj.technologies_used}`,
              `Live: ${proj.project_url}`,
              `GitHub: ${proj.project_github}`
            ]
          })),
          { text: '\nSkills', style: 'sectionHeader' },
          ...userData.skills.map(skill => ({
            margin: [0, 2],
            ul: [
              `Technical Skills: ${skill.technical_skills}`,
              `Soft Skills: ${skill.soft_skills}`,
              `Languages: ${skill.languages}`,
              `Certifications: ${skill.certifications}`
            ]
          })),
          { text: '\nAchievements', style: 'sectionHeader' },
          { text: 'Awards:', bold: true },
          { ul: userData.achievements.awards.length ? userData.achievements.awards : ['-'] },
          { text: 'Publications:', bold: true },
          { ul: userData.achievements.publications.length ? userData.achievements.publications : ['-'] },
          { text: 'Volunteer Work:', bold: true },
          { ul: userData.achievements.volunteer_work.length ? userData.achievements.volunteer_work : ['-'] }
        ],
        styles: {
          header: {
            fontSize: 22,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 10,
            margin: [0, 0, 0, 4],
            color: '#555555'
          },
          sectionHeader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 4],
            decoration: 'underline'
          }
        }
      };

      pdfMake.createPdf(docDefinition).download("resume.pdf");
    }

    document.querySelector('.js_submit').addEventListener('click', function() {
        // Call the function to generate the resume
        generateResume();
    });
});
