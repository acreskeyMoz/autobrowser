document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const status = document.getElementById('status');

  // Check current status
  chrome.storage.local.get(['isRunning', 'currentIndex'], function(result) {
    if (result.isRunning) {
      startBtn.disabled = true;
      stopBtn.disabled = false;
      status.textContent = `Running... (Site ${result.currentIndex || 0}/1000)`;
    }
  });

  startBtn.addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'start'}, function(response) {
      if (response.success) {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        status.textContent = 'Starting...';
      }
    });
  });

  stopBtn.addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'stop'}, function(response) {
      if (response.success) {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        status.textContent = 'Stopped';
      }
    });
  });

  // Listen for status updates
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'statusUpdate') {
      status.textContent = request.status;
    }
  });
});