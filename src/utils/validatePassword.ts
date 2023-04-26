function validatePassword(password: string): boolean {
    const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$&*\-_+=?]).+$/;
    return passwordRegex.test(password);
}

export default validatePassword;