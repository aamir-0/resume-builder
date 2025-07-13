// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all lottie-player elements in the sidebar
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
});