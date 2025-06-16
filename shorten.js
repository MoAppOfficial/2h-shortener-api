export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await fetch("https://2h.ae/api/url/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer aa166f9caac6c6f6a2c878e522041978" // المفتاح بتاعك
                },
                body: JSON.stringify({
                    url: req.body.url,
                    status: "public"
                })
            });

            const data = await response.json();
            res.status(200).json(data);

        } catch (error) {
            res.status(500).json({ error: '🔥 حصل خطأ في الـ API', details: error.toString() });
        }
    } else {
        res.status(405).json({ error: 'الطريقة غير مسموحة' });
    }
}