import { getUserData } from '../data/userData.js';
import { showNotification } from './notifications.js';

// Template configuration for multiple templates
const TEMPLATES = {
    template1: {
        path: 'scripts/templates/html_temp1.html',
        name: 'Professional ATS-Friendly',
        description: 'Clean, professional layout optimized for ATS systems'
    },
    template2: {
        path: 'scripts/templates/html_temp2.html',
        name: 'Modern Creative',
        description: 'Modern design with creative elements'
    },
    template3: {
        path: 'scripts/templates/html_temp3.html',
        name: 'Executive',
        description: 'Executive-level professional template'
    }
};

let currentTemplate = 'template1';
let previewWindow = null;

// Register Handlebars helpers
function registerHandlebarsHelpers() {
    // Check if Handlebars is available
    if (typeof Handlebars === 'undefined') {
        console.error('Handlebars is not loaded! Make sure the CDN is included.');
        return;
    }
    
    // Helper to split text for bullet points
    Handlebars.registerHelper('split', function(text) {
        if (!text) return [];
        return text.split('.').filter(item => item.trim().length > 0);
    });

    // Helper for conditional rendering
    Handlebars.registerHelper('ifExists', function(value, options) {
        if (value && value.trim && value.trim().length > 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // Helper for formatting dates
    Handlebars.registerHelper('formatDate', function(date) {
        if (!date) return '';
        return date;
    });
}

export function initializePreview() {
    console.log('Initializing preview system...');
    registerHandlebarsHelpers();
    setupPreviewButton();
    console.log('Preview system initialized successfully');
}

function setupPreviewButton() {
    console.log('Setting up preview button...');
    // Use event delegation for preview button
    document.addEventListener('click', function(event) {
        // Check if clicked element or its parent has preview_js class
        const previewElement = event.target.closest('.preview_js');
        if (previewElement) {
            console.log('Preview button clicked!');
            openPreviewWindow();
        }
    });
    console.log('Preview button event listener added');
}

function openPreviewWindow() {
    console.log('Opening preview in new window...');
    
    // Close existing preview window if open
    if (previewWindow && !previewWindow.closed) {
        previewWindow.close();
    }
    
    // Create new window
    previewWindow = window.open('', 'ResumePreview', 'width=800,height=900,scrollbars=yes,resizable=yes');
    
    if (!previewWindow) {
        showNotification('Please allow popups for this site to open preview window', 'error');
        return;
    }
    
    // Write initial content
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Resume Preview</title>
            <style>
                :root {
                    --primary-color: #2E2E2E;
                    --secondary-color: #1F1F1F;
                    --text-color: #E0E0E0;
                    --secondary-text-color: #A0A0A0;
                    --background-color: #121212;
                    --accent: #4EA8DE;
                    --font-family: 'Arial', sans-serif;
                    --input-background: #2A2A2A;
                    --input-border: #444;
                    --button-hover: #2563EB;
                }
                
                body {
                    font-family: var(--font-family);
                    margin: 0;
                    padding: 20px;
                    background-color: var(--background-color);
                    color: var(--text-color);
                }
                
                .preview-header {
                    background: var(--secondary-color);
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 15px;
                    border: 1px solid var(--input-border);
                }
                
                .preview-title {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                
                .preview-title h1 {
                    margin: 0;
                    color: var(--text-color);
                    font-size: 1.5rem;
                    font-weight: bold;
                }
                
                .template-selector {
                    padding: 8px 12px;
                    border: 1px solid var(--input-border);
                    border-radius: 5px;
                    font-size: 1rem;
                    background: var(--input-background);
                    color: var(--text-color);
                    font-family: var(--font-family);
                }
                
                .template-selector:focus {
                    outline: none;
                    border-color: var(--accent);
                    box-shadow: 0 0 0 2px rgba(78, 168, 222, 0.2);
                }
                
                .preview-controls {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                
                .preview-btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-family: var(--font-family);
                    font-weight: bold;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(78, 168, 222, 0.3);
                }
                
                .refresh-btn { 
                    background: linear-gradient(135deg, var(--accent), var(--button-hover));
                    color: white; 
                }
                .refresh-btn:hover { 
                    background: linear-gradient(135deg, var(--button-hover), var(--accent));
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(78, 168, 222, 0.4);
                }
                
                .download-btn { 
                    background: linear-gradient(135deg, #27ae60, #229954);
                    color: white; 
                }
                .download-btn:hover { 
                    background: linear-gradient(135deg, #229954, #27ae60);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
                }
                
                .pdf-btn { 
                    background: linear-gradient(135deg, #e67e22, #d35400);
                    color: white; 
                }
                .pdf-btn:hover { 
                    background: linear-gradient(135deg, #d35400, #e67e22);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(230, 126, 34, 0.4);
                }
                
                .preview-btn:active {
                    transform: translateY(0);
                }
                
                .resume-content {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    overflow: hidden;
                    border: 1px solid var(--input-border);
                }
                
                .loading {
                    text-align: center;
                    padding: 50px;
                    color: var(--secondary-text-color);
                    font-style: italic;
                    background: var(--primary-color);
                    border-radius: 8px;
                    margin: 20px;
                }
                
                .error {
                    text-align: center;
                    padding: 50px;
                    color: #e74c3c;
                    background: var(--primary-color);
                    border-radius: 8px;
                    margin: 20px;
                    border: 1px solid #e74c3c;
                }
                
                .error button {
                    padding: 10px 20px;
                    background: linear-gradient(135deg, var(--accent), var(--button-hover));
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: var(--font-family);
                    font-weight: bold;
                    margin-top: 15px;
                    transition: all 0.3s ease;
                }
                
                .error button:hover {
                    background: linear-gradient(135deg, var(--button-hover), var(--accent));
                    transform: translateY(-2px);
                }
                
                /* Scrollbar styling to match main theme */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: var(--background-color);
                }
                
                ::-webkit-scrollbar-thumb {
                    background: var(--accent);
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: var(--button-hover);
                }
                
                @media print {
                    .preview-header { display: none; }
                    body { background: white; margin: 0; padding: 0; color: #000; }
                    .resume-content { box-shadow: none; border-radius: 0; border: none; }
                }
                
                @media (max-width: 768px) {
                    body { padding: 10px; }
                    .preview-header { 
                        flex-direction: column; 
                        align-items: stretch; 
                        gap: 15px; 
                    }
                    .preview-title { 
                        justify-content: center; 
                        text-align: center; 
                    }
                    .preview-controls { 
                        justify-content: center; 
                    }
                    .preview-btn { 
                        flex: 1; 
                        min-width: 100px; 
                    }
                }
            </style>
        </head>
        <body>
            <div class="preview-header">
                <div class="preview-title">
                    <h1>Resume Preview</h1>
                    <select id="template-selector" class="template-selector">
                        <option value="template1">Professional ATS-Friendly</option>
                        <option value="template2">Modern Creative</option>
                        <option value="template3">Executive</option>
                    </select>
                </div>
                <div class="preview-controls">
                    <button id="refresh-btn" class="preview-btn refresh-btn">Refresh</button>
                    <button id="download-btn" class="preview-btn download-btn">Download HTML</button>
                    <button id="export-pdf-btn" class="preview-btn pdf-btn">Print/PDF</button>
                </div>
            </div>
            <div id="resume-content" class="resume-content">
                <div class="loading">Loading resume...</div>
            </div>
            
            <script>
                // Setup event listeners
                document.getElementById('template-selector').addEventListener('change', function(e) {
                    window.opener.postMessage({
                        type: 'changeTemplate',
                        template: e.target.value
                    }, '*');
                });
                
                document.getElementById('refresh-btn').addEventListener('click', function() {
                    window.opener.postMessage({ type: 'refreshPreview' }, '*');
                });
                
                document.getElementById('download-btn').addEventListener('click', function() {
                    window.opener.postMessage({ type: 'downloadHTML' }, '*');
                });
                
                document.getElementById('export-pdf-btn').addEventListener('click', function() {
                    window.print();
                });
            </script>
        </body>
        </html>
    `);
    previewWindow.document.close();
    
    // Setup message listener for communication between windows
    setupWindowCommunication();
    
    // Load initial template
    loadAndRenderTemplate();
}

function setupWindowCommunication() {
    // Listen for messages from preview window
    window.addEventListener('message', function(event) {
        if (event.source !== previewWindow) return;
        
        switch(event.data.type) {
            case 'changeTemplate':
                currentTemplate = event.data.template;
                loadAndRenderTemplate();
                break;
            case 'refreshPreview':
                loadAndRenderTemplate();
                break;
            case 'downloadHTML':
                downloadHTML();
                break;
        }
    });
    
    // Auto-update preview when form changes
    document.addEventListener('input', debounce(() => {
        if (previewWindow && !previewWindow.closed) {
            loadAndRenderTemplate();
        }
    }, 1000));
}

async function loadAndRenderTemplate() {
    try {
        if (!previewWindow || previewWindow.closed) {
            console.log('Preview window is closed, skipping render');
            return;
        }
        
        console.log(`Loading template: ${TEMPLATES[currentTemplate].name}`);
        
        // Show loading state
        const resumeContent = previewWindow.document.getElementById('resume-content');
        if (resumeContent) {
            resumeContent.innerHTML = '<div class="loading">Loading template...</div>';
        }
        
        // Get current template path
        const templatePath = TEMPLATES[currentTemplate].path;
        
        const response = await fetch(templatePath);
        if (!response.ok) {
            throw new Error(`Failed to load template: ${response.statusText}`);
        }
        
        const htmlContent = await response.text();
        const userData = getUserData();
        console.log('User data:', userData);

        const template = Handlebars.compile(htmlContent);
        const renderedHTML = template(userData);
        
        // Update preview window content
        if (resumeContent) {
            resumeContent.innerHTML = renderedHTML;
        }
        
        // Update template selector in preview window
        const templateSelector = previewWindow.document.getElementById('template-selector');
        if (templateSelector) {
            templateSelector.value = currentTemplate;
        }
        
        console.log("Template loaded and rendered successfully");
        showNotification(`Template "${TEMPLATES[currentTemplate].name}" loaded successfully`, 'success');
        
    } catch (error) {
        console.error("Error loading and rendering template:", error);
        
        if (previewWindow && !previewWindow.closed) {
            const resumeContent = previewWindow.document.getElementById('resume-content');
            if (resumeContent) {
                resumeContent.innerHTML = `
                    <div class="error">
                        <h3>Error Loading Template</h3>
                        <p>${error.message}</p>
                        <button onclick="window.opener.postMessage({type: 'refreshPreview'}, '*')" 
                                style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            Retry
                        </button>
                    </div>
                `;
            }
        }
        
        showNotification('Error loading preview: ' + error.message, 'error');
    }
}

function downloadHTML() {
    if (!previewWindow || previewWindow.closed) {
        showNotification('Preview window is closed', 'error');
        return;
    }

    const resumeContent = previewWindow.document.getElementById('resume-content');
    if (!resumeContent) {
        showNotification('No preview content to download', 'error');
        return;
    }

    const userData = getUserData();
    const fileName = `${userData.personal_info?.name || 'Resume'}_${TEMPLATES[currentTemplate].name.replace(/\s+/g, '_')}.html`;

    const fullHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${userData.personal_info?.name || 'Resume'} - Resume</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 40px;
                    line-height: 1.6;
                    color: #333;
                }
                @media print { 
                    body { margin: 20px; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            ${resumeContent.innerHTML}
        </body>
        </html>
    `;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification(`HTML file "${fileName}" downloaded successfully!`, 'success');
}

// Template management functions
export function switchTemplate(templateId) {
    if (TEMPLATES[templateId]) {
        currentTemplate = templateId;
        loadAndRenderTemplate();
        return true;
    }
    return false;
}

export function getCurrentTemplate() {
    return currentTemplate;
}

export function getAvailableTemplates() {
    return Object.keys(TEMPLATES).map(key => ({
        id: key,
        ...TEMPLATES[key]
    }));
}

// Utility functions
function debounce(func, wait) {
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