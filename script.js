// IEEE 802.15.6 DTMC Tutorial - JavaScript

// DOM Elements
const progressBar = document.getElementById('progress-bar');
const tocContainer = document.getElementById('table-of-contents');
const toggleTocBtn = document.getElementById('toggle-toc');
const stepHeaders = document.querySelectorAll('.step-header');
const problemSections = document.querySelectorAll('.problem-section');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupProgressBar();
    setupTableOfContents();
    setupStepToggling();
    setupHoverEffects();
    setupKeyboardShortcuts();
    setupSmoothScrolling();
    setupIntersectionObserver();
});

// Initialize animations and effects
function initializeAnimations() {
    // Animate state nodes with stagger effect
    const stateNodes = document.querySelectorAll('.state-node');
    stateNodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.animation = 'bounceIn 0.6s ease';
        }, index * 200);
    });

    // Add entrance animation to problem sections
    problemSections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, index * 300);
    });
}

// Progress Bar functionality
function setupProgressBar() {
    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }

    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar(); // Initial call
}

// Table of Contents functionality
function setupTableOfContents() {
    if (!toggleTocBtn || !tocContainer) return;

    toggleTocBtn.addEventListener('click', function() {
        tocContainer.classList.toggle('visible');
        
        // Update button text
        if (tocContainer.classList.contains('visible')) {
            this.textContent = 'Hide TOC';
        } else {
            this.textContent = 'Table of Contents';
        }
    });

    // Close TOC when clicking outside
    document.addEventListener('click', function(e) {
        if (!tocContainer.contains(e.target) && !toggleTocBtn.contains(e.target)) {
            tocContainer.classList.remove('visible');
            toggleTocBtn.textContent = 'Table of Contents';
        }
    });
}

// Step toggling functionality
function setupStepToggling() {
    stepHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isVisible = content.style.maxHeight;
            
            if (isVisible) {
                // Hide content
                content.style.maxHeight = null;
                content.style.opacity = '0';
                this.classList.remove('active');
            } else {
                // Show content
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = '1';
                this.classList.add('active');
            }
        });

        // Make all content visible by default
        const content = header.nextElementSibling;
        if (content) {
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.opacity = '1';
        }
    });
}

// Hover effects for interactive elements
function setupHoverEffects() {
    // Mathematical expressions hover effects
    const mathElements = document.querySelectorAll('.formula-box, .equation-set, .result-box');
    mathElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Highlight hover effects
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #ffeb3b 0%, #ffc107 100%)';
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'all 0.2s ease';
            this.style.boxShadow = '0 4px 15px rgba(255, 193, 7, 0.4)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 2px 8px rgba(255, 215, 0, 0.3)';
        });
    });

    // State node hover effects
    const stateNodes = document.querySelectorAll('.state-node');
    stateNodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            this.style.color = 'white';
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.transition = 'all 0.3s ease';
            
            // Add ripple effect
            createRippleEffect(this);
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.background = 'white';
            this.style.color = '#667eea';
            this.style.transform = 'scale(1) rotate(0deg)';
        });

        // Add click animation
        node.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // Probability card hover effects
    const probCards = document.querySelectorAll('.probability-card');
    probCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Create ripple effect
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '100%';
    ripple.style.height = '100%';
    ripple.style.marginLeft = '-50%';
    ripple.style.marginTop = '-50%';
    ripple.style.pointerEvents = 'none';

    element.style.position = 'relative';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Home key - scroll to top
        if (e.key === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            e.preventDefault();
        }
        
        // End key - scroll to bottom
        if (e.key === 'End') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            e.preventDefault();
        }
        
        // Ctrl+P - print
        if (e.ctrlKey && e.key === 'p') {
            window.print();
            e.preventDefault();
        }
        
        // Ctrl+T - toggle table of contents
        if (e.ctrlKey && e.key === 't') {
            if (toggleTocBtn) {
                toggleTocBtn.click();
            }
            e.preventDefault();
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            scrollToNextSection();
            e.preventDefault();
        }
        
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            scrollToPreviousSection();
            e.preventDefault();
        }
    });
}

// Navigation functions
function scrollToNextSection() {
    const sections = Array.from(problemSections);
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex < sections.length - 1) {
        sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToPreviousSection() {
    const sections = Array.from(problemSections);
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0) {
        sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }
}

function getCurrentSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (const section of problemSections) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            return section;
        }
    }
    
    return problemSections[0];
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add highlight effect to target
                target.style.animation = 'highlight 2s ease';
                setTimeout(() => {
                    target.style.animation = '';
                }, 2000);
            }
        });
    });
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for multiple elements
                const children = entry.target.querySelectorAll('.step, .probability-card, .answer-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all problem sections and steps
    document.querySelectorAll('.problem-section, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Math expression copy functionality
function setupMathCopy() {
    const mathElements = document.querySelectorAll('.equation, .final-equation');
    
    mathElements.forEach(el => {
        el.addEventListener('click', function() {
            copyToClipboard(this.textContent);
            showCopyNotification(this);
        });
        
        el.style.cursor = 'pointer';
        el.title = 'Click to copy equation';
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function showCopyNotification(element) {
    const notification = document.createElement('div');
    notification.textContent = 'Copied!';
    notification.style.cssText = `
        position: absolute;
        background: #48bb78;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        animation: fadeInOut 2s ease;
    `;
    
    element.style.position = 'relative';
    element.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.9);
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
}

// Performance optimization - Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could show a user-friendly error message here
});

// Add additional CSS animations through JavaScript
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes highlight {
            0% { background-color: transparent; }
            50% { background-color: rgba(255, 255, 0, 0.3); }
            100% { background-color: transparent; }
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
        }
        
        .dark-theme {
            filter: invert(1) hue-rotate(180deg);
        }
        
        .dark-theme img {
            filter: invert(1) hue-rotate(180deg);
        }
    `;
    document.head.appendChild(style);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setupMathCopy();
    setupThemeToggle();
    addDynamicStyles();
});

// Export functions for potential external use
window.DTMCTutorial = {
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    toggleStep: function(stepNumber) {
        const steps = document.querySelectorAll('.step-header');
        if (steps[stepNumber - 1]) {
            steps[stepNumber - 1].click();
        }
    },
    
    printTutorial: function() {
        window.print();
    }
};
