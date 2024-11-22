document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.sticky-section');
    let currentSection = 0;

    // Prevent scrolling to the next section by locking body scrolling
    const lockScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    // Unlock scrolling to the next section
    const unlockScroll = () => {
        document.body.style.overflow = 'auto';
    };

    // Initialize the page with scrolling locked
    lockScroll();

    // Handle white box click in Section 1
    const candidateBox = document.getElementById('candidateBox');
    if (candidateBox) {
        candidateBox.addEventListener('click', () => {
            currentSection++;
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
            unlockScroll();
            lockScroll(); // Relock scrolling
        });
    }

    // Handle button interactions for all sections
    sections.forEach((section, index) => {
        const buttons = section.querySelectorAll('.interaction button, .interaction a');
        const answerContainer = section.querySelector('.answer-container');
        let clickedButtons = new Set();

        // Dynamically create a container for navigation buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = "navigation-buttons";
        section.appendChild(buttonContainer);

        // Create "Next" button
        const nextButton = document.createElement('button');
        nextButton.textContent = "Next";
        nextButton.className = "next-button";
        nextButton.style.display = "none"; // Initially hidden
        nextButton.disabled = true;       // Initially disabled
        buttonContainer.appendChild(nextButton);

        // Create "Back" button
        const backButton = document.createElement('button');
        backButton.textContent = "Back";
        backButton.className = "back-button";
        backButton.style.display = "none"; // Initially hidden
        buttonContainer.appendChild(backButton);

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                // Add the clicked button to the set
                clickedButtons.add(button);

                // Clear "clicked" state for all buttons in the current section
                buttons.forEach((btn) => btn.classList.remove('clicked'));

                // Add "clicked" state for the selected button
                button.classList.add('clicked');

                // Show the selected answer text
                const answerText = button.getAttribute('data-answer');
                answerContainer.textContent = answerText;
                answerContainer.classList.add('visible');

                // Show and enable the "Next" button only when all buttons are clicked
                if (clickedButtons.size === buttons.length) {
                    nextButton.style.display = "block"; // Make it visible
                    nextButton.disabled = false;       // Enable the button
                    backButton.style.display = "block"; // Show "Back" button
                }
            });
        });

        // Handle "Next" button click
        nextButton.addEventListener('click', () => {
            currentSection++;
            if (currentSection < sections.length) {
                sections[currentSection].scrollIntoView({ behavior: 'smooth' });
                lockScroll(); // Relock scrolling
            }
        });

        // Handle "Back" button click
        backButton.addEventListener('click', () => {
            currentSection--;
            if (currentSection >= 0) {
                sections[currentSection].scrollIntoView({ behavior: 'smooth' });
                lockScroll(); // Relock scrolling
            }
        });
    });

    // Handle "Check Again" button in the last section
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            // Reload the page to reset everything
            location.reload();
        });
    }
});
