(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Back to top
  document.querySelectorAll("[data-top]").forEach(function (b) {
    b.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  });

  // Ripple on buttons
  document.querySelectorAll(".btn, .totop").forEach(function (b) {
    b.addEventListener("pointerdown", function (e) {
      if (reduce) return;
      var r = b.getBoundingClientRect();
      var s = document.createElement("span");
      s.className = "ripple";
      s.style.left = (e.clientX - r.left) + "px";
      s.style.top = (e.clientY - r.top) + "px";
      b.appendChild(s);
      setTimeout(function () { s.remove(); }, 650);
    });
  });

  // Copy buttons
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var target = document.getElementById(b.getAttribute("data-copy"));
      var label = b.getAttribute("data-label") || "Copy";
      function done(ok) {
        b.textContent = ok ? "Copied" : "Press Ctrl+C";
        b.classList.add("done");
        setTimeout(function () { b.textContent = label; b.classList.remove("done"); }, 1800);
      }
      function select() {
        var r = document.createRange(); r.selectNodeContents(target);
        var s = getSelection(); s.removeAllRanges(); s.addRange(r);
      }
      try {
        navigator.clipboard.writeText(target.textContent.trim()).then(function () { done(true); }, function () { select(); done(false); });
      } catch (e) { select(); done(false); }
    });
  });

  // Rotating role on the home page
  var role = document.getElementById("role");
  if (role && !reduce) {
    var words = ["frontend developer", "IT student", "language learner", "logistics dispatcher"];
    var i = 0;
    setInterval(function () {
      i = (i + 1) % words.length;
      var s = document.createElement("span");
      s.textContent = words[i];
      role.replaceChildren(s);
    }, 2400);
  }
})();
