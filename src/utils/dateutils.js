export const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ajouter un zéro devant si nécessaire
    const day = String(date.getDate()).padStart(2, '0'); // Ajouter un zéro devant si nécessaire
    return `${year}-${month}-${day}`;
};