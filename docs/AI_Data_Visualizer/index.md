# AI_DATA_VISUALIZATION

<h1 style="color:green;">project in progress !</h1>
# AI_Data_Visualizer - visualise your verrbal data with AI

*Project start: 2024-11-21*

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
- Streamlit
- OpenAI API (GPT-4.1-nano)
<!-- - Hugging Face (for Code Llama) -->
- Pandas
- Matplotlib
- dotenv
- Jinja2 (via templates in `classes.py`)
- HTML/CSS (for styling)

<!-- ## Project Report
- 
- 
- 
-  -->

## Sample photos

<figure>
    <img src="../images/img1.png" alt="<figcaption>AI_Data_Visualizer_Main_Interface</figcaption>" width="600">
<figcaption>AI_Data_Visualizer_Main_Interface</figcaption>
    <img src="../images/img2.png" alt="<figcaption>Dataset_Selection_Panel</figcaption>" width="600">
<figcaption>Dataset_Selection_Panel</figcaption>
    <img src="../images/img3.png" alt="<figcaption>Generated_Plot_with_Code</figcaption>" width="600">
<figcaption>Generated_Plot_with_Code</figcaption>
    <img src="../images/img4.png" alt="<figcaption>Model_Selection_and_Execution</figcaption>" width="600">
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