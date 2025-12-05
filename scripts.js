// ========================================
// GLOBAL VARIABLES & INITIALIZATION
// ========================================

let currentUser = null;
let confirmCallback = null;

// Initialize application
document.addEventListener("DOMContentLoaded", function () {
  currentUser = localStorage.getItem("currentUser");

  if (document.getElementById("chatMessages")) {
    displayMessages();
  }

  if (document.getElementById("users")) {
    loadUsers();
  }

  if (document.getElementById("myUploadsTableBody")) {
    loadDocuments();
  }

  const fileInput = document.getElementById("fileInput");
  if (fileInput) {
    fileInput.addEventListener("change", function (e) {
      const fileDisplay = document.getElementById("fileDisplay");
      if (e.target.files.length > 0) {
        fileDisplay.textContent = e.target.files[0].name;
      }
    });
  }

  // Add simple email validation for register page
  const emailInput = document.getElementById("email");
  if (emailInput && window.location.pathname.includes("register.html")) {
    emailInput.addEventListener("blur", function () {
      validateEmailField(this.value);
    });

    // Clear error message when user starts typing valid email
    emailInput.addEventListener("input", function () {
      const emailError = document.getElementById("emailError");
      if (this.value && isValidEmail(this.value)) {
        emailError.style.display = "none";
      }
    });
  }
});

// Email validation function (moved outside handleRegister for reuse)
function isValidEmail(email) {
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailFormat.test(email);
}

function validateEmailField(email) {
  const emailError = document.getElementById("emailError");

  if (email && !isValidEmail(email)) {
    emailError.textContent = "Please enter a valid email address";
    emailError.style.display = "block";
    return false;
  } else {
    emailError.style.display = "none";
    return true;
  }
}

// ========================================
// REGISTER PAGE FUNCTIONS
// ========================================

function handleRegister(event) {
  event.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (fullName && email && password) {
    const users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    // Check if email already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      alert("Email already registered. Please use a different email.");
      return;
    }

    const newUser = {
      fullName: fullName,
      email: email,
      password: password,
      registeredDate: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "register_success.html";
  } else {
    alert("Please fill in all fields");
  }
}

// ========================================
// LOGIN PAGE FUNCTIONS
// ========================================

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", email);
    localStorage.setItem("userName", user.fullName);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password");
  }
}

// ========================================
// DASHBOARD PAGE FUNCTIONS
// ========================================

// Navigation Functions
function showSection(sectionName) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));

  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => btn.classList.remove("active"));

  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  event.target.classList.add("active");
}

function showDocumentTab(tabName) {
  const tabs = document.querySelectorAll(".document-tab");
  tabs.forEach((tab) => tab.classList.remove("active"));

  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => btn.classList.remove("active"));

  const targetTab = document.getElementById(tabName);
  if (targetTab) {
    targetTab.classList.add("active");
  }

  event.target.classList.add("active");
}

// Chat Functions
function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();

  if (message) {
    const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
    const userName = localStorage.getItem("userName") || "Current User";

    const messages = localStorage.getItem("chatMessages")
      ? JSON.parse(localStorage.getItem("chatMessages"))
      : [];

    const newMessage = {
      timestamp: timestamp,
      userName: userName,
      text: message,
    };

    messages.push(newMessage);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    displayMessages();
    messageInput.value = "";
  }
}

function displayMessages() {
  const chatMessages = document.getElementById("chatMessages");
  const messages = localStorage.getItem("chatMessages")
    ? JSON.parse(localStorage.getItem("chatMessages"))
    : [];

  chatMessages.innerHTML = "";

  messages.forEach((msg) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    
    // Extract only time (HH:MM) from timestamp
    const timeOnly = msg.timestamp.split(' ')[1].slice(0, 5);
    
    messageDiv.innerHTML = `
            <span class="timestamp" style="margin-right: 10px;">${timeOnly}</span>
            <span class="username">${msg.userName}:</span>
            <span class="text">${msg.text}</span>
            
        `;
    chatMessages.appendChild(messageDiv);
  });

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function refreshChat() {
  displayMessages();
}

