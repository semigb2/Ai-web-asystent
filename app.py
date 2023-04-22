from flask import Flask, render_template, request, send_file
from gtts import gTTS
from io import BytesIO
import openai
import speech_recognition as sr

app = Flask(__name__)

openai.api_key = "key GPT openai"

def get_response_from_gpt35(prompt):
    response = openai.Completion.create(
       engine="text-davinci-003",

      
        prompt=prompt,
        max_tokens=250,
        n=1,
        stop=None,
        temperature=0.8,
    )
    return response.choices[0].text.strip()

@app.route("/", methods=["GET", "POST"])
def index():
    response_text = ""
    if request.method == "POST":
        user_input = request.form["question"]
        response_text = get_response_from_gpt35(user_input)
        return response_text
    return render_template("index.html", response_text=response_text)

@app.route("/synthesize", methods=["POST"])
def synthesize():
    text = request.form["question"]
    tts = gTTS(text, lang="pl")
    audio_file = BytesIO()
    tts.save(audio_file)
    audio_file.seek(0)
    return send_file(audio_file, mimetype="audio/mp3")

@app.route("/listen", methods=["POST"])
def listen():
    audio_file = request.files["audio"]
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file) as source:
        audio = recognizer.record(source)
    try:
        text = recognizer.recognize_google(audio, language="pl-PL")
    except sr.UnknownValueError:
        text = "Nie rozumiem."
    return text

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, ssl_context=("cert.pem", "key.pem"))
