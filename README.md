# Bu web Site Joraqozi Tomonidan test project sifatida yaratildi;

### `Asosiy tushunchalar`

Dastlab saytga kirilganda Sign In qismiga tashlanadi va u yerda username password kiritilganda localstorage dan tekshiriladi agar yoq bolsa error beradi

shunda sign Up qismiga otib username va password , repeate password kiritishi kerak bu yerda password kamida 8ta belgi va kamida 1ta raqam qatnashishi va repeate password bilan bir hil bolishi SHART

shunda bizga Booklist qismi ochiladi

bu yerdan biz dastlab kitob yoq shuni uchun create book bosilib create qilinadi create ISBN code orqali Book haqida malumot beradigan Free API dan foydalanildi.

### `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`

bu yerda aniq mavjud ISBN code kiritish kerak masalan :

1931498717

978-0-13-468599-1

shunda APIdan kelgan malumotga qarab kitob save qilinadi Localstorage ga

Responsive Design ham qilingan.
Navardagi Seach ishlaydi book titlega qarab RegEx qiladi (Search button bosilsa ishlaydi)
