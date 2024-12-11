// Forum Editor

// Add your forum editor code here
console.log("Forum Editor");// Forum Editor
const popup = document.createElement('div');
popup.id = 'admin-popup';
popup.innerHTML = `
  <div id="close-popup">&times;</div>
  <div class="admin-toolbar">
    ...
  </div>
  <div class="admin-content">
    ...
    <iframe id="iframe-content" src=""></iframe>
  </div>
`;
document.body.appendChild(popup);
// Add your forum editor code here