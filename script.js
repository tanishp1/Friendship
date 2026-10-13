const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const noteForm = document.querySelector("#note-form");
const generatedNote = document.querySelector("#generated-note");
const noteMessage = document.querySelector("#note-message");
const copyButton = document.querySelector("#copy-note");
const copyStatus = document.querySelector("#copy-status");
const letterPocket = document.querySelector("#open-pocket");
const proposalPanel = document.querySelector("#bear-proposal");
const proposalKicker = document.querySelector("#proposal-kicker");
const proposalQuestion = document.querySelector("#proposal-question");
const proposalStatus = document.querySelector("#proposal-status");
const proposalActions = document.querySelector("#proposal-actions");
const acceptFriendship = document.querySelector("#accept-friendship");
const declineFriendship = document.querySelector("#decline-friendship");
const friendshipGift = document.querySelector("#friendship-gift");
const tryAgain = document.querySelector("#try-again");
let declineCount = 0;

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }
});

letterPocket.addEventListener("click", () => {
  if (letterPocket.getAttribute("aria-expanded") === "true") {
    return;
  }

  letterPocket.setAttribute("aria-expanded", "true");
  letterPocket.setAttribute("aria-label", "The letter pocket is open");
  letterPocket.classList.add("is-open");
  letterPocket.querySelector(".pocket-hint").textContent = "A LITTLE FRIEND IS HERE ♡";
  proposalPanel.hidden = false;
});

acceptFriendship.addEventListener("click", () => {
  letterPocket.classList.add("is-happy");
  letterPocket.setAttribute("aria-label", "The teddy bear is happy");
  proposalKicker.textContent = "YOU JUST MADE A TEDDY'S DAY";
  proposalQuestion.textContent = "A best-friend promise, sealed with a hug.";
  proposalStatus.textContent = "The teddy is so happy you said yes!";
  proposalActions.hidden = true;
  friendshipGift.hidden = false;
});

declineFriendship.addEventListener("click", () => {
  declineCount += 1;

  if (declineCount === 1) {
    proposalActions.classList.add("has-hopped");
    proposalStatus.textContent = "Oops! The Yes button got shy and hopped over here. Either answer is okay.";
    return;
  }

  proposalKicker.textContent = "NO PRESSURE, EVER";
  proposalQuestion.textContent = "Friendship should always feel like a yes.";
  proposalStatus.textContent = "That's completely okay. This little letter and teddy will be here if you ever want them.";
  proposalActions.hidden = true;
  tryAgain.hidden = false;
});

tryAgain.addEventListener("click", () => {
  declineCount = 0;
  proposalKicker.textContent = "A VERY IMPORTANT QUESTION";
  proposalQuestion.textContent = "Will you be my best friend, in every lifetime?";
  proposalStatus.textContent = "";
  proposalActions.hidden = false;
  proposalActions.classList.remove("has-hopped");
  friendshipGift.hidden = true;
  tryAgain.hidden = true;
  letterPocket.classList.remove("is-happy");
  letterPocket.setAttribute("aria-label", "The letter pocket is open");
});

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(noteForm);
  const sender = formData.get("sender").trim() || "Your friend";
  const friend = formData.get("friend").trim();

  if (!friend) {
    noteForm.elements.friend.focus();
    return;
  }

  noteMessage.textContent = `Dear ${friend},\n\nIf I got to choose my person in every lifetime, I'd still find my way to you. You make the ordinary feel like magic, the hard days feel lighter, and every memory a little sweeter. Thank you for being my best friend and my favorite human.\n\nHappy Friendship Day. I'm so glad this is our story.\n${sender} ♡`;
  generatedNote.hidden = false;
  copyStatus.textContent = "";
  generatedNote.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(noteMessage.textContent);
    copyStatus.textContent = "Copied! Your note is ready to send.";
  } catch (error) {
    copyStatus.textContent = "Copy isn’t available here. Select the note above to copy it.";
    console.error("Could not copy the friendship note to the clipboard.", error);
  }
});
