# Website Tab Loader Browser Extension

A cross-browser extension (Chrome/Firefox) that automatically loads the top 100 websites in tabs with controlled cycling. The extension opens websites one by one, waits 5 seconds between loads, and manages tab count by closing older tabs.

## ⚠️ Important Notice

This extension is designed for educational and testing purposes. It opens many tabs and can consume significant system resources. Use responsibly and ensure your system has adequate memory and processing power.

## Features

- Loads top 100 popular websites automatically
- 5-second delay between each website load
- Smart tab management: keeps only 2 tabs open at a time
- Start/stop controls through popup interface
- Real-time status updates

## Installation

### Chrome Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the folder containing this extension
5. The extension icon should appear in your toolbar

### Firefox Installation

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on..."
4. Navigate to the extension folder and select `manifest.json`
5. The extension will be loaded temporarily until Firefox is restarted

**Note for Firefox**: For permanent installation, you would need to sign the extension through Mozilla's AMO (addons.mozilla.org) process.

## Usage

1. Click the extension icon in your browser toolbar
2. Click "Start Loading Websites" to begin
3. The extension will start loading websites with 5-second intervals
4. Monitor progress through the status display
5. Click "Stop Loading" to halt the process at any time

### Debugging

**Chrome**: Navigate to `chrome://extensions/`, find the extension, and click "Inspect views: background page" to access developer tools.

**Firefox**: Navigate to `about:debugging`, find the extension under "Temporary Extensions", and click "Inspect" to access developer tools.

## File Structure

```
├── manifest.json       # Extension configuration
├── popup.html         # User interface
├── popup.js          # Popup logic
├── background.js     # Main extension logic
└── README.md         # This file
```

## How It Works

1. **Tab Management**: Opens new tabs for each website while maintaining a maximum of 2 open tabs
2. **Timing**: Waits exactly 5 seconds between each website load
3. **Cleanup**: Automatically closes older tabs to prevent browser overload
4. **Control**: Provides start/stop functionality through the popup interface

## Permissions

The extension requires the following permissions:
- `tabs`: To create and manage browser tabs
- `activeTab`: To interact with the current tab
- `storage`: To persist state between sessions
- `<all_urls>`: To navigate to various websites

## Customization

To modify the website list, edit the `TOP_100_WEBSITES` array in `background.js`.

## Troubleshooting

- If tabs don't open, check that popup blockers are disabled
- For performance issues, ensure adequate system resources
- If the extension doesn't load, verify all files are in the same directory
- **Firefox specific**: If the extension doesn't work, check the Browser Console (`Ctrl+Shift+J`) for errors
- **Chrome specific**: Check the extension's background page console for error messages

## Disclaimer

This extension is for educational purposes. The website list includes popular sites for testing purposes. Users are responsible for complying with websites' terms of service and robots.txt files.