document.addEventListener('DOMContentLoaded', function() {
    const passwordOutput = document.getElementById('password-output');
    const copyBtn = document.getElementById('copy-btn');
    const generateBtn = document.getElementById('generate-btn');
    const saveBtn = document.getElementById('save-btn');
    const lengthSlider = document.getElementById('length-slider');
    const lengthValue = document.getElementById('length-value');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const strengthMeter = document.getElementById('strength-meter');
    const strengthText = document.getElementById('strength-text');

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
        generatePassword();
    });

    [uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach(checkbox => {
        checkbox.addEventListener('change', generatePassword);
    });

    function generatePassword() {
        let chars = '';
        let password = '';

        if (uppercaseCheckbox.checked) chars += uppercaseChars;
        if (lowercaseCheckbox.checked) chars += lowercaseChars;
        if (numbersCheckbox.checked) chars += numberChars;
        if (symbolsCheckbox.checked) chars += symbolChars;

        if (chars === '') {
            chars = uppercaseChars + lowercaseChars + numberChars + symbolChars;
            uppercaseCheckbox.checked = true;
            lowercaseCheckbox.checked = true;
            numbersCheckbox.checked = true;
            symbolsCheckbox.checked = true;
        }

        const length = parseInt(lengthSlider.value);

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }

        passwordOutput.value = password;
        updatePasswordStrength(password);
    }

    copyBtn.addEventListener('click', function() {
        if (!passwordOutput.value) return;

        navigator.clipboard.writeText(passwordOutput.value).then(() => {
            const icon = copyBtn.querySelector('i');
            icon.classList.remove('fa-copy');
            icon.classList.add('fa-check');

            passwordOutput.select();

            setTimeout(() => {
                icon.classList.remove('fa-check');
                icon.classList.add('fa-copy');
            }, 2000);
        });
    });

    saveBtn.addEventListener('click', function() {
        if (!passwordOutput.value) return;

        alert('Password saved to clipboard (simulated action). In a real app, this would save to your password manager.');
        navigator.clipboard.writeText(passwordOutput.value);
    });

    function updatePasswordStrength(password) {
        let strength = 0;

        strength += Math.min(password.length / 32 * 50, 50);

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSymbols = /[^A-Za-z0-9]/.test(password);

        const varietyCount = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;
        strength += (varietyCount / 4) * 50;

        strength = Math.round(strength);

        if (strength < 30) {
            strengthMeter.className = 'password-strength h-2.5 rounded-full bg-red-500';
            strengthText.textContent = 'Weak';
        } else if (strength < 70) {
            strengthMeter.className = 'password-strength h-2.5 rounded-full bg-yellow-500';
            strengthText.textContent = 'Medium';
        } else {
            strengthMeter.className = 'password-strength h-2.5 rounded-full bg-green-500';
            strengthText.textContent = 'Strong';
        }

        strengthMeter.style.width = `${strength}%`;
    }

    generateBtn.addEventListener('click', generatePassword);

    generatePassword();
});
