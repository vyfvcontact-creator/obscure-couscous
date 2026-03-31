#!/bin/bash

echo "🚀 إعداد بوت قسم 3/13 - مدرسة ابن خلدون الإعدادية خريبكة"
echo "============================================================"
echo "هذا السكريبت يعمل مع Termux الرسمي من Play Store أو APK"

# تحديث النظام
echo "📦 تحديث النظام..."
pkg update -y && pkg upgrade -y

# تثبيت التبعيات
echo "🔧 تثبيت Node.js و Git..."
pkg install -y nodejs git

# التحقق من الإصدارات
echo "✅ التحقق من الإصدارات:"
node --version
npm --version
git --version

# تثبيت PM2 عالمياً
echo "⚙️ تثبيت PM2..."
npm install -g pm2

echo "🎉 الإعداد مكتمل!"
echo ""
echo "الخطوات التالية:"
echo "1. استنسخ المشروع: git clone <repository-url>"
echo "2. انتقل للمجلد: cd <project-folder>"
echo "3. ثبت التبعيات: npm install"
echo "4. حدث config.js بمفاتيح API"
echo "5. شغل البوت: pm2 start ecosystem.config.js"
echo ""
echo "استمتع بالبوت! 🤖"