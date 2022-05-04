const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;//stash event for later 
  butInstall.classList.toggle('hidden', false); //allow toggle
});

butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null; //clear stashed event

  butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  
  window.deferredPrompt = null; //clear stashed event
});
