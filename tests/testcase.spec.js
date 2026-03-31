const fs = require('fs');
const path = require('path');

// โหลดเนื้อหาไฟล์ HTML และ JS ขึ้นมาจำลอง
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const scriptCode = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');

describe('Member Introduction Web App (Jest Test)', () => {
    beforeEach(() => {
        // 1. นำโครงสร้าง HTML มาใส่ใน JSDOM จำลองสภาพแวดล้อมเบราว์เซอร์
        document.documentElement.innerHTML = html.toString();
        
        // 2. จำลองการรันสคริปต์
        eval(scriptCode);
        
        // 3. จำลองเหตุการณ์ว่าหน้าเว็บโหลดเสร็จแล้ว (เพื่อให้โค้ดใน script.js ทำงาน)
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
    });

    // 🟢 1. Test: เพิ่มสมาชิกใหม่สำเร็จ
    test('ควรจะเพิ่มสมาชิกใหม่เข้าไปในการ์ดได้สำเร็จ (Happy Path)', () => {
        // กรอกข้อมูลโดยอ้างอิงไอดี
        document.getElementById('nameInput').value = 'John Developer';
        document.getElementById('roleInput').value = 'Senior Engineer';
        
        // จำลองการกดปุ่ม Submit ฟอร์ม
        document.getElementById('addMemberForm').dispatchEvent(new Event('submit', { cancelable: true }));

        // ดึงตัวการ์ดทั้งหมดเพื่อเช็กการเปลี่ยนแปลง
        const cards = document.querySelectorAll('.card');
        const newCard = cards[cards.length - 1]; // การ์ดที่เพิ่งถูกเพิ่มไป

        // ตรวจสอบ (EXPECT) แบบฉบับของ Jest เลยครับ
        expect(cards.length).toBe(4); // ของเดิมมี 3 ใบ การ์ดใหม่ต้องเป็นใบที่ 4
        expect(newCard.querySelector('.initials').textContent).toBe('JD'); // J.D. จาก John Developer
        expect(newCard.querySelector('h2').textContent).toBe('John Developer');
        expect(newCard.querySelector('.role').textContent).toBe('Senior Engineer');

        // ฟอร์มควรจะล้างค่า (Empty Input)
        expect(document.getElementById('nameInput').value).toBe('');
        expect(document.getElementById('roleInput').value).toBe('');
    });

    // 🔴 2. Test: ไม่ใส่ name แล้วจะแจ้งเตือน
    test('ควรจะบล็อกการเพิ่มข้อมูลหากไม่กรอกชื่อ (Empty Name Validation)', () => {
        // กรอกตั้งใจกรอกแค่ Role แต่เว้นช่อง Name ว่างไว้
        document.getElementById('roleInput').value = 'Designer';
        document.getElementById('nameInput').value = '';

        // ถ้า Name ไม่ถูกกรอก script.js ตั้งใจ Return ไม่อนุญาตให้ทำงานไปถึงการสร้างการ์ด
        document.getElementById('addMemberForm').dispatchEvent(new Event('submit'));

        const cards = document.querySelectorAll('.card');
        
        // ตรวจสอบ (EXPECT) 
        expect(cards.length).toBe(3); // จำนวนต้องเท่าเดิม ไม่มีอะไรเพิ่มเข้าไป
        
        // หมายเหตุ: การเช็ก Validation Message ว่าเบราว์เซอร์แจ้งเตือนคำว่าอะไร (Native HTML5 Popup)
        // จริงๆ แล้ว Jest/JSDOM ไม่ซัพพอร์ตการอ่าน Popup เบราว์เซอร์เพราะมันไม่มีหน้าต่างจริงๆ 
        // เราจึงตาวดได้แค่จากจำนวนว่า Logic เรายังคงต้านรอด ไม่สร้างการ์ดมั่วซั่วเมื่อช่องว่าง
        const isNameEmpty = document.getElementById('nameInput').validity.valueMissing;
        expect(isNameEmpty).toBe(true); // ยืนยันว่าระบบจำได้ว่าช่อง Name ผิดจริงและว่างเปล่า
    });

    // 🟠 3. Test: Responsive Web (แสดงผลมือถือ)
    test('Responsive Web: JSDOM ไม่สามารถเทสต์แบบ Visual เช็ก Responsive Flex ได้', () => {
        // *จุดเด่นและจุดด้อย*
        // Jest ทำมาเพื่อเทสต์ "โลจิก" (Logic testing) หรือความถูกต้องของแอปพลิเคชัน 
        // แต่มันเป็นสภาพแวดล้อมที่ "มองไม่เห็น" (Headless / ไม่เรนเดอร์ CSS)
        // ถ้าคุณต้องการเทสต์ว่ามือถือเรียงกล่องแบบแนวตั้งได้ไหม (Column vs Row)
        // Playwright (ที่ใช้ก่อนหน้านี้) ตัวน้้นจะตอบโจทย์ Responsive เชิงรูปร่างมากกว่าครับ
        expect(true).toBe(true);
    });
});
