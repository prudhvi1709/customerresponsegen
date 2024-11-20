# Positive Scripting Response Generator

The Positive Scripting Response Generator is a web-based tool designed to generate empathetic, polite, and solution-oriented responses to customer inquiries. It leverages OpenAI's GPT-4 API to process user input and generate human-like, positive responses. This tool is ideal for customer support teams, helping them draft polite responses to inquiries with ease.

## Features

- **User-Friendly Interface**: A simple and intuitive interface for entering customer inquiries.
- **Empathetic Responses**: The application uses GPT-4 to generate responses that are empathetic, polite, and solution-oriented.
- **Dark Mode Toggle**: Users can switch between light and dark modes for better visual comfort.
- **Clipboard Copying**: Responses can be easily copied to the clipboard with one click.
- **Toast Notifications**: Informative toast messages that notify the user when the response has been copied to the clipboard.

## How It Works

1. The user inputs a customer inquiry in the provided text box.
2. After clicking the "Generate Response" button, the input is sent to the backend.
3. The backend uses GPT-4 to generate a polite and solution-oriented response.
4. The generated response is displayed on the screen, where the user can copy it to the clipboard.

## Technologies Used

- **Frontend**:
  - HTML, CSS (Bootstrap 5)
  - JavaScript (Vanilla JS)
  - Bootstrap Icons for UI components
  - Dark Mode Toggle using Gramex UI
- **Backend**:
  - OpenAI's GPT-4 API (through HTTP requests)
- **Deployment**: Static Web Hosting (e.g., GitHub Pages, Netlify)

## Setup Instructions

### Prerequisites

- A web browser (Chrome, Firefox, etc.)
- An internet connection to make API calls to the OpenAI server.
