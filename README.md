# RentaCarProject Kullanici Arayuzu
Kodlama.io kamp gelisim projesidir. Gelistiren Rahim Cubuk.
Uygulama gelistirme surecinde back-end tarafında cok katmanli mimari kullanılmıştır. Uygulama AOP, FluentValidatın, Autofac, WebAPI ile güclendirilmiş ve SOLID kurallarına bağlı kalınmıştır.

### Geliştirme Ortam Bilgileri
* Frontend gelistirme asamasinda "Visual Studio Code 1.54.1" kullanilmistir.
* BackEnd icin [tiklayiniz](https://github.com/rahimcubuk/RentaCarProject).
* BackEnd geliştirme aşamasında "Microsoft Blend for Visual Studio Community 2019 Version 16.8.5" kullanılmıştır.
* Veritabanı olarak MsSQL kullanılmış ve veritabanı ile iletişim "Microsoft.EntityFrameworkCore.SqlServer v3.1.11" ile sağlanmıştır.
* Veritabanı "Microsoft SQL Server Management Studio 11.0.3000.0" ile tasarlanıştır.
NOT: Verıtabanı dosyaları "Entities/Database" klasörü içerisindedir. Uygun bir programda script.sql dosyasını çalıştırırsanız veritabanı bilgisayarınıza yüklenmiş olacaktır. Sonrasında uygulamayı kullanmaya başlayabilirsiniz.

### Kodlama.io 21. gun odev gereksinimleri
* Login/Register yetenekleri getiriniz.
* Kiralama esnasında müşterinin findeks puanını sorgulayacak sahte servis ekleyiniz.
* Findeks puan aralığı 0-1900 arasındadır.
* Araçların kiralanabilmesi için her aracın ayrı ayrı minimum findeks puanı olmalıdır. Bu puanı olmayan müşteriler araç kiralayamaz.
* LocalStorage için servis yazınız. Ekleme/Getirme/Silme
* Giriş ve register için nav'a butonlar ekleyiniz.
* Eğer giriş yapılmamışsa nav'da bu butonlar olsun. Giriş yapılmışsa bu butonlar yerine müşteri adı ex: "Engin Demiroğ" yazsın.
* Kullanıcı adını yazdığınız kısım açılır kutu olmalı.
* Kullanıcı bilgilerini görüp güncelleyebilmelidir.
* Kredi kartıyla ödeme alındığında kullanıcıya kredi kartını kaydedelim mi? Sorusu yöneltiniz. Kaydetmek isteyen müşteriye sonraki ödemede kayıtlı kredi kartını gösteriniz.

### Kodlama.io 20. gun odev gereksinimleri
* Backend Custom Error Middleware ekleyip fluent validation için refactoring yapınız.
* Reactive Forms kullanarak Brand, Color, Car Ekleme sayfalarını oluşturunuz.
* Brand,Color,Car listesinde güncelleme butonu ekleyiniz. Tıklanan ilgili elemanın detay sayfasına yönlendirerek güncelleme imkanı veriniz.
* Toastr desteği veriniz.

### Kodlama.io 19. gun odev gereksinimleri
* Car, Brand, Color için pipe ile arama desteği ekleyiniz.
* Car sayfasına 2 adet açılır kutu ekleyiniz. Html-Select Option. Bu açılır kutularda sırasıyla Marka ve Renk listeleyiniz.
* Açılır kutuların yanına "Filtrele" butonu ekleyiniz.
* Filtrele butonuna tıklandığında apiden ilgili filtreye uygun arabaları listeleyiniz.
* Araba detay sayfasında "Kirala" butonu ekleyiniz. Bu aracı kiralayabilecek sistemi yazınız. Araba hali hazırda başkası tarafından seçilen tarih aralığında kiralanmışsa, kiralama işlemi yapmayınız.
* Kiralama işleminde tarihler seçildikten sonra, yeni bir sayfada kredi kartıyla ödeme desteği getiriniz.
* Ödeme işlemi için api'de sahte bir banka servisi yazınız.
* Tüm işlemler için Toastr desteği ekleyiniz.

### Kodlama.io 18. gun odev gereksinimleri
* Brand listesinde herhangi bir marka seçildiğinde, o markaya ait arabaları listeleyiniz.
* Color listesinde herhangi bir renk seçildiğinde, o renge ait arabaları listeleyiniz.
* Car listesinde bir arabaya tıklandığında o arabaya ait detay sayfası oluşturunuz. Bu sayfada bu araca ait resimleri de gösteriniz.

### Kodlama.io 17. gun odev gereksinimleri
* Angular projesi oluşturunuz
* Bootstrap entegrasyonu yapınız
* Markaları listeleyiniz
* Renkleri listeleyiniz
* Muşterileri listeleyiniz
* Arabaları listeleyiniz. (Arabaları listelerken BrandId yerine BrandName, ColorId yerine ColorName şeklinde gösteriniz)
* Kiralamaları listeleyiniz (Rentals) CarId yerine BrandName, CustomerId yerine FirstName + LastName şeklinde gösteriniz.


Yardım, destek, öneri için rahimcubuk@gmail.com adresine mail atabilirsiniz.
