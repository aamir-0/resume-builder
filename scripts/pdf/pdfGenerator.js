import { getUserData } from '../data/userData.js';
import { showNotification } from '../ui/notifications.js';

// PDF Generation function
export function generateResume() {
    console.log('Generating PDF...');
    
    const userData = getUserData();
    
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
