const castingForm = document.querySelector('.casting-form');
const responseText = document.querySelector('.form-response');
const watchTrailerButton = document.querySelector('.btn-secondary');
const trailerBox = document.querySelector('.trailer-box');

// Small cinematic interaction for the trailer call-to-action.
watchTrailerButton?.addEventListener('click', () => {
  trailerBox.animate(
    [
      { transform: 'scale(1)', boxShadow: '0 0 24px rgba(55, 213, 255, 0.23)' },
      { transform: 'scale(1.015)', boxShadow: '0 0 34px rgba(155, 77, 255, 0.5)' },
      { transform: 'scale(1)', boxShadow: '0 0 24px rgba(55, 213, 255, 0.23)' },
    ],
    { duration: 700, easing: 'ease-out' }
  );

  watchTrailerButton.textContent = 'Trailer Coming Soon';
  setTimeout(() => {
    watchTrailerButton.textContent = 'Watch Trailer';
  }, 1600);
});

// Front-end form handling for the casting section.
castingForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!castingForm.checkValidity()) {
    responseText.textContent = 'Please complete all fields before submitting.';
    return;
  }

  const username = castingForm.elements.username.value.trim();
  responseText.textContent = `Application received, ${username || 'player'}! Stay ready.`;
  castingForm.reset();
});
