module.exports = {
  name: 'help',
  description: 'عرض قائمة الأوامر المتاحة',
  adminOnly: false,

  async execute(sock, from, args) {
    const helpText = `
🤖 *بوت قسم 3/13 - مدرسة ابن خلدون الإعدادية خريبكة*

الأوامر الأكاديمية:
• !solve [السؤال] - حل التمارين
• !explain [الموضوع] - شرح مبسط
• !resume [النص] - تلخيص

الأوامر الترفيهية:
• !game [نوع] - ألعاب بسيطة (rps, guess)
• !joke - نكتة مضحكة
• !quote - اقتباس ملهم
• !fact - حقيقة مثيرة

الأوامر العامة:
• !help - عرض هذه القائمة
• !groupinfo - معلومات المجموعة (في المجموعات فقط)

للاستخدام: أرسل صورة أو نص مباشر للحصول على المساعدة الأكاديمية.

⚠️ الرد فقط عند المنشن (@bot) أو الأوامر المباشرة.
    `;
    await sock.sendMessage(from, { text: helpText });
  }
};