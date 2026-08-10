// Simple Vercel serverless function to accept contact form submissions.
// Logs the submission and returns 200 OK.
// Integration notes: replace the console.log with a free email API (Resend, SendGrid)
// or persist to a free database (Supabase) when you're ready.

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = req.body ?? (await parseJsonBody(req));
    const senderName = body.senderName ?? body.name ?? "";
    const senderEmail = body.senderEmail ?? body.email ?? "";
    const message = body.message ?? "";

    if (!senderName || !senderEmail || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Current: log to the server console. Replace with your integration.
    console.log("Contact submission received:", {
      senderName,
      senderEmail,
      message,
      receivedAt: new Date().toISOString(),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact function error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  async function parseJsonBody(req: any) {
    return new Promise((resolve, reject) => {
      let data = "";
      req.on?.("data", (chunk: any) => {
        data += chunk;
      });
      req.on?.("end", () => {
        try {
          resolve(JSON.parse(data || "{}"));
        } catch (e) {
          resolve({});
        }
      });
      req.on?.("error", reject);
    });
  }
}
