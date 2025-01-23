export const sendEmail = (to, asunto, cuerpo) => {
    const subject = encodeURIComponent(asunto);
    const body = encodeURIComponent(cuerpo);
    const recipient = to;

    // Construir la URL para mailto
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Abrir el cliente de correo predeterminado
    window.location.href = mailtoLink;
};