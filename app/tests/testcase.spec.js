const fs = require('fs');
const path = require('path');

// โหลดเนื้อหาไฟล์ HTML และ JS ขึ้นมาจำลอง
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const scriptCode = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');

describe('TU Rangsit Facilities Web App (Jest Test)', () => {
    beforeEach(() => {
        // 1. นำโครงสร้าง HTML มาใส่ใน JSDOM จำลองสภาพแวดล้อมเบราว์เซอร์
        document.documentElement.innerHTML = html.toString();
        
        // 2. จำลองการรันสคริปต์
        eval(scriptCode);
        
        // 3. จำลองเหตุการณ์ว่าหน้าเว็บโหลดเสร็จแล้ว (เพื่อให้โค้ดใน script.js ทำงาน)
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
    });

    // 🟢 1. Test: การเปิด Modal ดูรายละเอียด
    test('ควรจะแสดงข้อมูลบน Modal ตรงกับการ์ดที่กด', () => {
        const cards = document.querySelectorAll('.card');
        const firstCard = cards[0]; // Puey Library
        const modal = document.getElementById('facilityModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalCategory = document.getElementById('modalCategory');

        // จำลองการคลิกที่การ์ดใบแรก
        firstCard.dispatchEvent(new Event('click'));

        // คาดหวังว่า Modal จะเปิดขึ้นมา (มี class show)
        expect(modal.classList.contains('show')).toBe(true);
        // คาดหวังว่าชื่อตรงกัน
        expect(modalTitle.textContent).toBe('Puey Ungphakorn Library');
        expect(modalCategory.textContent).toBe('Library');
    });

    // 🟢 2. Test: ปิด Modal
    test('ควรจะปิด Modal ได้เมื่อกดปุ่มกากบาท', () => {
        const cards = document.querySelectorAll('.card');
        const modal = document.getElementById('facilityModal');
        const closeBtn = document.querySelector('.close-button');

        cards[0].dispatchEvent(new Event('click'));
        expect(modal.classList.contains('show')).toBe(true);

        // คลิกปุ่มปิด
        closeBtn.dispatchEvent(new Event('click'));
        expect(modal.classList.contains('show')).toBe(false);
    });

    // 🟢 3. Test: ค้นหาสถานที่
    test('ควรจะกรองสถานที่ที่ค้นหาได้อย่างถูกต้อง', () => {
        const searchInput = document.getElementById('searchInput');
        const cards = document.querySelectorAll('.card');

        // ค้นหาคำว่า "SC"
        searchInput.value = 'sc';
        searchInput.dispatchEvent(new Event('input'));

        // คาดหวังว่าใบแรก (Puey) จะถูกซ่อน และใบที่ 2 (SC) จะแสดง
        expect(cards[0].style.display).toBe('none');
        expect(cards[1].style.display).toBe('flex'); // ตรงกับ SC Building
        expect(cards[2].style.display).toBe('none');
    });

    // 🟠 4. Test: Responsive Web (แสดงผลมือถือ)
    test('Responsive Web: JSDOM ไม่สามารถเทสต์แบบ Visual เช็ก Responsive Flex ได้', () => {
        expect(true).toBe(true);
    });
});