const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const enviarNotificacionTelegram = onRequest(
  { cors: true },
  async (req, res) => {
    try {
      const { mensaje } = req.body;

      if (!mensaje) {
        return res.status(400).json({ error: "Falta el mensaje" });
      }

      const tokenBot = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = "8031996071"; // <--- REEMPLAZA ESTO CON TU NÚMERO DE CHAT ID DE TELEGRAM

      const url = `https://api.telegram.org/bot${tokenBot}/sendMessage`;

      const respuestaTelegram = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: `📢 *Aviso CMS Colegial*\n\n${mensaje}`,
          parse_mode: "Markdown",
        }),
      });

      const data = await respuestaTelegram.json();

      if (data.ok) {
        return res.status(200).json({ success: true, message: "Notificación enviada" });
      } else {
        return res.status(500).json({ success: false, error: data });
      }
    } catch (error) {
      logger.error("Error al enviar notificación", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }
);

exports.enviarNotificacionTelegram = enviarNotificacionTelegram;