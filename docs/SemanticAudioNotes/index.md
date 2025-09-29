## Overview
A Streamlit web application that records or uploads audio notes, transcribes them using OpenAI’s Whisper model, embeds the text with OpenAI embeddings, stores the notes in Qdrant for semantic search, and allows editing, downloading, and searching of notes.

## Main functionalities
- Record audio directly from the browser.
- Upload existing MP3 files.
- Transcribe audio to text via OpenAI Whisper.
- Edit transcribed notes in a text area.
- Save notes with embeddings into a Qdrant vector database.
- Perform semantic search on stored notes using embeddings.
- Download notes as MP3 or TXT files.

## Technologies & skills
- Python  
- Streamlit  
- audiorecorder (web recording)  
- OpenAI API (Whisper, Embeddings)  
- Qdrant vector database  
- dotenv for environment variables  
- hashlib md5 for audio change detection  
- st_paywall for authentication  
- Custom modules: `my_package.tips`, `api_key_loader_zmiany`  

## Project Report
- Utilizes Streamlit session state to persist audio and text across interactions.
- MD5 hashing detects changes in recorded audio to reset transcriptions.
- Caches OpenAI and Qdrant clients for efficient reuse.
- Ensures the Qdrant collection exists before inserting notes.
- Supports both real-time recording and file upload workflows.

## Sample photos  

<!-- <figure markdown>

![Ładowanie pliku](../images/img1.png){ width="500px"}
<figcaption>Ładowanie pliku</figcaption>

![Transkrypcja](../images/img2.png){ width="500px"}
<figcaption>Transkrypcja</figcaption>

</figure> -->


<figure>
    <img src="../images/img1.png" alt="<figcaption>Ładowanie pliku</figcaption>" width="600">
    <figcaption>Ładowanie pliku</figcaption>
</figure>

<figure>
    <img src="../images/img2.png" alt="<figcaption>Transkrypcja</figcaption>" width="600">
    <figcaption>Transkrypcja</figcaption>
</figure>



<!-- ---  -->
<!-- <a class="md-button md-button--primary" href="https://semanticaudionotes.streamlit.app/">Go to the application</a>

--- -->

## Application usage
- Open the Streamlit app in a browser.  
- Navigate to the “Dodaj notatkę” tab to record a new audio note or to the “Wczytaj nagranie z pliku mp3” tab to upload an existing MP3.  
- Click **Transkrybuj** to convert the audio into text.  
- Edit the transcribed text if needed, then click **Wyślij notatkę do twojej bazy wektorowej QDRANT** to store it.  
- Use the “Wyszukaj notatkę w chmurze” tab to perform a semantic search by entering a query; relevant notes and similarity scores will appear.


### <span style='color: #00FF00;'>Where to get API keys and addresses?</span>

1. **OpenAI API Key (openai_api_key):**  
   - Visit the [OpenAI API Keys page](https://platform.openai.com/account/api-keys).  
   - Log in to your account or create a new one.  
   - Click "Create API key" and copy the key.

2. **QuDanta keys and URL:**  
   - **QDRANT_URL:** The address of your QuDanta server, e.g., `https://your-qdrant-instance.com`.  
   - **QDRANT_API_KEY:** The QuDanta API key (if required).  
   - More details can be found in the [QuDanta documentation](https://qdrant.tech/documentation/).

### <span style='color: #00FF00;'>Example configuration file:</span>

```plaintext
OPENAI_API_KEY=your-openai-api-key
QDRANT_URL=https://your-qdrant-instance.com
QDRANT_API_KEY=your-qdrant-api-key
Replace your-openai-api-key, https://your-qdrant-instance.com and your-qdrant-api-key with your own values.
```


---

<a class="md-button md-button--primary" href="https://semanticaudionotes.streamlit.app/">Go to the application</a>

---


<!-- <a href="iris.ipynb" class="md-button md-button--primary">Pobierz Notebook</a> -->

<!-- <iframe
    id="content"
    src="iris.html"
    width="100%"
    style="border:1px solid black;overflow:hidden;"
></iframe>
<script>
function resizeIframeToFitContent(iframe) {
    iframe.style.height = (iframe.contentWindow.document.documentElement.scrollHeight + 50) + "px";
    iframe.contentDocument.body.style["overflow"] = 'hidden';
}
window.addEventListener('load', function() {
    var iframe = document.getElementById('content');
    resizeIframeToFitContent(iframe);
});
window.addEventListener('resize', function() {
    var iframe = document.getElementById('content');
    resizeIframeToFitContent(iframe);
});
</script> -->
