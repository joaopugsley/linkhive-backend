function validateImage(link: string): boolean {
    const imageExtensions = /\.(jpg|jpeg|png|apng|gif|svg|webp)$/i;
    return imageExtensions.test(link);
}

export default validateImage;