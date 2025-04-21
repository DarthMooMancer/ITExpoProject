// Google Sign-In configuration
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual Google Client ID
const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual Google API Key

// Initialize Google Sign-In
function initGoogleSignIn() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: CLIENT_ID,
            api_key: API_KEY,
            scope: 'profile email'
        }).then(function() {
            // Check if user is already signed in
            const authInstance = gapi.auth2.getAuthInstance();
            if (authInstance.isSignedIn.get()) {
                handleSignIn(authInstance.currentUser.get());
            }
        });
    });
}

// Handle successful sign-in
function handleSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;
    
    // Store user information
    const userData = {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl()
    };
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('idToken', idToken);
    
    // Update UI
    updateUserUI(userData);
    
    // Load student data
    loadStudentData(userData.id);
}

// Sign out function
function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        localStorage.removeItem('userData');
        localStorage.removeItem('idToken');
        window.location.href = 'index.html';
    });
}

// Update UI with user information
function updateUserUI(userData) {
    const userInfo = document.getElementById('user-info');
    if (userInfo) {
        userInfo.innerHTML = `
            <img src="${userData.imageUrl}" alt="Profile" class="profile-image">
            <span>${userData.name}</span>
            <button onclick="signOut()" class="sign-out-btn">
                <i class="fas fa-sign-out-alt"></i> Sign Out
            </button>
        `;
    }
}

// Load student data
function loadStudentData(userId) {
    // In a real application, this would fetch from your backend
    // For now, we'll use mock data
    const mockStudentData = {
        assignments: [
            {
                id: 1,
                title: "Math Project",
                dueDate: "2024-04-20",
                status: "pending",
                description: "Complete the geometry project on 3D shapes."
            },
            // Add more mock assignments
        ],
        grades: [
            {
                subject: "Math",
                score: 92,
                date: "2024-04-15"
            },
            // Add more mock grades
        ],
        attendance: [
            {
                date: "2024-04-15",
                status: "present"
            },
            // Add more mock attendance records
        ]
    };
    
    // Store in localStorage for demo purposes
    localStorage.setItem('studentData', JSON.stringify(mockStudentData));
    
    // Update the UI with the loaded data
    updateStudentUI(mockStudentData);
}

// Update student UI with loaded data
function updateStudentUI(studentData) {
    // Update assignments
    const assignmentsContainer = document.querySelector('.student-main');
    if (assignmentsContainer) {
        const assignmentsHTML = studentData.assignments.map(assignment => `
            <div class="assignment-card">
                <div class="assignment-header">
                    <span class="assignment-title">${assignment.title}</span>
                    <span class="assignment-due">Due: ${assignment.dueDate}</span>
                </div>
                <div class="assignment-content">
                    <p>${assignment.description}</p>
                </div>
                <span class="assignment-status status-${assignment.status}">
                    ${assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </span>
            </div>
        `).join('');
        
        assignmentsContainer.querySelector('h2').insertAdjacentHTML('afterend', assignmentsHTML);
    }
    
    // Update grades
    const gradesContainer = document.querySelector('.grade-section');
    if (gradesContainer) {
        const gradesHTML = studentData.grades.map(grade => `
            <div class="grade-item">
                <span class="grade-label">${grade.subject}</span>
                <span class="grade-value">${grade.score}%</span>
            </div>
        `).join('');
        
        gradesContainer.querySelector('h3').insertAdjacentHTML('afterend', gradesHTML);
    }
}

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', function() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        updateUserUI(JSON.parse(userData));
        const studentData = localStorage.getItem('studentData');
        if (studentData) {
            updateStudentUI(JSON.parse(studentData));
        }
    }
}); 