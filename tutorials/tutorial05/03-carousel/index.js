let currentPosition = 0;
let gap = 10;
const slideWidth = 400;

function moveCarousel(direction) {
    const items = document.querySelectorAll(".carousel-item");

    if (direction == "forward") {
        // minus 2 b/c first 2 slides already showing
        if (currentPosition >= items.length - 2) {
            // If at the end, don't move forward
            return false;
        }
 
        // Increment the current position
        currentPosition++;
    } else {
        if (currentPosition == 0) {
            // if at the beginning, don't move backwards
            return false;
        }

        // Decrement the current position
        currentPosition--;
    }

    // Set the offset to show the correct images, multiplies the current position by the width of an image and the gap between them to appear as if the images have changed
    const offset = (slideWidth + gap) * currentPosition;

    // For all the images, move them by the offset amount along the x-axis to show the correct images
    for (const item of items) {
        item.style.transform = `translateX(-${offset}px)`;
    }
}
