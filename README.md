# Resume Builder

A dynamic, modular resume builder built with **HTML**, **CSS**, and **JavaScript**, featuring real-time preview, multi-template support, export/print functionality, and robust data persistence.

## 🚀 Features

* **Real-time Preview**: Opens a dedicated popup window (800×900) that updates live with debounced input from the editor.

* **Multi-Template Support**: Switch between “Professional”, “Modern Creative”, and “Executive” templates via a dropdown in the preview(only one template  functional).

* **Export & Print**: Download a standalone HTML file or print/PDF your resume directly from the preview popup.

* **Data Persistence**: Auto-save and load resume data and template preferences to/from `localStorage`, ensuring your work is never lost.

## 🛠️ Installation & Usage

1. **Clone the repository**

   ```bash
   git clone https://github.com/aamir-0/resume-builder.git
   cd resume-builder
   ```

2. \*\*Open \*\***`index.html`**

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
resume builder/
├─ data/
│  └─ user_data.js
├─ icons/
│  ├─ icons8-briefcase.json
│  ├─ icons8-eye.json
│  ├─ icons8-literature.json
│  ├─ icons8-name-tag.json
│  ├─ icons8-project.json
│  ├─ icons8-save-close.json
│  ├─ icons8-skills.json
│  └─ icons8-trophy.json
├─ images/
├─ scripts/
│  ├─ animations/
│  │  └─ lottieHandler.js
│  ├─ data/
│  │  └─ userData.js
│  ├─ forms/
│  │  └─ inputHandler.js
│  ├─ pdf/
│  │  └─ pdfGenerator.js
│  ├─ storage/
│  │  └─ localStorage.js
│  ├─ templates/
│  │  ├─ html_temp1.html
│  │  ├─ html_temp2.html
│  │  ├─ html_temp3.html
│  │  └─ templates.js
│  ├─ ui/
│  │  ├─ buttonHandlers.js
│  │  ├─ notifications.js
│  │  └─ previewHandler.js
│  ├─ animation.js
│  ├─ index.js
│  ├─ inputhandler.js
│  └─ storage.js
├─ styles/
│  └─ index.css
└─ index.html


```

## 📄 Last Changes (Current Status)

> *Commit:* `leaving login button aside every thing is functional , will revisit this after learning react+backend to polish UI and integrate AI`

* Login button placeholder added (functionality to be implemented later).
* All other features are fully functional:

  * Data binding, drag-and-drop, theming
  * Preview popup with debounced updates and template switching
  * Export HTML and print/PDF options
  * `localStorage` persistence

## 🔮 Future Enhancements

* **React & Backend**: Migrate UI to React and build a Node.js/Express API backend for secure data storage.
* **AI Integration**: Implement OpenAI API to auto-generate or polish resume sections and professional summaries.
* **User Authentication**: Enable account creation, login, and multi-resume management.
* **UI Polish**: Enhance animations, transitions, and mobile UX.

## 📝 License

This project is open-source under the [MIT License](LICENSE).