// User Management Functions
function editUser(email) {
  const modal = document.getElementById("editUserModal");
  const fullNameInput = document.getElementById("editFullName");
  const emailInput = document.getElementById("editEmail");

  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  const user = users.find((u) => u.email === email);

  fullNameInput.value = user ? user.fullName : "";
  emailInput.value = email;
  modal.style.display = "block";

  const form = document.getElementById("editUserForm");
  form.onsubmit = function (e) {
    e.preventDefault();

    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex !== -1) {
      users[userIndex].fullName = fullNameInput.value;
      users[userIndex].email = emailInput.value;
      localStorage.setItem("users", JSON.stringify(users));
      alert("User updated successfully");
      loadUsers();
      closeModal("editUserModal");
    }
  };
}

function deleteUser(email) {
  confirmCallback = function () {
    const users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    const updatedUsers = users.filter((u) => u.email !== email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    loadUsers();
    closeModal("confirmModal");
  };

  showConfirmModal();
}

function loadUsers() {
  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  const userTableBody = document.querySelector("#users tbody");
  if (userTableBody) {
    userTableBody.innerHTML = "";
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${user.fullName}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-small" onclick="editUser('${user.email}')">Edit</button>
                </td>
                <td>
                    <button class="btn btn-small btn-danger" onclick="deleteUser('${user.email}')">Delete</button>
                </td>
            `;
      userTableBody.appendChild(row);
    });
  }
}

// Document Management Functions
function editDocument(fileName) {
  alert(`Editing document: ${fileName}`);
}

function deleteDocument(fileName) {
  confirmCallback = function () {
    const documents = localStorage.getItem("documents")
      ? JSON.parse(localStorage.getItem("documents"))
      : [];

    const updatedDocuments = documents.filter((d) => d.fileName !== fileName);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
    loadDocuments();
    closeModal("confirmModal");
  };

  showConfirmModal();
}

function showUploadForm() {
  const modal = document.getElementById("uploadModal");
  modal.style.display = "block";

  const form = document.getElementById("uploadForm");
  form.onsubmit = function (e) {
    e.preventDefault();
    const fileInput = document.getElementById("fileInput");

    if (fileInput.files.length > 0) {
      const documents = localStorage.getItem("documents")
        ? JSON.parse(localStorage.getItem("documents"))
        : [];

      const newDocument = {
        fileName: fileInput.files[0].name,
        uploadedBy: localStorage.getItem("userName") || "Current User",
        uploadDate: new Date().toISOString(),
        size: fileInput.files[0].size,
      };

      documents.push(newDocument);
      localStorage.setItem("documents", JSON.stringify(documents));
      alert("File uploaded successfully");
      loadDocuments();
      closeModal("uploadModal");
    } else {
      alert("Please select a file");
    }
  };
}

function loadDocuments() {
  const documents = localStorage.getItem("documents")
    ? JSON.parse(localStorage.getItem("documents"))
    : [];

  const docTableBody = document.getElementById("myUploadsTableBody");
  if (docTableBody) {
    docTableBody.innerHTML = "";
    documents.forEach((doc) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${doc.fileName}</td>
                <td>${doc.fileName}</td>
                <td>
                    <button class="btn btn-small" onclick="editDocument('${doc.fileName}')">Edit</button>
                </td>
                <td>
                    <button class="btn btn-small btn-danger" onclick="deleteDocument('${doc.fileName}')">Delete</button>
                </td>
            `;
      docTableBody.appendChild(row);
    });
  }
}

// Modal Functions
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

function showConfirmModal() {
  const modal = document.getElementById("confirmModal");
  modal.style.display = "block";
}

function confirmAction() {
  if (confirmCallback) {
    confirmCallback();
    confirmCallback = null;
  }
}

// ========================================
// UTILITY FUNCTIONS & EVENT LISTENERS
// ========================================

// Authentication Utility
function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("userName");
  window.location.href = "index.html";
}

// Event Listeners
window.onclick = function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

document.addEventListener("keypress", function (e) {
  if (e.target.id === "messageInput" && e.key === "Enter") {
    sendMessage();
  }
});
