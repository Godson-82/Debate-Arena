/* ─── VOICE SYSTEM ─── */

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {

  recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  recognition.onstart = () => {
    document.getElementById('mic-btn')
      .classList.add('recording');

    document.getElementById('mic-btn').innerHTML =
      '🔴 Listening';
  };

  recognition.onend = () => {
    document.getElementById('mic-btn')
      .classList.remove('recording');

    document.getElementById('mic-btn').innerHTML =
      '🎤 Speak';
  };

  recognition.onresult = (event) => {

    const transcript =
      event.results[0][0].transcript;

    const input =
      document.getElementById('user-input');

    input.value = transcript;

    sendMsg();
  };

}

/* ─── HEADER DATE ─── */
const d = new Date();
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
document.getElementById('header-date-el').innerHTML =
  `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}<br>Official Programme<br>Issue No. ${Math.floor(Math.random()*900)+100}`;

let topic = '', stance = 'for', intensity = 'sharp', history = [], active = false;

let voiceEnabled = true;
document.querySelectorAll('.stance-opt').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.stance-opt').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    stance = el.dataset.stance;
  });
});

document.querySelectorAll('.int-btn').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.int-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    intensity = el.dataset.intensity;
  });
});

const topicEl = document.getElementById('topic-input');
topicEl.addEventListener('input', () => {
  document.getElementById('start-btn').disabled = !topicEl.value.trim();
});
topicEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); document.getElementById('start-btn').click(); }
});

document.getElementById('start-btn').addEventListener('click', async () => {
  const t = topicEl.value.trim(); if (!t) return;
  topic = t; await startDebate();
});
document.getElementById('stop-btn').addEventListener('click', endDebate);
document.getElementById('send-btn').addEventListener('click', sendMsg);
document.getElementById('mic-btn')
.addEventListener('click', () => {

  if (!recognition) {
    alert('Speech recognition not supported.');
    return;
  }

  recognition.start();

});
document.getElementById('voice-toggle')
.addEventListener('click', () => {

  voiceEnabled = !voiceEnabled;

  const btn =
    document.getElementById('voice-toggle');

  if (voiceEnabled) {

    btn.innerHTML = '🔊 Voice ON';
    btn.classList.remove('voice-off');

  } else {

    btn.innerHTML = '🔇 Voice OFF';
    btn.classList.add('voice-off');

    speechSynthesis.cancel();
  }

});
document.getElementById('new-btn').addEventListener('click', resetToSetup);
document.getElementById('user-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
});