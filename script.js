(function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typing animation
  const phrases = ["Read markets.", "Follow capital.", "Manage risk.", "Build process.", "Get certified."];
  let phraseIdx = 0, charIdx = 0, deleting = false;
  const typingEl = document.getElementById('typingLine');
  function typeEffect() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      setTimeout(typeEffect, 70);
    } else {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(typeEffect, 300);
        return;
      }
      setTimeout(typeEffect, 40);
    }
  }
  setTimeout(typeEffect, 600);

  // Counter animation (active participants)
  const counterNum = document.getElementById('subscriberCounter');
  if (counterNum && !window.counterTriggered) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !window.counterTriggered) {
        window.counterTriggered = true;
        let curr = 0;
        const target = 87;
        const step = Math.ceil(target / 45);
        const timer = setInterval(() => {
          curr += step;
          if (curr >= target) {
            counterNum.textContent = '87+';
            clearInterval(timer);
          } else {
            counterNum.textContent = curr;
          }
        }, 50);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    const counterSection = document.getElementById('counterSection');
    if (counterSection) observer.observe(counterSection);
  }

  // Price countdown animation for book (from 100,000 to 13,000)
  const priceEl = document.getElementById('animatedPrice');
  let priceAnimated = false;
  if (priceEl) {
    const priceObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !priceAnimated) {
        priceAnimated = true;
        let start = 100000, end = 13000, duration = 1500;
        let startTime = null;
        function animatePrice(now) {
          if (!startTime) startTime = now;
          const elapsed = now - startTime;
          let progress = Math.min(1, elapsed / duration);
          let currentVal = start - (start - end) * progress;
          if (progress >= 1) priceEl.textContent = '13,000 NGN';
          else priceEl.textContent = Math.floor(currentVal).toLocaleString() + ' NGN';
          if (progress < 1) requestAnimationFrame(animatePrice);
        }
        requestAnimationFrame(animatePrice);
        priceObserver.disconnect();
      }
    }, { threshold: 0.3 });
    priceObserver.observe(priceEl);
  }

  // Helper: copy message and open Instagram DM
  function contactInstagram(message, customUrl = 'https://www.instagram.com/emmanuelsilaskelechi?igsh=b282cGxsa3d3Zjgy&utm_source=qr') {
    navigator.clipboard.writeText(message).then(() => {
      const toast = document.createElement('div');
      toast.textContent = '✓ Message copied. Paste it in Instagram DM.';
      toast.style.cssText = 'position:fixed; bottom:90px; left:50%; transform:translateX(-50%); background:#1e3a5f; color:#c0d0e6; padding:8px 18px; border-radius:60px; font-size:0.75rem; z-index:1100; border:1px solid #5a8bc9; backdrop-filter:blur(6px); white-space:nowrap;';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }).catch(() => alert("Copy this message:\n" + message));
    window.open(customUrl, '_blank');
  }

  // Book purchase + batch enrollment buttons
  document.getElementById('buyBookBtn')?.addEventListener('click', () => contactInstagram("Hi, I'd like to purchase the LabRoom Institutional Trading Framework book (13,000 NGN). Please guide me on payment & batch access."));
  document.getElementById('freeBatchBtn')?.addEventListener('click', () => contactInstagram("Hi, I'm interested in the free Student Batch. How can I join?"));
  document.getElementById('enrollAcademy')?.addEventListener('click', () => contactInstagram("Hello, I want to enroll in LabRoom Academy & batch. Please share steps."));
  
  // Certification exam buttons
  const examHandler = () => contactInstagram("Hello, I'm interested in the LRCMA Certification exam (₦3,000). Please provide registration & payment details.");
  document.getElementById('certExamBtn')?.addEventListener('click', examHandler);
  document.getElementById('certCTA')?.addEventListener('click', examHandler);
  
  // Legacy enroll buttons (if any exist from previous markup)
  const oldEnroll = document.getElementById('enrollBtn');
  if (oldEnroll) oldEnroll.addEventListener('click', () => contactInstagram("Hi, I'd like to join the free batch. Please guide me on purchasing the book."));
  const enrollBtn2 = document.getElementById('enrollBtn2');
  if (enrollBtn2) enrollBtn2.addEventListener('click', () => contactInstagram("Hi, I'd like to join the free batch. Please guide me on purchasing the book."));

  // Free educational lectures (Gold technicals)
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
        <div><div class="lecture-title" style="font-weight:500;">${l.title}</div><div class="lecture-meta" style="font-size:0.7rem;">Gold Technicals | Free Lesson</div></div>
        <div class="lecture-actions"><button class="btn-assignment" data-title="${l.title}">Assignment</button><button class="btn-watch" data-video="${l.videoId}">Watch</button></div>
      </div>
    `).join('');
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-watch')) {
        window.open(`https://www.youtube.com/watch?v=${e.target.dataset.video}`, '_blank');
      }
      if (e.target.classList.contains('btn-assignment')) {
        const title = e.target.dataset.title;
        const content = `LabRoom – Gold Technicals Assignment\nTopic: ${title}\n\nTask:\n1. Identify main trend on XAUUSD (Daily).\n2. Mark support & resistance.\n3. Write one-sentence bias based on structure.\nSubmit in LabRoom batch.`;
        const blob = new Blob([content], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s/g, '_')}_Assignment.txt`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  }
})();