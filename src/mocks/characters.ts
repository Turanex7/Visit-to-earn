import type { Character } from '@/types'

/** Portraits live at /public/characters/{id}.png — replace the files to swap artwork. */
export const characters: Character[] = [
  {
    id: 'nizami',
    name: 'Nizami Gəncəvi',
    title: 'Müdrik Şair',
    bio: 'XII əsrin dahi şairi, “Xəmsə”nin müəllifi.',
    longBio:
      'Gəncədə doğulan Nizami beş poemadan ibarət “Xəmsə” ilə Şərq ədəbiyyatının zirvəsinə ucaldı. Onun yolunu seçən qəhrəman biliklə güclənir — hər doğru cavab daha çox XP gətirir.',
    perkText: 'Quizlərdən +10% XP',
    accent: '#F2B84B',
  },
  {
    id: 'xetai',
    name: 'Şah İsmayıl Xətai',
    title: 'Döyüşçü Şah',
    bio: 'Səfəvilər dövlətinin qurucusu, şair-hökmdar.',
    longBio:
      'Cəmi 14 yaşında taxta çıxan Şah İsmayıl həm sərkərdə, həm də Xətai təxəllüsü ilə ana dilində şeirlər yazan şair idi. Komanda ilə hərəkət edən qəhrəman dostlarla birlikdə daha güclüdür.',
    perkText: 'Co-Op questlərdən +10% XP',
    accent: '#C8283B',
  },
  {
    id: 'koroglu',
    name: 'Koroğlu',
    title: 'Dağ Qəhrəmanı',
    bio: 'Çənlibeldə yaşayan xalq qəhrəmanı, ədalətin səsi.',
    longBio:
      'Dastanların qəhrəmanı Koroğlu Qıratın belində dağları aşır, zülmə qarşı dururdu. Onu seçən qəhrəman açıq havada — İçərişəhərin daş küçələrində daha çox XP toplayır.',
    perkText: 'Açıq məkan questlərindən +10% XP',
    accent: '#2E9E5B',
  },
  {
    id: 'natavan',
    name: 'Xurşidbanu Natəvan',
    title: 'Qarabağ Xanımı',
    bio: 'Zərif qəzəllərin müəllifi və xeyriyyəçi şair xanım.',
    longBio:
      'Natəvan Şuşaya su kəməri çəkdirən, “Məclisi-üns” ədəbi məclisini quran şair xanım idi. Onu seçən qəhrəman gözəl əşyaların dəyərini bilir — hər yeni kolleksiya daha çox XP gətirir.',
    perkText: 'Yeni kolleksiyalardan +10% XP',
    accent: '#A85CF0',
  },
  {
    id: 'uzeyir',
    name: 'Üzeyir Hacıbəyov',
    title: 'Bəstəkar Ustad',
    bio: 'Şərqdə ilk operanın — “Leyli və Məcnun”un bəstəkarı.',
    longBio:
      '1908-ci ildə “Leyli və Məcnun” operası ilə Şərq musiqisində yeni səhifə açan Üzeyir bəy həm də Azərbaycan himninin müəllifidir. Onu seçən qəhrəman çətin suallarda əlavə ipucu qazanır.',
    perkText: 'Quizlərdə +1 əlavə ipucu',
    accent: '#19B5C7',
  },
  {
    id: 'nasimi',
    name: 'İmadəddin Nəsimi',
    title: 'Sufi Şair',
    bio: 'XIV əsr sufi şairi, ana dilində qəzəlin ustadı.',
    longBio:
      '“Məndə sığar iki cahan, mən bu cahana sığmazam” deyən Nəsimi insanın daxili gücünü tərənnüm edirdi. Onu seçən qəhrəman hər gün qayıtdıqca daha da güclənir.',
    perkText: 'Seriya bonusu +10%',
    accent: '#E8833A',
  },
]
