// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Sample data with PDF links (using raw GitHub URLs)
const samples = [
  {
    title: "Why Financial Literacy Matters More Than Ever in 2026",
    excerpt: "Let me ask you something. When was the last time you felt completely confident about a financial decision—without second-guessing yourself afterward?",
    pdfUrl: "https://raw.githubusercontent.com/Emmaii/Portfolio/main/assets/Why%20Financial%20Literacy%20Matters%20More%20Than%20Ever%20in%202026.pdf"
  },
  {
    title: "The Silent Wealth Builder: Why Compound Interest Is the Most Powerful Force in Personal Finance",
    excerpt: "Let me tell you about two people. Neither is a genius. Neither got lucky. Meet Maya. She's 22, just landed her first full-time job...",
    pdfUrl: "https://raw.githubusercontent.com/Emmaii/Portfolio/main/assets/The_Silent_Wealth_Builder_Why_Compound_Interest_Is_the_Most_Powerful.pdf"
  },
  {
    title: "How ETFs Changed Investing Forever",
    excerpt: "Here's a confession: I used to think investing was for other people. You know the type. Spreadsheets. Wall Street jargon...",
    pdfUrl: "https://raw.githubusercontent.com/Emmaii/Portfolio/main/assets/How%20ETFs%20Changed%20Investing%20Forever.pdf"
  }
];

// Generate sample cards
const grid = document.getElementById('samplesGrid');
if (grid) {
  samples.forEach((sample) => {
    const card = document.createElement('div');
    card.className = 'sample-card';
    card.innerHTML = `
      <h3>${sample.title}</h3>
      <div class="sample-meta">Sample • Finance writing</div>
      <p>${sample.excerpt.substring(0, 140)}…</p>
      <button class="read-btn" data-url="${sample.pdfUrl}">Read full sample →</button>
    `;
    grid.appendChild(card);
  });

  // Attach event listeners to buttons
  document.querySelectorAll('.read-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pdfUrl = btn.getAttribute('data-url');
      if (pdfUrl) {
        window.open(pdfUrl, '_blank');
      }
    });
  });
}

// Typing Animation (black & white version)
const words = ["fintechs write better briefs", "brokerages build trust", "publishers turn complexity into clarity"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTextElement = document.getElementById('typing-text');
const cursorElement = document.querySelector('.typing-cursor');

function typeEffect() {
  const currentWord = words[wordIndex];
  let displayText = currentWord.substring(0, charIndex);
  typingTextElement.textContent = displayText;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 300);
  }
}

// Start typing animation after page loads
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 500);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
