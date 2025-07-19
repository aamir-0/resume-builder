# Resume Builder

A dynamic, modular resume builder built with **HTML**, **CSS**, and **JavaScript**, featuring real-time preview, multi-template support, export/print functionality, and data persistence.

## 🚀 Features

*   **Real-Time Preview**: Opens a dedicated popup window that updates live with debounced input from the editor, giving you instant feedback.

*   **Multi-Template Support**: Seamlessly switch between three distinct, professional resume templates (“Professional ATS-Friendly,” “Modern Creative,” and “Executive”) directly from the preview window.

*   **Export & Print**: Download your resume as a standalone HTML file or generate a high-quality PDF using the browser’s native print-to-PDF functionality.

*   **Data Persistence**: Your work is automatically saved to and loaded from `localStorage`, ensuring you never lose your progress between sessions.

*   **Modular & Modern JS**: Built with modern JavaScript (ES Modules), organizing code into a clean, maintainable, and scalable structure.

## 🛠️ Installation & Usage

1. **Clone the repository**

   ```bash
   git clone https://github.com/aamir-0/resume-builder.git
   cd resume-builder
   ```

2. Open **`index.html`**

   * Simply open the `index.html` file in your browser.
   * No additional dependencies or build steps required.

3. **Use the Editor**

   * Fill in your personal information and add sections using the sidebar controls.
   * Click **Preview** to open the live preview window.

4. **Export or Print**

   * In the preview popup, use **Download HTML** to save a standalone file.
   * Click **Print/PDF** to generate a PDF using the browser’s print dialog.

## 📂 Project Structure

```
resume-builder/
├── icons/
│   └── *.json              # Lottie animation files
├── images/
│   └── ...                 # Image assets
├── scripts/
│   ├── animations/
│   │   └── lottieHandler.js  # Handles Lottie animations
│   ├── data/
│   │   └── userData.js       # Manages the resume data object (state)
│   ├── forms/
│   │   └── inputHandler.js   # Binds form inputs to the data object
│   ├── storage/
│   │   └── localStorage.js   # Handles saving/loading to localStorage
│   ├── templates/
│   │   ├── html_temp1.html   # Professional ATS-Friendly Template
│   │   ├── html_temp2.html   # Modern Creative Template
│   │   ├── html_temp3.html   # Executive Template
│   │   └── templates.js      # (If used for template logic)
│   ├── ui/
│   │   ├── buttonHandlers.js # Logic for UI buttons (save, etc.)
│   │   ├── notifications.js  # Displays user notifications
│   │   └── previewHandler.js # Manages the preview popup window
│   └── index.js              # Main application entry point
├── styles/
│   └── index.css             # Main stylesheet
└── index.html                # Main HTML file
```

## 📄 Last Changes (Current Status)

> *Commit:* `leaving login button aside every thing is functional , will revisit this after learning react+backend to polish UI and integrate AI`

*   Login button is a placeholder for future development.
*   All core features are fully functional:
    *   Real-time data binding between the form and the preview.
    *   A dynamic preview popup with debounced updates and template switching.
    *   Export to HTML and Print-to-PDF options.
    *   `localStorage` persistence for all resume data.
    *   Dark theme UI with Lottie animations.

## 🔮 Future Enhancements

* **React & Backend**: Migrate UI to React and build a Node.js/Express API backend for secure data storage.
* **AI Integration**: Implement OpenAI API to auto-generate or polish resume sections and professional summaries.
* **User Authentication**: Enable account creation, login, and multi-resume management.
* **UI Polish**: Enhance animations, transitions, and mobile UX.



