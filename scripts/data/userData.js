// User data structure and management
export const userData = {
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

// Get current user data
export function getUserData() {
    return userData;
}

// Update user data
export function updateUserData(section, field, value, index = 0) {
    if (section === 'personal_info') {
        userData.personal_info[field] = value;
    } else if (section === 'achievements') {
        userData.achievements[field] = value;
    } else if (Array.isArray(userData[section])) {
        if (!userData[section][index]) {
            userData[section][index] = {};
        }
        userData[section][index][field] = value;
    }
    console.log(`${section} ${field} updated:`, value);
}
