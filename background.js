const TOP_100_WEBSITES = [
  'https://google.com',
  'https://youtube.com',
  'https://facebook.com',
  'https://twitter.com',
  'https://instagram.com',
  'https://baidu.com',
  'https://wikipedia.org',
  'https://yandex.ru',
  'https://yahoo.com',
  'https://whatsapp.com',
  'https://amazon.com',
  'https://live.com',
  'https://linkedin.com',
  'https://netflix.com',
  'https://discord.com',
  'https://tiktok.com',
  'https://microsoft.com',
  'https://reddit.com',
  'https://office.com',
  'https://pinterest.com',
  'https://ebay.com',
  'https://twitch.tv',
  'https://bilibili.com',
  'https://mail.ru',
  'https://zoom.us',
  'https://news.google.com',
  'https://paypal.com',
  'https://shopify.com',
  'https://github.com',
  'https://apple.com',
  'https://spotify.com',
  'https://adobe.com',
  'https://dropbox.com',
  'https://salesforce.com',
  'https://stackoverflow.com',
  'https://wordpress.com',
  'https://tumblr.com',
  'https://medium.com',
  'https://etsy.com',
  'https://booking.com',
  'https://airbnb.com',
  'https://uber.com',
  'https://canva.com',
  'https://gmail.com',
  'https://docs.google.com',
  'https://drive.google.com',
  'https://maps.google.com',
  'https://translate.google.com',
  'https://play.google.com',
  'https://chrome.google.com',
  'https://blogger.com',
  'https://slideshare.net',
  'https://vimeo.com',
  'https://soundcloud.com',
  'https://imgur.com',
  'https://flickr.com',
  'https://scribd.com',
  'https://tripadvisor.com',
  'https://yelp.com',
  'https://craigslist.org',
  'https://cnn.com',
  'https://bbc.com',
  'https://nytimes.com',
  'https://washingtonpost.com',
  'https://theguardian.com',
  'https://reuters.com',
  'https://bloomberg.com',
  'https://forbes.com',
  'https://wsj.com',
  'https://espn.com',
  'https://weather.com',
  'https://imdb.com',
  'https://goodreads.com',
  'https://quora.com',
  'https://zillow.com',
  'https://indeed.com',
  'https://glassdoor.com',
  'https://monster.com',
  'https://coursera.org',
  'https://udemy.com',
  'https://khanacademy.org',
  'https://duolingo.com',
  'https://ted.com',
  'https://hulu.com',
  'https://disneyplus.com',
  'https://primevideo.com',
  'https://peacocktv.com',
  'https://paramountplus.com',
  'https://funimation.com',
  'https://crunchyroll.com',
  'https://steam.com',
  'https://epicgames.com',
  'https://ea.com',
  'https://ubisoft.com',
  'https://activision.com',
  'https://roblox.com',
  'https://minecraft.net',
  'https://battle.net',
  'https://origin.com',
  'https://slack.com',
  'https://telegram.org',
  'https://snapchat.com',
  'https://skype.com',
  'https://signal.org',
  'http://example.com',
  'http://httpbin.org',
  'http://neverssl.com',
  'https://atlassian.com',
  'https://trello.com'
];

let isRunning = false;
let currentIndex = 0;
let loadIntervalId = null;
let openTabs = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start') {
    startLoading();
    sendResponse({success: true});
  } else if (request.action === 'stop') {
    stopLoading();
    sendResponse({success: true});
  }
});

async function startLoading() {
  if (isRunning) return;
  
  isRunning = true;
  currentIndex = 0;
  openTabs = [];
  
  await chrome.storage.local.set({isRunning: true, currentIndex: 0});
  
  updateStatus(`Starting... (Site 1/${TOP_100_WEBSITES.length})`);
  
  loadIntervalId = setInterval(async () => {
    if (currentIndex >= TOP_100_WEBSITES.length) {
      stopLoading();
      return;
    }
    
    await loadNextWebsite();
    currentIndex++;
    
    await chrome.storage.local.set({currentIndex: currentIndex});
  }, 5000);
  
  // Load first website immediately
  await loadNextWebsite();
  currentIndex++;
}

async function loadNextWebsite() {
  if (currentIndex >= TOP_100_WEBSITES.length) return;
  
  const url = TOP_100_WEBSITES[currentIndex];
  updateStatus(`Loading ${url} (${currentIndex + 1}/${TOP_100_WEBSITES.length})`);
  
  try {
    // Create new tab
    const newTab = await chrome.tabs.create({
      url: url,
      active: false
    });
    
    openTabs.push(newTab.id);
    
    // Every other tab (after 2 tabs), close the oldest one
    if (openTabs.length > 2) {
      const tabToClose = openTabs.shift();
      try {
        await chrome.tabs.remove(tabToClose);
      } catch (error) {
        console.log('Tab already closed:', tabToClose);
      }
    }
    
  } catch (error) {
    console.error('Error loading website:', url, error);
    updateStatus(`Error loading ${url}: ${error.message}`);
  }
}

async function stopLoading() {
  isRunning = false;
  
  if (loadIntervalId) {
    clearInterval(loadIntervalId);
    loadIntervalId = null;
  }
  
  await chrome.storage.local.set({isRunning: false});
  
  // Close all opened tabs
  for (const tabId of openTabs) {
    try {
      await chrome.tabs.remove(tabId);
    } catch (error) {
      console.log('Tab already closed:', tabId);
    }
  }
  
  openTabs = [];
  updateStatus('Stopped');
}

function updateStatus(status) {
  // Try to send status to popup if it's open
  chrome.runtime.sendMessage({
    action: 'statusUpdate',
    status: status
  }).catch(() => {
    // Popup not open, ignore error
  });
}