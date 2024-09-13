document.addEventListener('DOMContentLoaded', function () {
    // Form and output elements
    var resumeForm = document.getElementById('resumeForm');
    var resumeOutput = document.getElementById('resumeOutput');
    var addEducationButton = document.getElementById('addEducation');
    var addWorkExperienceButton = document.getElementById('addWorkExperience');
    // Add more Education fields
    addEducationButton.addEventListener('click', function () {
        var educationSection = document.getElementById('educationSection');
        var newEntry = document.createElement('div');
        newEntry.classList.add('education-entry');
        newEntry.innerHTML = "\n          <input type=\"text\" placeholder=\"Degree\" required>\n          <input type=\"text\" placeholder=\"Institution\" required>\n          <input type=\"text\" placeholder=\"Year\" required>\n      ";
        educationSection.appendChild(newEntry);
    });
    // Add more Work Experience fields
    addWorkExperienceButton.addEventListener('click', function () {
        var workExperienceSection = document.getElementById('workExperienceSection');
        var newEntry = document.createElement('div');
        newEntry.classList.add('work-entry');
        newEntry.innerHTML = "\n          <input type=\"text\" placeholder=\"Job Title\" required>\n          <input type=\"text\" placeholder=\"Company\" required>\n          <input type=\"text\" placeholder=\"Years\" required>\n          <textarea placeholder=\"Description\" required></textarea>\n      ";
        workExperienceSection.appendChild(newEntry);
    });
    // Form submission to generate the resume
    resumeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Capture Personal Information
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var location = document.getElementById('location').value;
        // Capture Education
        var educationEntries = document.querySelectorAll('.education-entry');
        var educationData = Array.from(educationEntries).map(function (entry) {
            var degree = entry.children[0].value;
            var institution = entry.children[1].value;
            var year = entry.children[2].value;
            return { degree: degree, institution: institution, year: year };
        });
        // Capture Work Experience
        var workEntries = document.querySelectorAll('.work-entry');
        var workData = Array.from(workEntries).map(function (entry) {
            var jobTitle = entry.children[0].value;
            var company = entry.children[1].value;
            var years = entry.children[2].value;
            var description = entry.children[3].value;
            return { jobTitle: jobTitle, company: company, years: years, description: description };
        });
        // Capture Skills
        var skills = document.getElementById('skills').value.split(',');
        // Generate Resume
        generateResume(name, email, phone, location, educationData, workData, skills);
    });
    // Function to generate and display the resume
    function generateResume(name, email, phone, location, education, work, skills) {
        resumeOutput.innerHTML = "\n          <div class=\"section\">\n              <h2>Personal Information</h2>\n              <p><strong>Name:</strong> ".concat(name, "</p>\n              <p><strong>Email:</strong> ").concat(email, "</p>\n              <p><strong>Phone:</strong> ").concat(phone, "</p>\n              <p><strong>Location:</strong> ").concat(location, "</p>\n          </div>\n          <div class=\"section\">\n              <h2>Education</h2>\n              ").concat(education.map(function (ed) { return "\n                  <h3>".concat(ed.degree, "</h3>\n                  <p>").concat(ed.institution, ", ").concat(ed.year, "</p>\n              "); }).join(''), "\n          </div>\n          <div class=\"section\">\n              <h2>Work Experience</h2>\n              ").concat(work.map(function (wk) { return "\n                  <h3>".concat(wk.jobTitle, " at ").concat(wk.company, "</h3>\n                  <p>").concat(wk.years, "</p>\n                  <p>").concat(wk.description, "</p>\n              "); }).join(''), "\n          </div>\n          <div class=\"section\">\n              <h2>Skills</h2>\n              <ul>\n                  ").concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "\n              </ul>\n          </div>\n      ");
    }
});
