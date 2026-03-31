module.exports = {
  name: 'groupinfo',
  description: 'معلومات المجموعة',
  adminOnly: false,

  async execute(sock, from, args, message, sender, isGroup) {
    if (!isGroup) {
      await sock.sendMessage(from, { text: 'هذا الأمر متاح فقط في المجموعات.' });
      return;
    }

    try {
      const groupMetadata = await sock.groupMetadata(from);
      const info = `
📊 *معلومات المجموعة*

🏷️ الاسم: ${groupMetadata.subject}
👥 الأعضاء: ${groupMetadata.participants.length}
👑 المالك: ${groupMetadata.owner ? groupMetadata.owner.split('@')[0] : 'غير معروف'}
📅 تاريخ الإنشاء: ${new Date(groupMetadata.creation * 1000).toLocaleDateString('ar')}
      `;
      await sock.sendMessage(from, { text: info });
    } catch (error) {
      await sock.sendMessage(from, { text: 'حدث خطأ في جلب معلومات المجموعة.' });
    }
  }
};