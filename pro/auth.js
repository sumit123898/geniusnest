// Simple authentication check
function authenticateStudent(username, password) {
    // In a real app, this would check against a database
    // For demo purposes, we'll use simple credentials
    const validStudents = {
        'student1': 'password123',
        'student2': 'hello123',
        'test': 'test'
    };
    
    return validStudents[username] && validStudents[username] === password;
}

// Auto-redirect if someone tries to access login while already logged in
if (window.location.pathname.includes('login2.html') {
    if (localStorage.getItem('loggedIn') {
        window.location.href = 'dashboard2.html';
    }
}