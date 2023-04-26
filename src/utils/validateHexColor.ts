function validateHexColor(str: string): boolean {
    const regex = /^#[a-zA-Z0-9]{6}$/;
    return regex.test(str);
}

export default validateHexColor;