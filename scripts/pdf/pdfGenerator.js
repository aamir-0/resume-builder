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

export function generateImprovedResume(data) {
  // Helper function to check if a value has content
  const hasContent = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
  };

  // Build contact info array, excluding empty fields
  const contactInfo = [];
  if (hasContent(data?.personal_info?.email)) contactInfo.push(data.personal_info.email);
  if (hasContent(data?.personal_info?.phone_no)) contactInfo.push(data.personal_info.phone_no);
  if (hasContent(data?.personal_info?.address)) contactInfo.push(data.personal_info.address);

  // Build links array, excluding empty fields
  const links = [];
  if (hasContent(data?.personal_info?.linkedin)) {
    links.push({ text: 'LinkedIn', link: data.personal_info.linkedin, style: 'link' });
  }
  if (hasContent(data?.personal_info?.github)) {
    links.push({ text: 'GitHub', link: data.personal_info.github, style: 'link' });
  }
  if (hasContent(data?.personal_info?.portfolio)) {
    links.push({ text: 'Portfolio', link: data.personal_info.portfolio, style: 'link' });
  }

  const content = [
    // Name (always include, fallback to "Your Name")
    { text: hasContent(data?.personal_info?.name) ? data.personal_info.name : "Your Name", style: 'name' }
  ];

  // Add contact info if any exists
  if (contactInfo.length > 0) {
    content.push({ text: contactInfo.join(' | '), style: 'contact', alignment: 'center', margin: [0, 5, 0, 5] });
  }

  // Add links if any exist
  if (links.length > 0) {
    content.push({
      table: {
        widths: Array(links.length).fill('*'),
        body: [links.map(link => ({ text: link.text, link: link.link, style: 'link', alignment: 'center' }))]
      },
      layout: 'noBorders',
      margin: [0, 0, 0, 10]
    });
  }

  // Education Section - only if data exists
  if (data?.education && data.education.length > 0) {
    const validEducation = data.education.filter(edu => 
      hasContent(edu?.degree) || hasContent(edu?.school_name) || hasContent(edu?.field_of_study)
    );
    
    if (validEducation.length > 0) {
      content.push({ text: 'Education', style: 'sectionHeader' });
      validEducation.forEach(edu => {
        const eduStack = [];
        
        if (hasContent(edu?.degree) || hasContent(edu?.field_of_study)) {
          const degreeText = `${edu?.degree || 'Degree'} in ${edu?.field_of_study || 'Field of Study'}`;
          eduStack.push({ text: degreeText, bold: true });
        }
        
        if (hasContent(edu?.school_name) || hasContent(edu?.graduation_year)) {
          const schoolText = `${edu?.school_name || 'School'}${edu?.graduation_year ? ` (${edu.graduation_year})` : ''}`;
          eduStack.push({ text: schoolText });
        }
        
        if (hasContent(edu?.gpa)) {
          eduStack.push({ text: `GPA: ${edu.gpa}` });
        }
        
        if (eduStack.length > 0) {
          content.push({ stack: eduStack, margin: [0, 5] });
        }
      });
    }
  }

  // Work Experience Section - only if data exists
  if (data?.work_experience && data.work_experience.length > 0) {
    const validWork = data.work_experience.filter(work => 
      hasContent(work?.job_title) || hasContent(work?.company_name) || hasContent(work?.job_description)
    );
    
    if (validWork.length > 0) {
      content.push({ text: 'Work Experience', style: 'sectionHeader' });
      validWork.forEach(work => {
        const workStack = [];
        
        if (hasContent(work?.job_title) || hasContent(work?.company_name)) {
          const jobText = `${work?.job_title || 'Position'} at ${work?.company_name || 'Company'}`;
          workStack.push({ text: jobText, bold: true });
        }
        
        if (hasContent(work?.start_date) || hasContent(work?.end_date)) {
          const dateText = `${work?.start_date || 'Start'} – ${work?.end_date || 'End'}`;
          workStack.push({ text: dateText, italics: true });
        }
        
        if (hasContent(work?.job_description)) {
          workStack.push({ text: work.job_description });
        }
        
        if (workStack.length > 0) {
          content.push({ stack: workStack, margin: [0, 5] });
        }
      });
    }
  }

  // Projects Section - only if data exists
  if (data?.projects && data.projects.length > 0) {
    const validProjects = data.projects.filter(project => 
      hasContent(project?.project_name) || hasContent(project?.project_description)
    );
    
    if (validProjects.length > 0) {
      content.push({ text: 'Projects', style: 'sectionHeader' });
      validProjects.forEach(project => {
        const projectStack = [];
        
        if (hasContent(project?.project_name)) {
          projectStack.push({ text: project.project_name, bold: true });
        }
        
        if (hasContent(project?.project_description)) {
          projectStack.push({ text: project.project_description });
        }
        
        if (hasContent(project?.technologies_used)) {
          projectStack.push({ text: `Technologies: ${project.technologies_used}`, italics: true });
        }
        
        if (hasContent(project?.project_url)) {
          projectStack.push({ text: `Live: ${project.project_url}`, link: project.project_url, style: 'link' });
        }
        
        if (hasContent(project?.project_github)) {
          projectStack.push({ text: `GitHub: ${project.project_github}`, link: project.project_github, style: 'link' });
        }
        
        if (projectStack.length > 0) {
          content.push({ stack: projectStack, margin: [0, 5] });
        }
      });
    }
  }

  // Skills Section - only if data exists
  if (data?.skills && data.skills.length > 0) {
    const validSkills = data.skills.filter(skill => 
      hasContent(skill?.technical_skills) || hasContent(skill?.soft_skills) || 
      hasContent(skill?.languages) || hasContent(skill?.certifications)
    );
    
    if (validSkills.length > 0) {
      content.push({ text: 'Skills', style: 'sectionHeader' });
      validSkills.forEach(skill => {
        const skillsList = [];
        
        if (hasContent(skill?.technical_skills)) {
          skillsList.push(`Technical: ${skill.technical_skills}`);
        }
        if (hasContent(skill?.soft_skills)) {
          skillsList.push(`Soft Skills: ${skill.soft_skills}`);
        }
        if (hasContent(skill?.languages)) {
          skillsList.push(`Languages: ${skill.languages}`);
        }
        if (hasContent(skill?.certifications)) {
          skillsList.push(`Certifications: ${skill.certifications}`);
        }
        
        if (skillsList.length > 0) {
          content.push({ ul: skillsList, margin: [0, 5] });
        }
      });
    }
  }

  // Achievements Section - only if data exists
  const achievementColumns = [];
  
  if (hasContent(data?.achievements?.awards)) {
    achievementColumns.push({
      stack: [
        { text: 'Awards:', bold: true },
        { ul: Array.isArray(data.achievements.awards) ? data.achievements.awards : [data.achievements.awards] }
      ]
    });
  }
  
  if (hasContent(data?.achievements?.publications)) {
    achievementColumns.push({
      stack: [
        { text: 'Publications:', bold: true },
        { ul: Array.isArray(data.achievements.publications) ? data.achievements.publications : [data.achievements.publications] }
      ]
    });
  }
  
  if (hasContent(data?.achievements?.volunteer_work)) {
    achievementColumns.push({
      stack: [
        { text: 'Volunteer Work:', bold: true },
        { ul: Array.isArray(data.achievements.volunteer_work) ? data.achievements.volunteer_work : [data.achievements.volunteer_work] }
      ]
    });
  }
  
  if (hasContent(data?.achievements?.other_achievements)) {
    achievementColumns.push({
      stack: [
        { text: 'Other:', bold: true },
        { ul: Array.isArray(data.achievements.other_achievements) ? data.achievements.other_achievements : [data.achievements.other_achievements] }
      ]
    });
  }
  
  if (achievementColumns.length > 0) {
    content.push({ text: 'Achievements', style: 'sectionHeader' });
    content.push({
      columns: achievementColumns,
      columnGap: 10,
      margin: [0, 5]
    });
  }

  const docDefinition = {
    content: content,
    styles: {
      name: {
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 4],
        alignment: 'center'
      },
      contact: {
        fontSize: 10,
        color: '#555'
      },
      link: {
        fontSize: 9,
        color: '#0a66c2',
        decoration: 'underline'
      },
      sectionHeader: {
        fontSize: 14,
        bold: true,
        margin: [0, 15, 0, 5],
        decoration: 'underline'
      }
    },
    defaultStyle: {
      fontSize: 11
    }
  };

  try {
    pdfMake.createPdf(docDefinition).download("Improved_Resume.pdf");
    showNotification('PDF generated successfully!', 'success');
    console.log('PDF generated successfully');
  } catch (error) {
    showNotification('Error generating PDF: ' + error.message, 'error');
    console.error('Error generating PDF:', error);
  }
}

