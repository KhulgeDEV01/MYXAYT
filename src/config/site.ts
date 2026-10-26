/**
 * site.ts — Байгууллагын ерөнхий мэдээлэл (хэлнээс хамаарахгүй).
 *
 * Брэндийн нэр, домэйн, имэйл, утас, сошиал хаягууд энд байна. Энд өөрчилбөл
 * сайтын бүх газарт (Footer, Холбоо барих хэсэг г.м.) автоматаар солигдоно.
 * Хэлнээс хамаарах текстүүд (хаяг, ажлын цаг…) src/i18n/dictionaries дотор байна.
 * TODO гэсэн тэмдэгтэй утгуудыг сайтаа нийтлэхээс өмнө жинхэнэ мэдээллээр солино уу.
 */
export const siteConfig = {
  name: 'МҮХАҮТ',
  // TODO: жинхэнэ домэйн хаягаар солих
  url: 'https://meetsync.mn',
  // TODO: жинхэнэ холбоо барих мэдээллээр солих
  contact: {
    email: 'hello@meetsync.mn', // Сайт дээр харагдах ерөнхий имэйл
    salesEmail: 'sales@meetsync.mn', // Борлуулалтын имэйл
    phone: '+976 7700 0000',
  },
  // TODO: байгууллагын жинхэнэ сошиал хуудсуудын хаягаар солих
  social: {
    // TODO: Байгууллагын Facebook ХУУДАСНЫ бүтэн хаяг, жишээ нь 'https://www.facebook.com/mukhaut'.
    // Үүнийг бөглөхөд footer-ийн Facebook дүрс ба чатын (Messenger) товч хоёулаа энэ хуудас руу очно.
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
    youtube: 'https://youtube.com/',
    // Messenger (чатын товч) холбогдох Facebook хуудас. Дараах хэлбэрийн аль нь ч болно:
    //   'mukhaut'  |  '61550000000001' (Page ID)  |  'https://m.me/mukhaut'  |  'https://www.facebook.com/mukhaut'
    // АНХААР: Хуудасны харагдах НЭР (жишээ нь "Ногоон талбайн гайхамшиг") ажиллахгүй —
    // хөтчийн хаягийн мөрөнд facebook.com/-ийн араас гарах username эсвэл Page ID хэрэгтэй.
    // Хоосон бол дээрх facebook хаягаас автоматаар гаргана (utils/messenger.ts).
    // TODO: "Ногоон талбайн гайхамшиг" хуудасны username эсвэл Page ID-аар солих.
    // ТҮР ТУРШИЛТ: "VotesProject" хуудас (Page ID 61595969428052).
    messengerPage: 'https://www.facebook.com/profile.php?id=61595969428052',
  },
  foundedYear: 2026, // Footer дээрх "© 2026" он
} as const;