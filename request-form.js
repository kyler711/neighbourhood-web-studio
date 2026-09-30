// Turns the contact page's request form into a pre-filled WhatsApp message.
// A static site can't send photos itself, so the business adds them in the chat.
(function () {
  var WHATSAPP_NUMBER = "6596791769";
  var form = document.getElementById("request-form");
  if (!form) return;
  var error = document.getElementById("rf-error");
  var done = document.getElementById("rf-done");

  function value(name) {
    var el = form.elements[name];
    return el ? el.value.trim() : "";
  }

  function showError(message, field) {
    error.textContent = message;
    error.hidden = false;
    if (field) field.focus();
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    error.hidden = true;
    done.hidden = true;

    var business = value("business");
    var phone = value("phone");
    var insta = value("insta");
    if (!business) return showError("Please add your business name.", form.elements.business);
    if (!phone && !insta) return showError("Please add a phone number or an Instagram so I can reply.", form.elements.phone);

    var wants = Array.prototype.filter
      .call(form.querySelectorAll('input[name="wants"]'), function (box) { return box.checked; })
      .map(function (box) { return box.value; });

    var lines = ["Hi! I'd like a free demo website.", "", "Business: " + business];
    if (value("name")) lines.push("Name: " + value("name"));
    if (value("type")) lines.push("Type: " + value("type"));
    if (phone) lines.push("Phone: " + phone);
    if (insta) lines.push("Instagram: " + insta);
    if (wants.length) lines.push("", "I want: " + wants.join(", "));
    if (value("details")) lines.push("", "More details: " + value("details"));
    if (form.elements.photos.checked) lines.push("", "I'll send photos in this chat.");

    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    done.hidden = false;
    window.location.href = url;
  });

  // Hide the floating WhatsApp button while the form is on screen, so it
  // doesn't cover the fields or the Send button.
  var cta = document.querySelector(".mobile-cta");
  if (cta && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      cta.classList.toggle("is-hidden", entries[0].isIntersecting);
    }).observe(form);
  }
})();
