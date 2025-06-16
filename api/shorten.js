export default async function handler(req, res) {
    // 👇 إضافة دعم CORS عشان HTML/بلوجر يشتغلوا
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // لو المتصفح بعت طلب OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'الطريقة غير مسموحة' });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'الرابط مفقود' });
    }

    try {
        const apiResponse = await fetch('https://2h.ae/api/url/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 4ce1fce102a732ba86ed56f21eb9da7c'
            },
            body: JSON.stringify({ url })
        });

        const data = await apiResponse.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'خطأ داخلي في السيرفر' });
    }
}
