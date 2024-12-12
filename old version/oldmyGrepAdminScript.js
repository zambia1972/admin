/// ==UserScript==
// @name         Grepolis Admin Tool
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds an admin icon to Grepolis and opens a custom popup with toolbar icons
// @author       zambia1972
// @match        https://*.grepolis.com/game/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  // GM_addStyle and other functions...

  function initAdminTool() {
    // ... (implementation)
  }

  // Inline styles with even higher z-index
  GM_addStyle(`
        #admin-icon {
            position: fixed;
            bottom: 50px;
            right: 250px;
            width: 100px;
            height: 100px;
            background-image: url('https://imgur.com/bxsq8pE.png');
            background-size: contain;
            background-repeat: no-repeat;
            cursor: pointer;
            z-index: 2147483647;
            transition: transform 0.3s ease;
        }

        #admin-icon:hover {
            transform: scale(1.1);
        }

        #admin-popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1000px;
            height: 700px;
            background-image: url('https://imgur.com/pP1a9Xp.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            z-index: 2147483648;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
            overflow: hidden;
        }

        #close-popup {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            font-size: 24px;
            color: white;
            background-color: rgba(0,0,0,0.5);
            width: 30px;
            height: 30px;
            border-radius: 50%; /* Fixed: added semicolon */
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background-color 0.3s ease;
            z-index: 2147483649;
        }

        #close-popup:hover {
            background-color: rgba(0,0,0,0.8);
        }

        .admin-toolbar {
            position: absolute;
            top: 80px; /* Adjust to be 80px from the top */
            left: 0;
            right: 0;
            height: 60px;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2147483650;
        }

        .admin-toolbar img {
            width: 50px;
            height: 50px;
            margin: 0 10px;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .admin-toolbar img:hover {
            transform: scale(1.1);
        }

        .admin-content {
            padding: 140px 20px 20px; /* Adjust padding to accommodate toolbar */
            color: black;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
        }

        .admin-title {
            font-size: 48px; // Added 'px'
            text-align: center;
            margin-bottom: 20px;
        }

        #iframe-content {
            width: 100%;
            height: calc(100% - 140px); /* Adjust height to fit within the popup */
            border: none;
        }
    `);

  function checkElementVisibility(element, elementName) {
    if (element) {
      const style = window.getComputedStyle(element);
      console.log(`${elementName} visibility:`, style.visibility);
      console.log(`${elementName} display:`, style.display);
      console.log(`${elementName} opacity:`, style.opacity);
      console.log(`${elementName} z-index:`, style.zIndex);
    } else {
      console.error(`${elementName} not found in DOM`);
    }
  }

  function searchOnGitHub() {
    fetch('https://raw.githubusercontent.com/zambia1972/admin/refs/heads/main')
      .then(response => response.json())
      .then(data => {
        // Process the data received from the GitHub API
        console.log(data);
        // You can implement your own logic here to display or process the data.
      })
      .catch(error => {
        console.error('Error retrieving data from GitHub:', error);
      });
  }

  function initAdminTool() {
    try {
      console.log('Grepolis Admin Tool: Initializing...');

      // Find a suitable parent element in the Grepolis interface
      const parentElement = document.querySelector('#ui_box') || document.body;

      // Create and add the admin icon
      const adminIcon = document.createElement('div');
      adminIcon.id = 'admin-icon';
      parentElement.appendChild(adminIcon);
      console.log('Grepolis Admin Tool: Admin icon added');

      // Create the popup
      const popup = document.createElement('div');
      popup.id = 'admin-popup';
      popup.innerHTML = `
            <div id="close-popup">&times;</div>
            <div class="admin-toolbar">
                <img src="https://imgur.com/GVMs3vO.png" id="icon-home" alt="Home Icon">
                <img src="https://imgur.com/GNw9ihs.png" id="icon-forum" alt="Forum Icon">
            </div>
            <div id="iframe-content" style="display: none; width: 100%; height: calc(100% - 140px); overflow: auto; padding-top: 140px;">
                <h2 class="admin-title">Forum Generator</h2>
                <p>Hier komt de inhoud van de Forum Generator.</p>
            </div>
            <div class="admin-content">
                <h2 class="admin-title">Admin Tool</h2>
                <p>Welcome to the Grepolis Admin Tool. Use this interface to manage game settings and player data.</p>
            </div>
        `;
      document.body.appendChild(popup);
      console.log('Grepolis Admin Tool: Popup created');

      // Add click event to the admin icon
      adminIcon.addEventListener('click', function() {
        popup.style.display = 'block';
        document.querySelector('.admin-content').style.display = 'block';
        document.getElementById('iframe-content').style.display = 'none';
        console.log('Grepolis Admin Tool: Popup opened');
      });

      // Add click event to the close button
      const closeButton = document.getElementById('close-popup');
      if (closeButton) {
        closeButton.addEventListener('click', function() {
          popup.style.display = 'none';
          console.log('Grepolis Admin Tool: Popup closed');
        });
      } else {
        console.error('Close button not found');
      }

      // Add click event to the home icon
      const homeIcon = document.getElementById('icon-home');
      if (homeIcon) {
        homeIcon.addEventListener('click', function() {
          const iframeContent = document.getElementById('iframe-content');
          const adminContent = document.querySelector('.admin-content');

          if (iframeContent && adminContent) {
            iframeContent.style.display = 'none';
            adminContent.style.display = 'block';
            console.log('Grepolis Admin Tool: Showing Admin Content');
          } else {
            console.error('Iframe content or admin content not found');
          }
        });
      } else {
        console.error('Home icon not found');
      }

      // Add click event to the forum icon
      const forumIcon = document.getElementById('icon-forum');
      if (forumIcon) {
        forumIcon.addEventListener('click', function() {
          const iframeContent = document.getElementById('iframe-content');
          const adminContent = document.querySelector('.admin-content');

          if (iframeContent && adminContent) {
            adminContent.style.display = 'none';
            iframeContent.style.display = 'block';
            console.log('Grepolis Admin Tool: Showing Forum Generator');
          } else {
            console.error('Iframe content or admin content not found');
          }
        });
      } else {
        console.error('Forum icon not found');
      }

      console.log('Grepolis Admin Tool: Script loaded successfully');
    } catch (error) {
      console.error('Grepolis Admin Tool: Error in script execution', error);
    }
  }

// Wait for the page to load before initializing
  window.addEventListener('load', function() {
    setTimeout(initAdminTool, 1000); // Wait 1 second after page load
  });
})();