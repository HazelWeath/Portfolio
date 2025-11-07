function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Fermer la modale si on clique en dehors
window.onclick = function(event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};




document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  fetch("https://formspree.io/f/xyzlggvo", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
      window.location.href = "thank-you.html";
    } else {
      alert("Erreur lors de l'envoi du message.");
    }
  })
  .catch(() => {
    alert("Erreur réseau.");
  });
});

