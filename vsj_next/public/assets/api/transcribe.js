// pages/api/transcribe.js
import { SpeechClient } from "@google-cloud/speech";
import path from "path";

/*process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
  process.cwd(),
  "/assets/api/key_service_account.json"
);*/

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    // 1. Récupérer le binaire audio envoyé par le client
    const audioBuffer = req.body.audio;
    // audioBuffer sera au format Base64 ou binaire (selon l’implémentation côté client).

    // 2. Initialiser le client Speech-to-Text
    //   Option si vous ne passez pas par la variable d'environnement (mettez le chemin absolu vers votre fichier JSON)
    const client = new SpeechClient({
      keyFilename: path.join(
        process.cwd(),
        "/assets/api/key_service_account.json"
      ),
    });

    // 3. Configurer la requête pour l’API
    const audio = {
      content: audioBuffer, // base64
    };

    // Paramètres de reconnaissance
    const config = {
      encoding: "LINEAR16", // Selon le format d’enregistrement
      sampleRateHertz: 44100, // Taux d’échantillonnage
      languageCode: "fr-FR", // Code de langue (ex: fr-FR, en-US, etc.)
    };

    const request = {
      audio: audio,
      config: config,
    };

    // 4. Envoyer la requête à l’API
    const [response] = await client.recognize(request);

    // 5. Récupérer la transcription
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");

    return res.status(200).json({ transcription });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
