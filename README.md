# ResBuilder

The Resume Builder is a web application that allows users to create professional resumes using their input. It provides a user-friendly interface for entering resume details and generates a formatted resume document in PDF or other formats. The application utilizes the Adobe Document Generation API to merge user data with resume templates.

## Tech Stack

The tech stack used in the Resume Builder consists of the following components:

### Front-end
- HTML
- CSS
- JavaScript
- Bootstrap
- JQuery

The front-end components handle the user interface and form inputs. They enable users to enter their resume details, choose templates, and customize the design.

### Back-end
- Node.js
- Express.js

The back-end components are responsible for processing user input, interacting with the Adobe Document Generation API, and handling file operations.

## Usage

To use the Resume Builder app, follow these steps:

1. Clone the repository:

2. Install the dependencies:

3. Set up Adobe Document Generation API credentials:
- Obtain credentials from Adobe Document Generation API.
- Update the `config/credentials.json` file with your credentials.

4. Customize resume templates:
- Modify or replace the resume templates in the `templates` folder with your desired designs.

5. Start the server:

6. Access the app:
- Open a web browser and visit `http://localhost:3000`.
- The Resume Builder app will be displayed.

7. Create a resume:
- Fill in the resume form with your personal information, education, work experience, skills, and other relevant sections.
- Choose a template design from the available options.
- Customize the design if desired.
- Click the "Generate Resume" or similar button to initiate the resume generation process.

8. Download or export the resume:
- Once the resume is generated, you will be presented with options to download the resume in PDF format or export it to other formats such as Word or plain text.
- Choose the desired option to save or export the resume document.

## Error Handling

The Resume Builder includes error handling mechanisms to ensure a smooth user experience. It performs client-side and server-side validation to catch input errors and provide feedback to the user. Additionally, it handles server errors and displays appropriate error messages when interacting with the Adobe Document Generation API or during file operations.

## Conclusion

The Resume Builder is a powerful tool for creating professional resumes. By following the usage instructions provided above, you can quickly set up and use the app to generate custom resumes. Leverage the user-friendly interface and Adobe Document Generation API integration to create visually appealing and well-formatted resume documents. The code has been designed to handle various scenarios and provide a seamless experience.
