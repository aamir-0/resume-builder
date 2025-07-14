export function initializeLottieAnimations() {
    // Get all lottie-player elements in the sidebar
    const lottieAnimations = document.querySelectorAll('.side_bar lottie-player');
    
    // Loop through all animations in sidebar
    lottieAnimations.forEach(animation => {
        const parentLi = animation.closest('li');
        
        // Start animation on hover
        parentLi.addEventListener('mouseenter', () => {
            animation.play();
        });

        // Animation on click for mobile devices
        parentLi.addEventListener('click', () => {
            animation.stop();
            animation.play();

            // Navigation functionality
            const sectionName = parentLi.querySelector('span').textContent.toLowerCase();
            const targetSection = document.querySelector(`.${sectionName}`);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Stop animation when hover ends
        parentLi.addEventListener('mouseleave', () => {
            animation.stop();
        });
    });
    
    console.log('Lottie hover animations initialized');
}