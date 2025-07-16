// Lottie animations functionality
export function initializeLottieAnimations() {
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
