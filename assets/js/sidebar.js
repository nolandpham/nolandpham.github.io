document.addEventListener('DOMContentLoaded', () => {
    // Find all submenu toggles
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    // --- CLICK EVENT LOGIC ---
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const parentLi = toggle.closest('li.has-submenu');

            if (parentLi) {
                parentLi.classList.toggle('open');
                if (parentLi.classList.contains('open')) {
                    toggle.textContent = '−';
                } else {
                    toggle.textContent = '+';
                }
            }
        });
    });

    // --- NEW: AUTO-EXPAND LOGIC FOR CURRENT PAGE ---
    const autoExpandCurrentMenu = () => {
        const currentPath = window.location.pathname;
        const allSubmenuLinks = document.querySelectorAll('.submenu a');

        allSubmenuLinks.forEach(link => {
            // Check if the link's href is the current page
            if (link.getAttribute('href') === currentPath) {
                const parentLi = link.closest('li.has-submenu');
                if (parentLi) {
                    // Expand the menu
                    parentLi.classList.add('open');
                    
                    // Update the toggle icon
                    const toggle = parentLi.querySelector('.submenu-toggle');
                    if (toggle) {
                        toggle.textContent = '−';
                    }
                }
            }
        });
    };

    // Run the auto-expand function on page load
    autoExpandCurrentMenu();
});