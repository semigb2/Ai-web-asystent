function addChatMessage(who, message) {
  const chatWindow = document.getElementById("chat-window");
  const chatMessage = document.createElement("div");
  chatMessage.classList.add("chat-message", who);

  const chatMessageText = document.createElement("p");
  chatMessageText.textContent = message;
  chatMessage.appendChild(chatMessageText);

  chatWindow.appendChild(chatMessage);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

document.getElementById("query-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const question = document.getElementById("question").value;
  addChatMessage("user", question);

  const formData = new FormData(event.target);

  fetch("/", {
    method: "POST",
    body: formData
  }).then(response => response.text())
    .then(response_text => {
      addChatMessage("ai", response_text);
    });

  document.getElementById("question").value = "";
});

document.getElementById("speak-btn").addEventListener("click", function () {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000);
    mediaRecorder.ondataavailable = function (event) {
      const audio_blob = new Blob([event.data], { type: 'audio/wav' });
      const formData = new FormData();
      formData.append("audio", audio_blob);
      fetch("/listen", {
        method: "POST",
        body: formData
      }).then(response => response.text())
        .then(text => {
          document.getElementById("question").value = text;
        });
    };
  });
});
// Reset function
function resetScript() {
  const chatWindow = document.getElementById("chat-window");
  chatWindow.innerHTML = "";
  document.getElementById("question").value = "";
}

document.getElementById("reset-btn").addEventListener("click", function () {
  resetScript();
});

// Uptime counter
function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `Czas działania: ${hours}h ${minutes}m ${remainingSeconds}s`;
}

let uptime = 0;
setInterval(function () {
  uptime += 1;
  document.getElementById("uptime").innerText = formatUptime(uptime);
}, 1000);
