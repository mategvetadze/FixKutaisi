{% extends 'base.html' %}

{% block title %}ავტორიზაცია{% endblock %}

{% block nav_register_active %}class="active"{% endblock %}

{% block content %}
<div class="container fade-in" style="
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
">
    <div class="form-header">
        <h2>ავტორიზაცია</h2>
    </div>
    <div class="form-container">
        <form id="signupForm" class="form" method="post">
            {% csrf_token %}
            <div class="form-group floating-label">
                <input type="text" id="signupName" name="name" placeholder=" " required />
                <label for="signupName">სახელი და გვარი</label>
            </div>

            <div class="form-group floating-label">
                <input type="email" id="signupEmail" name="email" placeholder=" " required />
                <label for="signupEmail">ელექტრონული ფოსტა</label>
            </div>

              <div class="form-group floating-label" style="position:relative;"> 
                <input type="password" id="loginPassword" name="password" placeholder=" " minlength="8" required /> 
                <label for="loginPassword">პაროლი</label> 
                <span class="password-toggle" onclick="togglePassword()"> 
                    <i class="fa-solid fa-eye" id="toggleIcon"></i> 
                </span> 
                <div id="passwordError" class="error-message" style="display: none;"></div>
            </div> 

            <div class="check-box">
                <input type="checkbox" id="agreeTerms" name="agree" required />
                <label for="agreeTerms">ვეთანხმები წესებსა და პირობებს</label>
            </div>

            <button type="submit" class="submit-btn">
                <i class="fa-solid fa-user-plus" style="margin-right: 4px;"></i>
                რეგისტრაცია
            </button>

            <div class="switch-form">
                <p>უკვე გაქვთ ანგარიში? <a href="{% url 'login' %}" class="slide-link" data-slide="slide-right">შესვლა</a></p>
            </div>
        </form>
    </div>
</div>

<style>
.password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #666;
    z-index: 10;
}

.password-toggle:hover {
    color: #333;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
    .container {
        max-width: 90% !important;
        margin: 20px auto !important;
        padding: 25px !important;
    }
}

@media screen and (max-width: 480px) {
    .container {
        max-width: 95% !important;
        margin: 15px auto !important;
        padding: 20px 15px !important;
        border-radius: 8px !important;
    }
    
    .form-header h2 {
        font-size: 1.5rem !important;
    }
    
    .form-group {
        margin-bottom: 20px !important;
    }
    
    .floating-label input {
        padding: 12px !important;
        font-size: 16px !important; /* Prevents zoom on iOS */
    }
    
    .floating-label label {
        font-size: 14px !important;
    }
    
    .password-toggle {
        right: 12px !important;
        padding: 8px !important;
    }
    
    .check-box {
        flex-direction: row !important;
        align-items: flex-start !important;
        gap: 10px !important;
    }
    
    .check-box input[type="checkbox"] {
        margin-top: 2px !important;
        flex-shrink: 0 !important;
    }
    
    .check-box label {
        font-size: 14px !important;
        line-height: 1.4 !important;
    }
    
    .submit-btn {
        padding: 12px !important;
        font-size: 16px !important;
    }
    
    .switch-form p {
        font-size: 14px !important;
    }
}

@media screen and (max-width: 360px) {
    .container {
        max-width: 98% !important;
        margin: 10px auto !important;
        padding: 15px 12px !important;
    }
    
    .form-header h2 {
        font-size: 1.3rem !important;
    }
    
    .floating-label input {
        padding: 10px !important;
        font-size: 15px !important;
    }
    
    .floating-label label {
        font-size: 13px !important;
    }
    
    .password-toggle {
        right: 10px !important;
    }
    
    .check-box label {
        font-size: 13px !important;
    }
    
    .submit-btn {
        padding: 10px !important;
        font-size: 15px !important;
    }
    
    .switch-form p {
        font-size: 13px !important;
    }
}

/* Landscape orientation for mobile */
@media screen and (max-height: 500px) and (orientation: landscape) {
    .container {
        margin: 10px auto !important;
        padding: 15px !important;
    }
    
    .form-header {
        margin-bottom: 15px !important;
    }
    
    .form-group {
        margin-bottom: 15px !important;
    }
    
    .submit-btn {
        margin-bottom: 10px !important;
    }
}

/* Ensure proper touch targets on mobile */
@media (pointer: coarse) {
    .password-toggle {
        min-width: 44px !important;
        min-height: 44px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
    
    .check-box input[type="checkbox"] {
        min-width: 20px !important;
        min-height: 20px !important;
    }
}

/* High DPI displays */
@media screen and (-webkit-min-device-pixel-ratio: 2), 
       screen and (min-resolution: 192dpi) {
    .container {
        box-shadow: 0 4px 25px rgba(0, 0, 0, 0.25) !important;
    }
}
</style>

<script>
function togglePassword() {
    const passwordField = document.getElementById('loginPassword');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

document.getElementById('loginPassword').addEventListener('input', function() {
    const password = this.value;
    const errorDiv = document.getElementById('passwordError');
    
    if (password.length > 0 && password.length < 8) {
        this.setCustomValidity('პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს');
    } else {
        errorDiv.style.display = 'none';
        this.setCustomValidity('');
    }
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    const password = document.getElementById('loginPassword').value;
    
    if (password.length < 8) {
        e.preventDefault();
        const errorDiv = document.getElementById('passwordError');
        document.getElementById('loginPassword').focus();
    }
});
</script>
{% endblock %}

{% block extra_js %}
<script src="../static/js/signup.js"></script>
{% endblock %}