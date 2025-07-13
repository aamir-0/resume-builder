// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all lottie-player elements in the sidebar
    const lottieAnimations = document.querySelectorAll('.side_bar lottie-player');
    
    // Add hover event listeners to each animation
    lottieAnimations.forEach(animation => {
        const parentLi = animation.closest('li');
        
        // Start animation on hover (when hovering over the entire li)
        parentLi.addEventListener('mouseenter', () => {
            animation.play();
        });

       //animation on click for mobile devices
        parentLi.addEventListener('click', () => {
            // Always restart the animation on click
            animation.stop();
            animation.play();
        });
    

        // Stop animation when hover ends
        parentLi.addEventListener('mouseleave', () => {
            animation.stop();
        });
        
       
    });
    
    console.log('Lottie hover animations initialized');
});