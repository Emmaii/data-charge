// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Sample data — matches your 5 PDFs exactly
const samples = [
  {
    title: "How ETFs Changed Investing Forever",
    category: "Finance / Explainer",
    excerpt: "Here's a confession: I used to think investing was for other people. Spreadsheets. Wall Street jargon. Enough money to buy a small house before you could even get started.",
    pdfUrl: "https://raw.githubusercontent.com/Emmaii/Portfolio/main/assets/How%20ETFs%20Changed%20Investing%20Forever.pdf"
  },
  {
    title: "ReplyFlow — Speed-to-Lead Activation Sequence",
    category: "Email Marketing / Nurture",
    excerpt: "Goal: Convert free trial users into paying customers by demonstrating value fast. Short. Sharp. No fluff.",
    pdfUrl: "https://raw.githubusercontent.com/Emmaii/Portfolio/main/assets/ReplyFlow%20--%20Speed-to-Lead%20Activation%20Sequence.pdf"
  },
  {
    title: "Stop Losing Leads Because You Respond Too Late",
    category: "Lead Conversion / Sales Copy",
    excerpt: "You don't have a traffic problem. You have a timing problem. Studies show respond within 5 minutes and you convert dramatically better.",
    pdfUrl: "https://raw.githubusercontent.com/Emmaii/Portfolio/main/assets/Stop%20Losing%20Leads%20Because%20You%20Respond%20Too%20Late.pdf"
  },
  {
    title: "Velvra Cocoa Milk Shake — Website Content",
    category: "Product / Brand Storytelling",
    excerpt: "Rich chocolate. Cold finish. No drama. Velvra is a slow-melt chocolate shake for moments when you want something rich, cold, and deeply satisfying.",
    pdfUrl: "https://raw.githubusercontent.com/Emmaii/Portfolio/main/assets/Website%20content%20--%20Velvra%20Cocoa%20Milk%20Shake.pdf"
  },
  {
    title: "Why Compound Interest Is the Most Powerful Force in Personal Finance",
    category: "Finance / Educational",
    excerpt: "Let me tell you about two people. Neither is a genius. Neither got lucky. Meet Maya. She's 22... and she wins by over $350,000.",
    pdfUrl: "https://raw.githubusercontent.com/Emmaii/Portfolio/main/assets/Why%20Compound%20Interest%20Is%20the%20Most%20Powerful%20Force%20in%20Personal%20Finance.pdf"
  }
];

// Generate sample cards
const grid = document.getElementById('samplesGrid');
if (grid) {
  samples.forEach((sample, idx) => {
    const card = document.createElement('div');
    card.className = 'sample-card';
    card.innerHTML = `
      <h3>${sample.title}</h3>
      <div class="sample-meta">${sample.category}</div>
      <p>${sample.excerpt.substring(0, 120)}${sample.excerpt.length > 120 ? '…' : ''}</p>
      <button class="read-btn" data-idx="${idx}">Read full sample →</button>
    `;
    grid.appendChild(card);
  });

  // Modal logic
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.querySelector('.modal-close');

  function openModal(pdfUrl, title) {
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <p style="margin-bottom: 20px;">Loading PDF: <strong>${title}</strong></p>
        <iframe src="${pdfUrl}" style="width: 100%; height: 70vh; border: none; border-radius: 12px;"></iframe>
        <p style="margin-top: 16px; font-size: 0.8rem; color: #5f6e7a;">If the PDF doesn't load, <a href="${pdfUrl}" target="_blank">click here to open it directly</a>.</p>
      </div>
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modalBody.innerHTML = '';
  }

  closeModal.addEventListener('click', closeModalFunc);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFunc();
  });

  document.querySelectorAll('.read-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = btn.getAttribute('data-idx');
      if (idx !== null && samples[idx]) {
        openModal(samples[idx].pdfUrl, samples[idx].title);
      }
    });
  });
}

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
