(function() {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typing animation
  const phrases = ["Read markets.", "Follow capital.", "Manage risk.", "Execute with confidence.", "Repeat."];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;
  const typingEl = document.getElementById('typingLine');

  function typeEffect() {
    const current = phrases[phraseIndex];
    if (!isDeleting) {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      setTimeout(typeEffect, 70);
    } else {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 300);
        return;
      }
      setTimeout(typeEffect, 40);
    }
  }
  setTimeout(typeEffect, 800);

  // Counter scroll trigger (target 50)
  const counterBox = document.getElementById('counterSection');
  const counterEl = document.getElementById('subscriberCounter');
  let counterStarted = false;

  if (counterBox && counterEl) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
          counterStarted = true;
          let current = 0;
          const target = 50;
          const step = Math.ceil(target / 50);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counterEl.textContent = '50+';
              clearInterval(timer);
            } else {
              counterEl.textContent = current;
            }
          }, 50);
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(counterBox);
  }

  // Price countdown animation (from 100,000 to 13,000)
  const priceElement = document.getElementById('animatedPrice');
  let priceAnimated = false;

  if (priceElement) {
    const priceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !priceAnimated) {
          priceAnimated = true;
          let start = 100000;
          const end = 13000;
          const duration = 1500;
          const stepTime = 20;
          const steps = duration / stepTime;
          const decrement = (start - end) / steps;
          let current = start;
          const timer = setInterval(() => {
            current -= decrement;
            if (current <= end) {
              priceElement.textContent = '13,000 NGN';
              clearInterval(timer);
            } else {
              priceElement.textContent = Math.floor(current).toLocaleString() + ' NGN';
            }
          }, stepTime);
          priceObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    priceObserver.observe(priceElement);
  }

  // Generic function to handle Instagram purchase flow
  function handlePurchase() {
    const message = "Hi, I'd like to join the free batch. Please guide me on purchasing the book.";
    navigator.clipboard.writeText(message).then(() => {
      const toast = document.createElement('div');
      toast.textContent = '✓ Message copied. Please paste it in Instagram DM.';
      toast.style.position = 'fixed';
      toast.style.bottom = '80px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.backgroundColor = '#1e3a5f';
      toast.style.color = '#c0d0e6';
      toast.style.padding = '8px 16px';
      toast.style.borderRadius = '40px';
      toast.style.fontSize = '0.75rem';
      toast.style.zIndex = '1000';
      toast.style.border = '1px solid #5a8bc9';
      toast.style.backdropFilter = 'blur(8px)';
      toast.style.whiteSpace = 'nowrap';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }).catch(() => {
      alert("Please copy this message:\n\n" + message);
    });
    window.open("https://www.instagram.com/emmanuelsilaskelechi?igsh=b282cGxsa3d3Zjgy&utm_source=qr", "_blank");
  }

  // Buy button
  const buyBtn = document.getElementById('buyBookBtn');
  if (buyBtn) buyBtn.addEventListener('click', handlePurchase);

  // Enroll buttons (both hero and book section)
  const enrollBtn1 = document.getElementById('enrollBtn');
  const enrollBtn2 = document.getElementById('enrollBtn2');
  if (enrollBtn1) enrollBtn1.addEventListener('click', handlePurchase);
  if (enrollBtn2) enrollBtn2.addEventListener('click', handlePurchase);

  // Lectures data
  const lectures = [
    { title: 'Market Structure & Bias', videoId: 'RraPVl3lPg0' },
    { title: 'Timing the Session', videoId: 'bI4NIjkAC34' },
    { title: 'Points of Interest', videoId: '7rDJikdlBwY' },
    { title: 'Setup to Risk', videoId: '-wHaZyAtZ6M' },
    { title: 'Framework Together', videoId: 'q0Pbg85AHQU' },
    { title: 'Live Reversal Example', videoId: 'CICleAnoMXE' }
  ];

  const container = document.getElementById('lectureList');
  if (container) {
    container.innerHTML = lectures.map(l => `
      <div class="lecture-item">
        <div>
          <div class="lecture-title">${l.title}</div>
          <div class="lecture-meta">Gold Technicals</div>
        </div>
        <div class="lecture-actions">
          <button class="btn-assignment" data-title="${l.title}">Assignment</button>
          <button class="btn-watch" data-video="${l.videoId}">Watch</button>
        </div>
      </div>
    `).join('');

    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-watch')) {
        window.open(`https://www.youtube.com/watch?v=${e.target.dataset.video}`, '_blank');
      }
      if (e.target.classList.contains('btn-assignment')) {
        const title = e.target.dataset.title;
        const content = `LabRoom – Gold Technicals Assignment\n\nTopic: ${title}\n\nTask:\n1. Identify the main trend on XAUUSD (Daily timeframe).\n2. Mark at least one key level of support and resistance.\n3. Write a one-sentence bias based on market structure.\n\nSubmit your analysis in the LabRoom batch chat.`;
        const blob = new Blob([content], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s/g, '_')}_Assignment.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    });
  }
})();