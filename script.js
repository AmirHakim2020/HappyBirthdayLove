// Create floating heart
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.animationDuration = (Math.random() * 5 + 5) + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

setInterval(createHeart, 500);

// Smooth scroll to top on page load
window.onload = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Animate memory sections on scroll
const memories = document.querySelectorAll('.memory');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, {
  threshold: 0.2
});

memories.forEach(memory => observer.observe(memory)); // ✅ Start observing

// Show the surprise message and launch confetti
function showSurprise() {
  const dinnerMessage = document.getElementById("dinner-message");
  if (dinnerMessage.style.display === "none") {
    dinnerMessage.style.display = "block";
    launchConfetti();
  } else {
    dinnerMessage.style.display = "none";
  }
}


// Launch confetti animation on canvas
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  canvas.width = window.innerWidth;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");

  let confettis = [];

  for (let i = 0; i < 100; i++) {
    confettis.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 25 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`, // ✅ Fixed syntax
      tilt: Math.random() * 10 - 10
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach((c, i) => {
      ctx.beginPath();
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.r, c.r);
      ctx.closePath();

      c.y += c.d * 0.1;
      c.x += Math.sin(c.tilt) * 2;
      c.tilt += 0.1;

      if (c.y > canvas.height) {
        confettis[i].y = -10;
        confettis[i].x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(draw);
  }

  draw();
}
