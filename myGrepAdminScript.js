// ==UserScript==
// @name         Grepolis Admin Tool
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Adds an admin icon to Grepolis and opens a custom popup with toolbar icons
// @author       Your Name
// @match        https://*.grepolis.com/game/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

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
            border-radius: 50
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
            font-size: 48;
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
        fetch('https://api.github.com/repos/boodtrap/admin/git/trees/main')
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
            console.log('Gre Admin Tool: Initializing...');

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
            });

            // Add click event to the close button
            document.getElementById('close-popup').addEventListener('click', function() {
                popup.style.display = 'none';
                console.log('Grepolis Admin Tool: Popup closed');
            });

            // Add click event to the home icon
            document.getElementById('icon-home').addEventListener('click', function() {
                window.location.href = window.location.href; // Reload the current page
                console.log('Grepolis Admin Tool: Returning to current page');
            });

            // Add click event to the forum icon
            document.getElementById('icon-forum').addEventListener('click', function() {
                const iframe = document.getElementById('iframe-content');
                if (iframe) {
                    console.log('Grepolis Admin Tool: Displaying forum editor in popup');
                    iframe.src = '/src/forumeditor.html'; // Display the forum editor HTML file in the iframe
                    const popup = document.getElementById('admin-popup');
                    popup.style.display = 'block'; // Show the popup
                    console.log('Grepolis Admin Tool: Popup displayed');
                } else {
                    console.error('Grepolis Admin Tool: Unable to find iframe element');
                }
            });

            // Check visibility of elements
            setTimeout(() => {
                checkElementVisibility(adminIcon, 'Admin Icon');
                checkElementVisibility(popup, 'Popup');
            }, 1000);

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