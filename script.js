(function() {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typing Animation
  const phrases = ["Read markets.", "Follow capital.", "Manage risk.", "Execute with confidence.", "Repeat."];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;
  const typingEl = document.getElementById('typingLine');

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      setTimeout(typeEffect, 70);
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
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

  // COUNTER – Only starts when you scroll to the section
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
              counterEl.textContent = '57+';
              clearInterval(timer);
            } else {
              counterEl.textContent = current;
            }
          }, 50);
          observer.disconnect(); // Stop observing once started
        }
      });
    }, { threshold: 0.2 });
    observer.observe(counterBox);
  }

  // Buy Button Logic (Instagram DM + Copy Message)
  const buyBtn = document.getElementById('buyBookBtn');
  if (buyBtn) {
    buyBtn.addEventListener('click', function() {
      const msg = "Hi, I want to get this book so I can join the next batch of students.";
      navigator.clipboard.writeText(msg).then(() => {
        const igUrl = "https://www.instagram.com/emmanuelsilaskelechi?igsh=b282cGxsa3d3Zjgy&utm_source=qr";
        window.open(igUrl, '_blank');
      }).catch(() => {
        const igUrl = "https://www.instagram.com/emmanuelsilaskelechi?igsh=b282cGxsa3d3Zjgy&utm_source=qr";
        window.open(igUrl, '_blank');
        alert("Please send this message: \n\n" + msg);
      });
    });
  }

  // Lecture List + Watch & Assignment Buttons
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
    container.innerHTML = lectures.map((l) => `
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

  // Section Reveal Observer
  const hiddenEls = document.querySelectorAll('.section-hidden');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  hiddenEls.forEach(el => observer.observe(el));
})()