import { getUserData } from '../data/userData.js';
import { showNotification } from './notifications.js';

export function initializePreview() {
    createPreviewContainer();
    setupPreviewControls();
    loadAndRenderTemplate();
    
    // Auto-update preview on form changes
    document.addEventListener('input', debounce(loadAndRenderTemplate, 1000));
}

function createPreviewContainer() {
    const mainContainer = document.querySelector('.main_container');
    
    const previewHTML = `
        <div id="preview-container" class="preview_container">
            <div class="preview_header">
                <h3>Resume Preview</h3>
                <div class="preview_controls">
                    <button id="refresh-preview">Refresh</button>
                    <button id="download-html">Download HTML</button>
                </div>
            </div>
            <div id="preview-content" class="preview_content">
                Loading preview...
            </div>
        </div>
    `;
    
    mainContainer.insertAdjacentHTML('afterend', previewHTML);
}

function setupPreviewControls() {
    document.getElementById('refresh-preview')?.addEventListener('click', loadAndRenderTemplate);
    document.getElementById('download-html')?.addEventListener('click', downloadHTML);
}

async function loadAndRenderTemplate() {
    try {
        // 1. Fetch the template HTML
        const response = await fetch('scripts/templates/html_temp1.html');
        const templateHTML = await response.text();
        
        // 2. Get user data
        const userData = getUserData();
        
        // 3. Compile template with Handlebars
        const template = Handlebars.compile(templateHTML);
        
        // 4. Render with data
        const renderedHTML = template(userData);
        
        // 5. Display in preview
        document.getElementById('preview-content').innerHTML = renderedHTML;
        
    } catch (error) {
        console.error('Error loading template:', error);
        showNotification('Error loading preview', 'error');
    }
}

function downloadHTML() {
    const content = document.getElementById('preview-content').innerHTML;
    const userData = getUserData();
    
    const fullHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${userData.personal_info?.name || 'Resume'}</title>
        </head>
        <body>${content}</body>
        </html>
    `;
    
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userData.personal_info?.name || 'Resume'}.html`;
    a.click();
    URL.revokeObjectURL(url);
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}