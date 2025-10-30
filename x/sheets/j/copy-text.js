document.querySelectorAll('.copy-text').forEach(svg => {
    svg.addEventListener('click', () => {
        // Find the next <code> element relative to the clicked <svg>
        const codeElement = svg.closest('.title').nextElementSibling.querySelector('code');
        if (codeElement) {
            const textToCopy = codeElement.textContent.trim();
            // Copy the text to the clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Add the 'copied' class to the SVG to change its color
                svg.classList.add('copied');
                // Show the tooltip
                let tooltip = svg.closest('.title').querySelector('.tooltip');
                if (!tooltip) {
                    // Create the tooltip if it doesn't exist
                    tooltip = document.createElement('span');
                    tooltip.className = 'tooltip';
                    tooltip.textContent = 'Copied!';
                    svg.closest('.title').appendChild(tooltip);
                }
                tooltip.classList.add('show');
                // Hide the tooltip after 2 seconds
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        } else {
            console.error('No <code> element found to copy.');
        }
    });
});