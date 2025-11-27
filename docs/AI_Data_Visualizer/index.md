<!-- <h1 style="color:green;">project in progress !</h1> -->
# AI_Data_Visualizer - visualise your verrbal data with AI

*Project start: 2025-11-21*

## Overview
A Streamlit-powered web app that allows users to generate data visualizations using natural language prompts, leveraging AI models like GPT-4.1-nano to automatically produce and execute Python plotting code.

<!-- ## Project architecture
	in Excalidraw -->

## Main functionalities
- Upload and manage custom CSV datasets
- Choose from predefined datasets (Movies, Housing, Cars)
- Describe desired visualization in plain English (e.g., "Plot sales over time by region")
- Automatically generate and execute Python code using AI
- Display both the generated plot and the underlying code
- Support for multiple AI models in close future with toggle selection
- Real-time visualization with error handling and feedback

## Technologies & skills
- Python
- Streamlit (for the web interface)
- Pandas (data handling)
- Matplotlib (plotting)
- OpenAI API (via GPT-4.1-nano)
- dotenv (environment variables)
- Secure API key management via `.streamlit/secrets.toml`

## Project Report
- The app enables non-technical users to create data visualizations without writing code.
- It uses a prompt engineering pipeline: primers are applied to guide AI model outputs, ensuring consistent and valid code generation.
- The system includes error handling and user feedback (e.g., timeout warnings).
- Model selection allows flexibility, with GPT-4.1-nano as the default due to cost efficiency.
- Future enhancements could include model switching via Hugging Face, support for more plot types, and offline execution.

## Sample photos

<figure>
    <img src="../images/Visualizer1.png" alt="<figcaption>AI_Data_Visualizer_Main_Interface</figcaption>" width="600">
<figcaption>AI_Data_Visualizer_Main_Interface</figcaption>
    <img src="../images/Visualizer2.png" alt="<figcaption>Dataset_Selection_Panel</figcaption>" width="600">
<figcaption>Dataset_Selection_Panel</figcaption>
    <img src="../images/Visualizer3.png" alt="<figcaption>Generated_Plot_with_Code</figcaption>" width="600">
<figcaption>Generated_Plot_with_Code</figcaption>
    <img src="../images/Visualizer4.png" alt="<figcaption>Model_Selection_and_Execution</figcaption>" width="600">
<figcaption>Model_Selection_and_Execution</figcaption>
</figure>

## Application usage
- Upload a CSV file (e.g., sales, survey, or experimental data)
- Describe what kind of chart or graph you want (e.g., "Show average income by city with a bar chart")
- Select the AI model (GPT-4.1-nano recommended for speed and cost)
- Click "Go!" to generate the visualization
- View the plot and inspect the generated Python code
- Use the tabs to explore raw dataset contents

<a class="md-button md-button--primary" href="https://ai-data-visualizer-ab.streamlit.app/">Go to the application</a>