let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
  // Update the install UI to notify the user that the app can be installed
  const installButton = document.getElementById('installButton');
  installButton.disabled = false;

  installButton.addEventListener('click', (e) => {
    // hide A2HS button
    installButton.disabled = true;
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});
