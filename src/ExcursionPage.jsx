import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

const WA = '60123456789';
const cream = '#FDF8F0';
const creamDark = '#F5EDDF';

const EXCURSIONS_DATA = {
  jetski: {
    name: 'Jetski à Langkawi',
    lieu: 'Langkawi, Malaisie',
    tags: ['Aventure', 'Jet-ski', 'Îles', 'Plage'],
    hero: '/images/jetski.jpg',
    video: '/images/jetski-hero.mov',
    gallery: ['/images/jetski-1.jpg', '/images/jetski-2.jpg'],
    tested: true,
    duration: '3 à 4 heures',
    groupSize: 'Jusqu\'à 2 pers. / jetski',
    difficulty: 'Tous niveaux',
    distance: '50 km',
    rating: 4.8,
    reviews: 571,
    shortDesc: "Une escapade de 4 heures en jet-ski à travers l'archipel de Langkawi — îles désertes, eaux turquoises, falaises calcaires et plages accessibles uniquement par la mer.",
    description: [
      "Évadez-vous dans le paradis tropical de Langkawi lors de cette excursion guidée de 3 à 4 heures à travers des eaux turquoises, des plages isolées et des paysages naturels à couper le souffle.",
      "Pilotez votre propre jet-ski sur des eaux cristallines pour une virée riche en adrénaline autour des îles emblématiques de l'archipel. Visitez l'île de Beras Basah et ses plages de sable blanc, explorez le mystique Lac de la Jeune Fille Enceinte sur l'île de Dayang Bunting, et découvrez des criques secrètes loin des foules.",
      "Admirez les spectaculaires falaises calcaires et formations rocheuses qui ornent le littoral. Faites escale sur des plages privées accessibles uniquement en jet-ski. Profitez d'une pause déjeuner sur une île et naviguez à travers les paysages de fjords du parc marin écologique.",
      "Visite sécurisée et encadrée par des professionnels sympathiques — même les débutants n'ayant jamais conduit de jet-ski passent un moment incroyable. Vidéo drone offerte en souvenir !",
    ],
    includes: [
      'Transfert aller-retour depuis votre hôtel',
      'Jet-ski en bon état + assurance',
      'Guide accompagnateur',
      'Gilet de sauvetage',
      'Sac étanche',
      'Chaussures de plage',
      'Vidéo drone gratuite',
      'Entrée au Lac de la Jeune Fille Enceinte',
    ],
    toBring: ['Maillot de bain', 'Crème solaire', 'Serviette de bain', 'Lunettes de soleil', 'Appareil photo étanche', 'Argent liquide'],
    itinerary: [
      { time: 'Départ', title: 'Prise en charge & briefing', desc: 'Transfert depuis votre hôtel, arrivée au point de départ à Pantai Cenang, consignes de sécurité et prise en main du jet-ski.', icon: 'lucide:map-pin' },
      { time: 'Étape 1', title: 'Balade en jet-ski', desc: 'Départ sur les eaux cristallines, navigation entre les îles avec des vues panoramiques sur l\'archipel. Plus de 10 îles en vue !', icon: 'lucide:zap' },
      { time: 'Étape 2', title: 'Île de Beras Basah', desc: 'Escale sur cette île de carte postale aux plages de sable blanc et eaux turquoise. Baignade et détente.', icon: 'lucide:waves' },
      { time: 'Étape 3', title: 'Pulau Singa Besar', desc: 'Pause photo devant les formations rocheuses spectaculaires et observation de la vie sauvage, dont les aigles.', icon: 'lucide:camera' },
      { time: 'Étape 4', title: 'Lac de la Jeune Fille Enceinte', desc: 'Exploration du mystique lac d\'eau douce de l\'île de Dayang Bunting. Baignade rafraîchissante dans un cadre magique.', icon: 'lucide:trees' },
      { time: 'Retour', title: 'Retour & vidéo drone', desc: 'Retour en jet-ski au point de départ, récupération de votre vidéo drone souvenir et transfert hôtel.', icon: 'lucide:film' },
    ],
    testimonials: [
      { name: 'Denise', from: 'France', text: "Une équipe incroyable, professionnelle, un trajet au top ! Vraiment parfait de bout en bout ! La réception des vidéos en drone était nickel, vraiment je recommande !", img: 'https://i.pravatar.cc/150?img=32' },
      { name: 'Prisca', from: 'France', text: "L'activité était vraiment incroyable, 4h de jet ski avec des paysages incroyables en compagnie de notre guide Joe qui était d'une gentillesse inouïe. Je recommande les yeux fermés !", img: 'https://i.pravatar.cc/150?img=25' },
      { name: 'Bilal', from: 'France', text: "C'était super, visite d'îles, dont une avec deux petits restaurants, singes et petit bassin pour y nager. Le guide qui nourrit les aigles, c'était beau à voir !", img: 'https://i.pravatar.cc/150?img=53' },
    ],
    highlights: [
      'Balade pittoresque en jet-ski autour des îles emblématiques',
      'Plages de sable blanc accessibles uniquement par la mer',
      'Falaises calcaires spectaculaires idéales pour les photos',
      'Lac mystique de la Jeune Fille Enceinte',
      'Vidéo drone offerte en souvenir',
      'Encadrement professionnel, adapté aux débutants',
    ],
    nearby: [
      { name: 'Via Ferrata à Tioman', slug: 'via-ferrata', image: '/images/via-ferrata-3.jpg', lieu: 'Tioman' },
      { name: 'Croisière BBQ', slug: 'bbq-cruise', image: '/images/bbq-cruise.webp', lieu: 'Langkawi' },
      { name: 'Tour en Mangrove', slug: 'mangrove-tour', image: '/images/mangrove-tour.jpg', lieu: 'Langkawi' },
    ],
  },
  'via-ferrata': {
    name: 'Via Ferrata à Tioman',
    lieu: 'Tioman, Côte Est',
    tags: ['Aventure', 'Adrénaline', 'Escalade', 'Nature'],
    hero: '/images/via-ferrata-3.jpg',
    video: '/images/via-ferrata-hero.mp4',
    gallery: ['/images/via-ferrata-1.jpg', '/images/via-ferrata-2.jpg', '/images/via-ferrata-3.jpg', '/images/via-ferrata-hiking.jpg', '/images/via-ferrata-coral.jpg'],
    tested: true,
    duration: 'Demi-journée',
    groupSize: 'Petits groupes',
    difficulty: 'Modéré à avancé',
    distance: 'Mukut, Tioman',
    rating: 4.9,
    reviews: 84,
    shortDesc: "Une ascension vertigineuse sur la via ferrata de Mukut — câbles, échelons et échelles le long des pentes granitiques des Dragon Horns, avec vue plongeante sur la jungle et l'océan.",
    description: [
      "Vivez une ascension chargée d'adrénaline sur la via ferrata de Mukut — un sentier de fer guidé construit le long des pentes granitiques des emblématiques Dragon Horns de Tioman.",
      "Cette activité est parfaite pour les amateurs de sensations fortes avec un niveau de forme physique modéré à avancé. Vous escaladez des parois rocheuses verticales à l'aide de câbles fixes, d'échelons en fer et d'échelles, le tout en étant attaché en toute sécurité.",
      "Le parcours offre des vues aériennes spectaculaires sur la canopée de la forêt tropicale, l'océan et le village en contrebas. En chemin, découvrez des formations rocheuses spectaculaires, des corniches à flanc de falaise, et la faune et flore locales.",
      "Ce n'est pas juste une escalade — c'est un voyage inoubliable à travers l'un des paysages naturels les plus à couper le souffle de Tioman.",
    ],
    includes: [
      'Guide professionnel certifié',
      'Équipement complet (harnais, casque, longes)',
      'Briefing sécurité',
      'Transport en bateau jusqu\'à Mukut',
      'Eau et snacks',
      'Photos souvenir',
    ],
    toBring: ['Chaussures fermées de randonnée', 'Vêtements confortables', 'Crème solaire', 'Anti-moustiques', 'Bouteille d\'eau', 'Appareil photo étanche'],
    itinerary: [
      { time: 'Matin', title: 'Transfert en bateau', desc: 'Départ en bateau vers le village de Mukut, au sud de Tioman. Arrivée et rencontre avec votre guide.', icon: 'lucide:ship' },
      { time: 'Étape 1', title: 'Briefing & équipement', desc: 'Distribution du matériel d\'escalade, harnais, casque. Consignes de sécurité détaillées.', icon: 'lucide:shield-check' },
      { time: 'Étape 2', title: 'Ascension des Dragon Horns', desc: 'Escalade progressive le long des câbles et échelons. Vues spectaculaires sur la jungle et l\'océan.', icon: 'lucide:mountain' },
      { time: 'Étape 3', title: 'Sommet & corniches', desc: 'Arrivée sur les corniches à flanc de falaise. Photos panoramiques et pause bien méritée.', icon: 'lucide:camera' },
      { time: 'Étape 4', title: 'Descente & découverte', desc: 'Descente par un sentier différent à travers la forêt tropicale. Observation de la faune locale.', icon: 'lucide:trees' },
      { time: 'Retour', title: 'Retour en bateau', desc: 'Retour en bateau vers votre point de départ. Partage des photos et des souvenirs.', icon: 'lucide:anchor' },
    ],
    testimonials: [
      { name: 'Julien', from: 'France', text: "L'expérience la plus intense de mon voyage en Malaisie. La vue depuis les Dragon Horns est à couper le souffle. Le guide était rassurant et pro, même pour quelqu'un qui a le vertige !", img: 'https://i.pravatar.cc/150?img=14' },
      { name: 'Camille', from: 'Belgique', text: "Incroyable ! On se sent vraiment aventurier accroché à la paroi avec la jungle en dessous. Les photos sont dingues. À faire absolument si vous allez à Tioman.", img: 'https://i.pravatar.cc/150?img=23' },
      { name: 'Mehdi', from: 'France', text: "J'ai hésité à cause du niveau de difficulté mais le guide adapte le rythme. Le paysage depuis le sommet vaut chaque effort. Souvenir inoubliable.", img: 'https://i.pravatar.cc/150?img=51' },
    ],
    highlights: [
      'Ascension des emblématiques Dragon Horns',
      'Vues plongeantes sur la jungle et l\'océan',
      'Encadrement professionnel sécurisé',
      'Formations rocheuses granitiques uniques',
      'Adapté aux grimpeurs modérés à avancés',
      'Faune et flore tropicales en chemin',
    ],
    nearby: [
      { name: 'Jetski à Langkawi', slug: 'jetski', image: '/images/jetski-1.jpg', lieu: 'Langkawi' },
      { name: 'Plongée à Semporna', slug: 'semporna', image: '/images/semporna-1.jpg', lieu: 'Bornéo' },
      { name: 'Croisière BBQ', slug: 'bbq-cruise', image: '/images/bbq-cruise.webp', lieu: 'Langkawi' },
    ],
  },
  semporna: {
    name: 'Plongée & Snorkeling à Semporna',
    lieu: 'Semporna, Sabah (Bornéo)',
    tags: ['Plongée', 'Snorkeling', 'Plage', 'Vie sauvage'],
    hero: '/images/semporna-4.jpg',
    gallery: ['/images/semporna-1.jpg', '/images/semporna-2.jpg', '/images/semporna-3.jpg', '/images/semporna-4.jpg'],
    tested: true,
    duration: 'Journée complète',
    groupSize: 'Petits groupes',
    difficulty: 'Facile à modéré',
    distance: 'Archipel de Semporna',
    rating: 4.9,
    reviews: 203,
    shortDesc: "L'eau est tellement claire que vous voyez le fond à 20 mètres. Une tortue passe juste en dessous de vous, suivie par un banc de poissons multicolores. Bienvenue à Semporna — l'un des meilleurs spots de plongée au monde.",
    description: [
      "Semporna, dans l'État de Sabah à Bornéo, est considéré comme l'un des meilleurs spots de plongée et snorkeling de la planète. Des eaux d'une clarté irréelle, une biodiversité marine exceptionnelle, et des îles de carte postale.",
      "Notre excursion vous emmène explorer les îles de l'archipel : Mabul, Kapalai, et les eaux autour de Sipadan — classé parmi les 5 meilleurs sites de plongée au monde. Tortues, requins de récif, bancs de barracudas et jardins de coraux intacts vous attendent.",
      "Que vous soyez snorkeler débutant ou plongeur certifié, l'expérience est adaptée à votre niveau. L'équipement complet est fourni, et nos guides locaux connaissent chaque recoin de ces récifs.",
      "⚠️ Saison : Semporna est accessible d'avril à octobre. La mousson de la côte Est ferme les accès de novembre à mars environ.",
    ],
    includes: [
      'Transport en bateau vers les îles',
      'Équipement snorkeling complet (masque, tuba, palmes)',
      'Guide local expérimenté',
      'Déjeuner sur l\'île',
      'Eau et boissons',
      'Gilet de sauvetage',
    ],
    toBring: ['Maillot de bain', 'Crème solaire reef-safe', 'Serviette', 'Appareil photo waterproof', 'Argent liquide (permit Sipadan)', 'Lunettes de soleil'],
    itinerary: [
      { time: 'Matin', title: 'Départ en bateau', desc: 'Rendez-vous au port de Semporna, briefing et départ vers les premières îles de l\'archipel.', icon: 'lucide:ship' },
      { time: 'Étape 1', title: 'Snorkeling à Mabul', desc: 'Première session snorkeling dans les eaux cristallines autour de Mabul — tortues, poissons-clowns et coraux.', icon: 'lucide:waves' },
      { time: 'Étape 2', title: 'Île de Kapalai', desc: 'Exploration de la plateforme sur pilotis et snorkeling dans des jardins de coraux intacts.', icon: 'lucide:fish' },
      { time: 'Pause', title: 'Déjeuner sur l\'île', desc: 'Repas local sur une île avec vue sur les eaux turquoises. Pause détente sur le sable blanc.', icon: 'lucide:utensils' },
      { time: 'Étape 3', title: 'Zone Sipadan', desc: 'Navigation vers les eaux de Sipadan, observation des requins de récif, barracudas et tortues depuis la surface.', icon: 'lucide:binoculars' },
      { time: 'Retour', title: 'Retour à Semporna', desc: 'Retour en bateau au port, partage des photos et des souvenirs de cette journée incroyable.', icon: 'lucide:anchor' },
    ],
    testimonials: [
      { name: 'Sarah', from: 'France', text: "J'ai nagé à côté d'une tortue pendant 10 minutes. L'eau est d'une clarté que je n'avais jamais vue. Semporna c'est un autre monde, vraiment. Le guide était top et le déjeuner sur l'île un vrai bonus.", img: 'https://i.pravatar.cc/150?img=44' },
      { name: 'Romain', from: 'Suisse', text: "Plongeur certifié, j'ai fait beaucoup de spots dans le monde. Semporna reste dans mon top 3. La biodiversité est hallucinante, on voit des requins, des tortues, des bancs de barracudas... Incontournable.", img: 'https://i.pravatar.cc/150?img=33' },
      { name: 'Amina', from: 'France', text: "Même en snorkeling on voit tout ! Les coraux, les poissons de toutes les couleurs, les tortues... C'était magique. Parfait pour ceux qui ne plongent pas.", img: 'https://i.pravatar.cc/150?img=41' },
    ],
    highlights: [
      'L\'un des 5 meilleurs spots de plongée au monde',
      'Tortues, requins de récif et bancs de barracudas',
      'Eaux cristallines avec visibilité à 20+ mètres',
      'Îles de carte postale (Mabul, Kapalai, Sipadan)',
      'Adapté snorkeling et plongée certifiée',
      'Déjeuner inclus sur une île paradisiaque',
    ],
    nearby: [
      { name: 'Via Ferrata à Tioman', slug: 'via-ferrata', image: '/images/via-ferrata-3.jpg', lieu: 'Tioman' },
      { name: 'Snorkeling à Tioman', slug: 'snorkeling-tioman', image: '/images/snorkeling-tioman-2.jpg', lieu: 'Tioman' },
      { name: 'Jetski à Langkawi', slug: 'jetski', image: '/images/jetski-1.jpg', lieu: 'Langkawi' },
    ],
  },
  'snorkeling-tioman': {
    name: 'Snorkeling à Tioman',
    lieu: 'Tioman, Côte Est',
    tags: ['Snorkeling', 'Plage', 'Famille', 'Nature'],
    hero: '/images/snorkeling-tioman-5.jpg',
    video: '/images/snorkeling-tioman-hero.mp4',
    gallery: ['/images/snorkeling-tioman-1.jpg', '/images/snorkeling-tioman-2.jpg', '/images/snorkeling-tioman-3.jpg', '/images/snorkeling-tioman-4.jpg', '/images/snorkeling-tioman-5.jpg', '/images/snorkeling-tioman-6.jpg'],
    tested: true,
    duration: 'Demi-journée',
    groupSize: 'Petits groupes',
    difficulty: 'Facile',
    distance: 'Nemo Point, Mukut',
    rating: 4.8,
    reviews: 156,
    shortDesc: "Vous sautez du bateau dans une eau transparente. En dessous de vous, un récif corallien explosif de couleurs — des dizaines de poissons-clowns se faufilent entre les anémones. Bienvenue à Nemo Point.",
    description: [
      "Situé juste au large de Mukut, Nemo Point est un spot de snorkeling local connu pour ses colonies de poissons-clowns et son récif corallien vivant. C'est une zone peu profonde, idéale pour les familles et les débutants, avec des eaux calmes et une vue rapprochée sur la vie marine.",
      "Tioman est classée parmi les plus belles îles du monde — et sous l'eau, c'est encore plus impressionnant. Le récif abrite une biodiversité marine incroyable : poissons-clowns, poissons-papillons, anémones de mer géantes et coraux multicolores.",
      "L'excursion est encadrée par des guides locaux qui connaissent chaque recoin du récif. Ils vous emmènent aux meilleurs spots et veillent à votre sécurité. Même les enfants peuvent en profiter grâce aux eaux calmes et peu profondes.",
      "⚠️ Saison : Tioman est accessible d'avril à octobre. La mousson de la côte Est ferme l'accès de novembre à mars environ.",
    ],
    includes: [
      'Transport en bateau vers Nemo Point',
      'Équipement snorkeling complet (masque, tuba, palmes)',
      'Guide local expérimenté',
      'Gilet de sauvetage',
      'Eau et snacks',
      'Serviettes',
    ],
    toBring: ['Maillot de bain', 'Crème solaire reef-safe', 'Appareil photo waterproof', 'Lunettes de soleil', 'Serviette supplémentaire'],
    itinerary: [
      { time: 'Matin', title: 'Rendez-vous à Mukut', desc: 'Point de rendez-vous au village de Mukut. Briefing sur le snorkeling et distribution de l\'équipement.', icon: 'lucide:map-pin' },
      { time: 'Étape 1', title: 'Bateau vers Nemo Point', desc: 'Courte traversée en bateau jusqu\'au spot de snorkeling. L\'eau turquoise apparaît sous vos pieds.', icon: 'lucide:ship' },
      { time: 'Étape 2', title: 'Snorkeling à Nemo Point', desc: 'Plongée dans le récif corallien vivant — poissons-clowns, anémones géantes et coraux multicolores.', icon: 'lucide:waves' },
      { time: 'Étape 3', title: 'Second spot', desc: 'Navigation vers un deuxième spot avec des formations coralliennes différentes et encore plus de vie marine.', icon: 'lucide:fish' },
      { time: 'Pause', title: 'Pause sur la plage', desc: 'Détente sur une plage isolée de Tioman. Snacks, eau et repos avant la dernière session.', icon: 'lucide:sun' },
      { time: 'Retour', title: 'Retour à Mukut', desc: 'Dernière baignade puis retour en bateau au village. Partage des photos et souvenirs.', icon: 'lucide:anchor' },
    ],
    testimonials: [
      { name: 'Marie', from: 'France', text: "On a vu des dizaines de poissons-clowns à Nemo Point ! L'eau était incroyablement claire et le guide super attentionné. Même notre fils de 7 ans a adoré. Le plus beau snorkeling qu'on ait fait.", img: 'https://i.pravatar.cc/150?img=47' },
      { name: 'Lucas', from: 'Belgique', text: "Tioman est un bijou. Le récif est vivant, coloré, et on nage au milieu de centaines de poissons. Le guide nous a montré des spots que les touristes ne connaissent pas. Incontournable.", img: 'https://i.pravatar.cc/150?img=52' },
      { name: 'Nadia', from: 'France', text: "C'était magique. J'avais jamais vu autant de vie sous l'eau. Les eaux sont calmes, parfait pour les débutants. Et la plage où on a fait la pause était paradisiaque.", img: 'https://i.pravatar.cc/150?img=26' },
    ],
    highlights: [
      'Nemo Point — colonies de poissons-clowns',
      'Récif corallien vivant et coloré',
      'Eaux calmes, idéal familles et débutants',
      'Tioman : classée parmi les plus belles îles du monde',
      'Plusieurs spots de snorkeling différents',
      'Pause sur une plage isolée paradisiaque',
    ],
    nearby: [
      { name: 'Via Ferrata à Tioman', slug: 'via-ferrata', image: '/images/via-ferrata-3.jpg', lieu: 'Tioman' },
      { name: 'Plongée à Semporna', slug: 'semporna', image: '/images/semporna-4.jpg', lieu: 'Bornéo' },
      { name: 'Croisière BBQ', slug: 'bbq-cruise', image: '/images/bbq-cruise-1.webp', lieu: 'Langkawi' },
    ],
  },
  'bbq-cruise': {
    name: 'Croisière BBQ au coucher du soleil',
    lieu: 'Langkawi, Malaisie',
    tags: ['Détente', 'Gastronomie', 'Coucher de soleil', 'Yacht'],
    hero: '/images/bbq-cruise-1.webp',
    gallery: ['/images/bbq-cruise-1.webp', '/images/bbq-cruise-2.webp', '/images/bbq-cruise-3.webp'],
    tested: true,
    duration: '3 à 4 heures',
    groupSize: 'Petits groupes',
    difficulty: 'Facile',
    distance: 'Côte de Langkawi',
    rating: 4.9,
    reviews: 312,
    shortDesc: "Le soleil descend sur la mer d'Andaman, le ciel vire à l'orange. Vous êtes allongé dans le filet jacuzzi du yacht, un cocktail à la main, pendant que le BBQ grille sur le pont. La définition parfaite du mot 'détente'.",
    description: [
      "Profitez d'une croisière au coucher du soleil le long de la côte de Langkawi avec un dîner barbecue et des boissons à volonté. Le yacht longe les îles de l'archipel pendant que le soleil peint le ciel en orange et rose.",
      "Détendez-vous dans le filet jacuzzi suspendu au-dessus de l'eau, nagez en pleine mer dans les eaux chaudes de la mer d'Andaman, ou essayez le kayak et le paddleboard mis à disposition.",
      "Le dîner BBQ est servi à bord avec des grillades fraîches, des accompagnements locaux, et un bar ouvert avec cocktails, bières et boissons sans alcool. L'ambiance est décontractée, la musique douce, et la vue spectaculaire.",
      "C'est l'excursion parfaite pour les couples, les familles ou entre amis — un moment de pure détente sur l'eau avec le plus beau coucher de soleil de Langkawi.",
    ],
    includes: [
      'Croisière en yacht le long de la côte',
      'Dîner BBQ complet',
      'Boissons alcoolisées et non alcoolisées à volonté',
      'Filet jacuzzi',
      'Kayak et paddleboard',
      'Baignade en pleine mer',
    ],
    toBring: ['Maillot de bain', 'Serviette', 'Appareil photo', 'Crème solaire', 'Tenue légère pour le soir'],
    itinerary: [
      { time: 'Départ', title: 'Embarquement au port', desc: 'Rendez-vous au port de Langkawi, accueil à bord du yacht et présentation de l\'équipage.', icon: 'lucide:anchor' },
      { time: 'Étape 1', title: 'Navigation & activités', desc: 'Départ le long de la côte. Kayak, paddleboard et baignade en pleine mer à disposition.', icon: 'lucide:ship' },
      { time: 'Étape 2', title: 'Filet jacuzzi & détente', desc: 'Installation dans le filet jacuzzi suspendu au-dessus de l\'eau. Cocktails et musique d\'ambiance.', icon: 'lucide:glass-water' },
      { time: 'Étape 3', title: 'Dîner BBQ à bord', desc: 'Grillades fraîches servies sur le pont avec vue sur le coucher du soleil. Bar ouvert.', icon: 'lucide:flame' },
      { time: 'Sunset', title: 'Coucher de soleil', desc: 'Le moment magique — le soleil plonge dans la mer d\'Andaman. Photos, toasts et émotion.', icon: 'lucide:sunset' },
      { time: 'Retour', title: 'Retour au port', desc: 'Navigation retour sous les étoiles. Retour au port de Langkawi.', icon: 'lucide:moon' },
    ],
    testimonials: [
      { name: 'Sophie', from: 'France', text: "Le plus beau coucher de soleil de ma vie. Le yacht est superbe, le BBQ délicieux, et les cocktails coulaient à flot. Le filet jacuzzi au-dessus de l'eau c'est une expérience unique. On a adoré !", img: 'https://i.pravatar.cc/150?img=45' },
      { name: 'Thomas', from: 'France', text: "On a fait ça avec ma copine pour notre anniversaire. C'était parfait — romantique, délicieux, et le sunset était dingue. L'équipage était aux petits soins. Je recommande à 200%.", img: 'https://i.pravatar.cc/150?img=12' },
      { name: 'Fatima', from: 'Belgique', text: "Meilleure soirée de notre voyage en Malaisie. Les enfants ont adoré le kayak et le paddle, nous on a profité du jacuzzi et des cocktails. Le BBQ était top. À refaire !", img: 'https://i.pravatar.cc/150?img=38' },
    ],
    highlights: [
      'Coucher de soleil spectaculaire sur la mer d\'Andaman',
      'Dîner BBQ et boissons à volonté',
      'Filet jacuzzi suspendu au-dessus de l\'eau',
      'Kayak, paddleboard et baignade en mer',
      'Yacht privatif avec équipage',
      'Parfait couples, familles et groupes d\'amis',
    ],
    nearby: [
      { name: 'Jetski à Langkawi', slug: 'jetski', image: '/images/jetski-1.jpg', lieu: 'Langkawi' },
      { name: 'Tour en Mangrove', slug: 'mangrove-tour', image: '/images/mangrove-2.jpg', lieu: 'Langkawi' },
      { name: 'SkyCab + Sky Bridge', slug: 'skycab', image: '/images/skycab.jpg', lieu: 'Langkawi' },
    ],
  },
  'mangrove-tour': {
    name: 'Tour en Mangrove à Langkawi',
    lieu: 'Langkawi, Malaisie',
    tags: ['Nature', 'Vie sauvage', 'Grottes', 'Aigles'],
    hero: '/images/mangrove-3.jpg',
    gallery: ['/images/mangrove-2.jpg', '/images/mangrove-3.jpg', '/images/mangrove-4.webp'],
    tested: true,
    duration: 'Demi-journée (~4h)',
    groupSize: 'Partagé ou privé',
    difficulty: 'Facile',
    distance: 'Tanjung Rhu, Langkawi',
    rating: 4.8,
    reviews: 428,
    shortDesc: "Le bateau s'enfonce dans la mangrove. Le silence. Puis un cri — un aigle royal plonge à quelques mètres de vous. Après les grottes et les chauves-souris, vous déjeunez sur un restaurant flottant au milieu de la mer d'Andaman.",
    description: [
      "Nombreux sont ceux qui visitent Langkawi pour ses plages, mais si vous souhaitez profiter au maximum du \"Joyau du Kedah\", cette excursion à Tanjung Rhu est un incontournable. Visitez la célèbre forêt de mangroves de l'archipel et ses attractions en seulement une demi-journée.",
      "Explorez la Crocodile Cave, une grotte calcaire impressionnante, puis la Bat Cave, habitée par des centaines de chauves-souris. L'atmosphère est mystérieuse, les formations rocheuses spectaculaires.",
      "Le moment fort : l'observation des aigles royaux. Votre guide lance de la nourriture à la surface et soudain, dix, vingt aigles tournoient au-dessus du bateau, plongeant à quelques mètres de vous pour attraper leur repas. Un spectacle à couper le souffle.",
      "L'aventure se termine par un déjeuner sur un restaurant flottant au milieu de la mer d'Andaman — fruits de mer frais, vue à 360° sur l'archipel. Transport aller-retour depuis votre hôtel inclus.",
    ],
    includes: [
      'Transport aller-retour depuis l\'hôtel',
      'Chauffeur/guide',
      'Tour en bateau dans la mangrove',
      'Visite Crocodile Cave + Bat Cave',
      'Observation des aigles',
      'Déjeuner sur restaurant flottant',
    ],
    toBring: ['Crème solaire', 'Chapeau / casquette', 'Jumelles (optionnel)', 'Appareil photo', 'Anti-moustiques', 'Bouteille d\'eau'],
    itinerary: [
      { time: 'Matin', title: 'Prise en charge hôtel', desc: 'Votre chauffeur/guide vient vous chercher à l\'hôtel et vous emmène à Tanjung Rhu, point de départ du tour.', icon: 'lucide:car' },
      { time: 'Étape 1', title: 'Crocodile Cave', desc: 'Entrée en bateau dans la grotte calcaire de Crocodile Cave. Formations rocheuses impressionnantes et explications du guide.', icon: 'lucide:mountain' },
      { time: 'Étape 2', title: 'Bat Cave', desc: 'Exploration de la grotte des chauves-souris. Ambiance mystérieuse, stalactites et des centaines de chauves-souris au plafond.', icon: 'lucide:moon' },
      { time: 'Étape 3', title: 'Observation des aigles', desc: 'Le guide attire les aigles royaux — ils plongent à quelques mètres du bateau pour attraper leur repas. Spectacle incroyable.', icon: 'lucide:bird' },
      { time: 'Étape 4', title: 'Déjeuner flottant', desc: 'Repas sur un restaurant flottant en pleine mer d\'Andaman. Fruits de mer frais et vue panoramique sur l\'archipel.', icon: 'lucide:utensils' },
      { time: 'Retour', title: 'Retour à l\'hôtel', desc: 'Retour en bateau puis transfert à votre hôtel. Photos et souvenirs inoubliables.', icon: 'lucide:home' },
    ],
    testimonials: [
      { name: 'Claire', from: 'France', text: "Les aigles qui plongent à côté du bateau, c'est irréel. La Bat Cave était flippante mais géniale, et le déjeuner flottant au milieu de la mer... Wow. Une demi-journée parfaite.", img: 'https://i.pravatar.cc/150?img=20' },
      { name: 'Youssef', from: 'France', text: "Le guide était passionné et connaissait chaque recoin de la mangrove. Les grottes sont impressionnantes et le spectacle des aigles vaut le détour à lui seul. À faire absolument.", img: 'https://i.pravatar.cc/150?img=59' },
      { name: 'Laura', from: 'Suisse', text: "On a adoré de A à Z. Les enfants étaient fascinés par les chauves-souris et les aigles. Le restaurant flottant est une super surprise. Excursion idéale pour les familles.", img: 'https://i.pravatar.cc/150?img=29' },
    ],
    highlights: [
      'Aigles royaux plongeant à quelques mètres du bateau',
      'Grottes calcaires : Crocodile Cave et Bat Cave',
      'Forêt de mangroves du Kilim Geoforest Park',
      'Déjeuner sur restaurant flottant en mer d\'Andaman',
      'Transport hôtel inclus, bateau partagé ou privé',
      'Excursion facile, idéale pour les familles',
    ],
    nearby: [
      { name: 'Jetski à Langkawi', slug: 'jetski', image: '/images/jetski-1.jpg', lieu: 'Langkawi' },
      { name: 'Croisière BBQ', slug: 'bbq-cruise', image: '/images/bbq-cruise-1.webp', lieu: 'Langkawi' },
      { name: 'SkyCab + Sky Bridge', slug: 'skycab', image: '/images/skycab.jpg', lieu: 'Langkawi' },
    ],
  },
  kinabatangan: {
    name: 'Rivière Kinabatangan',
    lieu: 'Sandakan, Sabah (Bornéo)',
    tags: ['Nature', 'Vie sauvage', 'Aventure', 'Safari'],
    hero: '/images/kinabatangan-1.webp',
    gallery: ['/images/kinabatangan-1.webp', '/images/kinabatangan-2.webp', '/images/kinabatangan-3.webp', '/images/kinabatangan-4.webp', '/images/kinabatangan-5.webp'],
    tested: false,
    duration: '2 jours / 1 nuit',
    groupSize: 'Petits groupes',
    difficulty: 'Facile',
    distance: 'Kinabatangan, Sandakan',
    rating: 4.9,
    reviews: 187,
    shortDesc: "Le bateau glisse silencieusement sur la rivière. Un singe nasique saute de branche en branche, un hornbill survole la canopée. Votre guide murmure : 'Regardez à gauche' — un pygmy elephant boit au bord de l'eau. Bienvenue sur la Kinabatangan.",
    description: [
      "La rivière Kinabatangan, dans l'État de Sabah à Bornéo, est l'un des derniers sanctuaires de biodiversité au monde. C'est ici que vous avez les meilleures chances d'observer les Big Five de Bornéo : orang-outans, éléphants pygmées, singes nasiques, crocodiles et hornbills.",
      "L'excursion se déroule sur 2 jours avec une nuit en lodge au bord de la rivière. Vous explorez en bateau à moteur les méandres de la Kinabatangan à l'aube et au crépuscule — les moments où la faune est la plus active.",
      "Les guides locaux connaissent chaque recoin de la rivière et repèrent les animaux avec une précision impressionnante. Singes proboscis dans les arbres, macaques sur les berges, crocodiles qui se chauffent au soleil, et avec un peu de chance, un troupeau d'éléphants pygmées.",
      "La nuit, une randonnée nocturne vous fait découvrir les sons de la jungle : insectes géants, grenouilles volantes, serpents arboricoles et les yeux brillants des crocodiles dans le noir.",
    ],
    includes: [
      'Transport depuis Sandakan',
      '1 nuit en lodge au bord de la rivière',
      '3 croisières sur la rivière (aube, après-midi, crépuscule)',
      'Randonnée nocturne guidée',
      'Guide naturaliste local',
      'Tous les repas inclus',
    ],
    toBring: ['Anti-moustiques (indispensable)', 'Vêtements longs et légers', 'Jumelles', 'Lampe frontale', 'Appareil photo avec zoom', 'Bouteille d\'eau réutilisable'],
    itinerary: [
      { time: 'Jour 1 - Matin', title: 'Transfert depuis Sandakan', desc: 'Route depuis Sandakan vers le lodge au bord de la Kinabatangan. Installation et briefing avec votre guide naturaliste.', icon: 'lucide:car' },
      { time: 'Jour 1 - Après-midi', title: 'Première croisière', desc: 'Croisière sur la rivière à la recherche des singes nasiques, macaques et oiseaux. Le guide repère les animaux dans la canopée.', icon: 'lucide:binoculars' },
      { time: 'Jour 1 - Crépuscule', title: 'Croisière au coucher du soleil', desc: 'Deuxième sortie en bateau. Les éléphants pygmées viennent souvent boire au crépuscule. Crocodiles sur les berges.', icon: 'lucide:sunset' },
      { time: 'Jour 1 - Nuit', title: 'Randonnée nocturne', desc: 'Exploration de la jungle à pied avec lampe frontale. Insectes géants, grenouilles volantes et yeux de crocodiles dans le noir.', icon: 'lucide:moon' },
      { time: 'Jour 2 - Aube', title: 'Croisière à l\'aube', desc: 'Sortie au lever du soleil — le meilleur moment pour observer les orang-outans et les hornbills. Brume sur la rivière.', icon: 'lucide:sunrise' },
      { time: 'Jour 2 - Matin', title: 'Retour à Sandakan', desc: 'Petit-déjeuner au lodge puis transfert retour vers Sandakan. Partage des observations et des photos.', icon: 'lucide:home' },
    ],
    testimonials: [
      { name: 'Alexandre', from: 'France', text: "On a vu des orang-outans, un troupeau d'éléphants pygmées, des dizaines de singes nasiques et un crocodile énorme. La randonnée nocturne est flippante mais incroyable. Le lodge est simple mais parfait.", img: 'https://i.pravatar.cc/150?img=57' },
      { name: 'Emma', from: 'Belgique', text: "Le moment où on a vu les éléphants boire au bord de la rivière au crépuscule... J'en ai encore des frissons. Le guide était exceptionnel, il repérait les animaux avant tout le monde. Expérience unique.", img: 'https://i.pravatar.cc/150?img=24' },
      { name: 'Karim', from: 'France', text: "C'est le vrai safari version Bornéo. On est au milieu de la nature sauvage, pas dans un zoo. Les bruits de la jungle la nuit c'est quelque chose. À faire absolument si vous allez à Sabah.", img: 'https://i.pravatar.cc/150?img=60' },
    ],
    highlights: [
      'Big Five de Bornéo : orang-outans, éléphants, singes nasiques',
      'Croisières à l\'aube et au crépuscule',
      'Randonnée nocturne dans la jungle',
      'Lodge authentique au bord de la rivière',
      'Guide naturaliste local expert',
      'L\'un des derniers sanctuaires de biodiversité',
    ],
    nearby: [
      { name: 'Plongée à Semporna', slug: 'semporna', image: '/images/semporna-4.jpg', lieu: 'Bornéo' },
      { name: 'Jetski à Langkawi', slug: 'jetski', image: '/images/jetski-1.jpg', lieu: 'Langkawi' },
      { name: 'Cameron Highlands', slug: 'cameron-highlands', image: '/images/cameron-1.webp', lieu: 'Cameron Highlands' },
    ],
  },
  'cameron-highlands': {
    name: 'Plantation de thé — Cameron Highlands',
    lieu: 'Cameron Highlands, Malaisie',
    tags: ['Culture', 'Nature', 'Détente', 'Thé'],
    hero: '/images/cameron-5.jpg',
    gallery: ['/images/cameron-1.webp', '/images/cameron-2.jpg', '/images/cameron-3.jpg', '/images/cameron-4.jpg', '/images/cameron-5.jpg'],
    tested: true,
    duration: 'Journée complète',
    groupSize: 'Privé ou partagé',
    difficulty: 'Facile',
    distance: 'Cameron Highlands',
    rating: 4.7,
    reviews: 295,
    shortDesc: "Des collines vertes à perte de vue, parfaitement alignées. L'air est frais — on se croirait presque en Europe. Vous marchez entre les rangées de thé, une tasse de BOH Tea fumante à la main, pendant qu'un guide vous explique le processus de récolte ancestral.",
    description: [
      "Les Cameron Highlands sont un monde à part en Malaisie. Perchées à 1 500 mètres d'altitude, ces collines offrent un air frais, des paysages verdoyants et une ambiance coloniale britannique unique. C'est ici que se trouvent les plus célèbres plantations de thé du pays.",
      "L'excursion vous emmène au cœur des plantations de BOH Tea, fondées en 1929. Vous marchez entre les rangées de théiers impeccablement alignés, avec une vue panoramique sur les vallées brumeuses. Un guide vous explique le processus complet : de la cueillette à la tasse.",
      "Vous visitez aussi une ferme de fraises, le marché local regorgeant de légumes frais et de miel, et la mystérieuse Mossy Forest — une forêt nuageuse couverte de mousse où la brume crée une atmosphère féerique.",
      "La journée se termine par une dégustation de thé avec vue sur les collines. Un moment de pure sérénité, loin de la chaleur tropicale.",
    ],
    includes: [
      'Visite guidée des plantations BOH Tea',
      'Dégustation de thé avec vue',
      'Visite de la Mossy Forest',
      'Ferme de fraises et marché local',
      'Guide local',
      'Transport sur place',
    ],
    toBring: ['Veste légère (il fait frais)', 'Chaussures de marche', 'Appareil photo', 'Parapluie / K-way', 'Argent liquide pour le marché'],
    itinerary: [
      { time: 'Matin', title: 'Arrivée aux Cameron Highlands', desc: 'Route panoramique à travers les montagnes. L\'air se rafraîchit au fur et à mesure de l\'ascension.', icon: 'lucide:mountain' },
      { time: 'Étape 1', title: 'Plantation BOH Tea', desc: 'Visite guidée de la plantation centenaire. Promenade entre les rangées de théiers avec vue sur les vallées.', icon: 'lucide:leaf' },
      { time: 'Étape 2', title: 'Dégustation de thé', desc: 'Pause au tea house avec vue panoramique. Dégustation de différentes variétés de BOH Tea et pâtisseries locales.', icon: 'lucide:coffee' },
      { time: 'Étape 3', title: 'Mossy Forest', desc: 'Randonnée dans la forêt nuageuse couverte de mousse. Ambiance mystérieuse et biodiversité étonnante.', icon: 'lucide:trees' },
      { time: 'Étape 4', title: 'Ferme & marché', desc: 'Visite d\'une ferme de fraises et du marché local : légumes frais, miel, fruits tropicaux et artisanat.', icon: 'lucide:shopping-bag' },
      { time: 'Retour', title: 'Retour', desc: 'Route retour avec des souvenirs plein la tête et du thé plein les valises.', icon: 'lucide:car' },
    ],
    testimonials: [
      { name: 'Isabelle', from: 'France', text: "Un changement total d'ambiance par rapport au reste de la Malaisie. L'air frais, les collines vertes, la dégustation de thé avec cette vue... C'est un moment hors du temps. La Mossy Forest est surréaliste.", img: 'https://i.pravatar.cc/150?img=31' },
      { name: 'Marc', from: 'Belgique', text: "On a adoré la plantation BOH Tea. Le guide était passionnant et la vue depuis le tea house est à couper le souffle. Le marché local est super pour ramener des souvenirs. Excursion parfaite pour se reposer.", img: 'https://i.pravatar.cc/150?img=15' },
      { name: 'Leila', from: 'France', text: "Si vous en avez marre de la chaleur, c'est l'excursion qu'il vous faut. Les paysages sont magnifiques, les fraises fraîches délicieuses, et le thé BOH est devenu mon préféré. Très reposant.", img: 'https://i.pravatar.cc/150?img=36' },
    ],
    highlights: [
      'Plantations de thé BOH centenaires',
      'Vue panoramique sur les vallées brumeuses',
      'Mossy Forest — forêt nuageuse féerique',
      'Dégustation de thé avec vue',
      'Air frais à 1 500m d\'altitude',
      'Ferme de fraises et marché local',
    ],
    nearby: [
      { name: 'Rivière Kinabatangan', slug: 'kinabatangan', image: '/images/kinabatangan-1.webp', lieu: 'Bornéo' },
      { name: 'Sanctuaire d\'éléphants', slug: 'elephant-sanctuary', image: '/images/elephant-1.jpg', lieu: 'Kuala Gandah' },
      { name: 'Croisière BBQ', slug: 'bbq-cruise', image: '/images/bbq-cruise-1.webp', lieu: 'Langkawi' },
    ],
  },
  'elephant-sanctuary': {
    name: 'Sanctuaire d\'éléphants — Kuala Gandah',
    lieu: 'Kuala Gandah, Pahang',
    tags: ['Vie sauvage', 'Famille', 'Nature', 'Éléphants'],
    hero: '/images/elephant-1.jpg',
    gallery: ['/images/elephant-1.jpg', '/images/elephant-2.avif'],
    tested: false,
    duration: 'Demi-journée',
    groupSize: 'Individuel ou groupe',
    difficulty: 'Facile',
    distance: '~2h de Kuala Lumpur',
    rating: 4.6,
    reviews: 178,
    shortDesc: "Un bébé éléphant s'approche de vous, sa trompe se tend doucement. Vous le nourrissez avec des bananes pendant que sa mère vous observe tranquillement. Un moment de connexion pure avec ces géants doux, dans un sanctuaire dédié à leur protection.",
    description: [
      "Le sanctuaire de Kuala Gandah, dans l'État de Pahang, est un centre de conservation dédié à la protection des éléphants d'Asie de Malaisie. Situé à environ 2 heures de Kuala Lumpur, c'est une excursion idéale pour les familles et les amoureux de la nature.",
      "Le centre recueille et réhabilite les éléphants déplacés par la déforestation. Vous pouvez observer ces géants doux de près, les nourrir avec des bananes et des cannes à sucre, et en apprendre plus sur les efforts de conservation.",
      "Les bébés éléphants sont particulièrement attachants — ils s'approchent curieusement des visiteurs et tendent leur trompe pour recevoir de la nourriture. Un moment d'émotion pure, surtout pour les enfants.",
      "L'expérience se déroule dans un cadre naturel, au milieu de la forêt tropicale. Les guides du sanctuaire partagent des histoires touchantes sur chaque éléphant et les défis de leur conservation.",
    ],
    includes: [
      'Entrée au sanctuaire',
      'Session de nourrissage des éléphants',
      'Visite guidée du centre de conservation',
      'Présentation éducative',
      'Guide local',
      'Transport depuis KL (sur demande)',
    ],
    toBring: ['Vêtements qui peuvent être mouillés', 'Chaussures fermées', 'Anti-moustiques', 'Appareil photo', 'Crème solaire', 'Chapeau'],
    itinerary: [
      { time: 'Matin', title: 'Départ depuis KL', desc: 'Route à travers la campagne de Pahang vers le sanctuaire de Kuala Gandah. Environ 2 heures de trajet.', icon: 'lucide:car' },
      { time: 'Étape 1', title: 'Arrivée au sanctuaire', desc: 'Accueil par les guides et présentation du centre de conservation. Découverte de l\'histoire des éléphants recueillis.', icon: 'lucide:home' },
      { time: 'Étape 2', title: 'Nourrissage des éléphants', desc: 'Moment magique : vous nourrissez les éléphants avec des bananes et des cannes à sucre. Les bébés sont particulièrement attachants.', icon: 'lucide:heart' },
      { time: 'Étape 3', title: 'Observation & photos', desc: 'Observation des éléphants dans leur habitat semi-naturel. Photos souvenir avec les géants doux.', icon: 'lucide:camera' },
      { time: 'Étape 4', title: 'Présentation éducative', desc: 'Documentaire et explication des efforts de conservation des éléphants d\'Asie en Malaisie.', icon: 'lucide:book-open' },
      { time: 'Retour', title: 'Retour à KL', desc: 'Route retour vers Kuala Lumpur avec des souvenirs inoubliables.', icon: 'lucide:car' },
    ],
    testimonials: [
      { name: 'Charlotte', from: 'France', text: "Nourrir un bébé éléphant qui vous regarde avec ses grands yeux... C'est un souvenir que je garderai toute ma vie. Le sanctuaire fait un travail incroyable pour la conservation. Les enfants ont adoré.", img: 'https://i.pravatar.cc/150?img=43' },
      { name: 'Maxime', from: 'Suisse', text: "C'est émouvant de voir les éléphants de si près et de comprendre les défis de leur protection. Le guide était passionné et les histoires des éléphants touchantes. Excursion à faire absolument.", img: 'https://i.pravatar.cc/150?img=11' },
      { name: 'Aïcha', from: 'France', text: "On y est allé avec nos 3 enfants et c'était le meilleur moment du voyage pour eux. Les éléphants sont doux et curieux. Le cadre en pleine forêt est magnifique. Très bien organisé.", img: 'https://i.pravatar.cc/150?img=39' },
    ],
    highlights: [
      'Nourrir et approcher les éléphants d\'Asie',
      'Bébés éléphants curieux et attachants',
      'Centre de conservation reconnu',
      'Cadre naturel en forêt tropicale',
      'Excursion idéale pour les familles',
      'À seulement 2h de Kuala Lumpur',
    ],
    nearby: [
      { name: 'Cameron Highlands', slug: 'cameron-highlands', image: '/images/cameron-5.jpg', lieu: 'Cameron Highlands' },
      { name: 'Rivière Kinabatangan', slug: 'kinabatangan', image: '/images/kinabatangan-1.webp', lieu: 'Bornéo' },
      { name: 'Jetski à Langkawi', slug: 'jetski', image: '/images/jetski-1.jpg', lieu: 'Langkawi' },
    ],
  },
  skycab: {
    name: 'SkyCab + Sky Bridge',
    lieu: 'Langkawi, Malaisie',
    tags: ['Culture', 'Vue panoramique', 'Nature', 'Incontournable'],
    hero: '/images/skycab-1.jpg',
    gallery: ['/images/skycab-1.jpg', '/images/skycab-2.jpg', '/images/skycab-3.avif'],
    tested: true,
    duration: '2 à 3 heures',
    groupSize: 'Individuel',
    difficulty: 'Facile',
    distance: 'Mat Cincang, Langkawi',
    rating: 4.7,
    reviews: 524,
    shortDesc: "La cabine s'élève au-dessus de la jungle. En quelques minutes, vous êtes à 700 mètres d'altitude avec une vue à 360° sur l'archipel de Langkawi. Puis vous marchez sur le Sky Bridge — un pont suspendu entre deux sommets, au-dessus des nuages.",
    description: [
      "Le SkyCab de Langkawi est l'un des téléphériques les plus raides au monde. En quelques minutes, il vous emmène du niveau de la mer jusqu'au sommet du mont Mat Cincang, à 700 mètres d'altitude, avec des vues spectaculaires sur la jungle et l'archipel.",
      "Au sommet, le Sky Bridge vous attend — un pont courbe suspendu à 660 mètres d'altitude entre deux sommets. Long de 125 mètres, ce pont à la structure unique offre une vue vertigineuse à 360° sur les îles, la mer d'Andaman et la forêt tropicale en contrebas.",
      "Le parcours comprend plusieurs stations d'observation avec des plateformes en verre pour les plus courageux. La végétation change au fur et à mesure de l'ascension, passant de la jungle dense à la forêt de montagne.",
      "⚠️ Le SkyCab peut être fermé en cas de mauvais temps ou de vents forts. Prévoyez une demi-journée flexible pour cette visite.",
    ],
    includes: [
      'Ticket téléphérique aller-retour',
      'Accès au Sky Bridge',
      'Plateformes d\'observation',
      'Accès SkyDome & SkyRex',
      'Vue panoramique 360°',
    ],
    toBring: ['Chaussures fermées', 'Veste légère (frais en altitude)', 'Appareil photo', 'Crème solaire', 'Bouteille d\'eau'],
    itinerary: [
      { time: 'Arrivée', title: 'Station de base', desc: 'Arrivée à la station Oriental Village au pied du mont Mat Cincang. Achat des billets et embarquement.', icon: 'lucide:ticket' },
      { time: 'Étape 1', title: 'Montée en SkyCab', desc: 'Ascension vertigineuse en téléphérique au-dessus de la jungle. Vue de plus en plus spectaculaire à chaque mètre.', icon: 'lucide:cable-car' },
      { time: 'Étape 2', title: 'Station intermédiaire', desc: 'Arrêt à la station SkyDome et SkyRex. Expositions interactives et premières vues panoramiques.', icon: 'lucide:eye' },
      { time: 'Étape 3', title: 'Sommet — 700m', desc: 'Arrivée au sommet du Mat Cincang. Vue à 360° sur l\'archipel, la Thaïlande au loin et la mer d\'Andaman.', icon: 'lucide:mountain' },
      { time: 'Étape 4', title: 'Sky Bridge', desc: 'Traversée du pont suspendu courbe à 660m d\'altitude. 125 mètres entre deux sommets avec sol en verre par endroits.', icon: 'lucide:wind' },
      { time: 'Retour', title: 'Descente', desc: 'Retour en téléphérique avec la lumière qui change. Dernières photos et retour à la station de base.', icon: 'lucide:arrow-down' },
    ],
    testimonials: [
      { name: 'Antoine', from: 'France', text: "Le Sky Bridge est impressionnant — marcher à 660 mètres au-dessus de la jungle sur un pont courbe, c'est une sensation unique. La vue au sommet est à couper le souffle. Incontournable à Langkawi.", img: 'https://i.pravatar.cc/150?img=13' },
      { name: 'Julie', from: 'Belgique', text: "Le téléphérique monte vraiment raide, c'est déjà une aventure en soi. En haut, la vue à 360° est dingue — on voit jusqu'en Thaïlande par temps clair. Le pont en verre fait monter l'adrénaline.", img: 'https://i.pravatar.cc/150?img=48' },
      { name: 'Nassim', from: 'France', text: "On y est allé tôt le matin pour éviter la foule, c'était parfait. L'air est frais en haut et la vue est magique. Le Sky Bridge vaut vraiment le détour, même pour ceux qui ont un peu le vertige.", img: 'https://i.pravatar.cc/150?img=55' },
    ],
    highlights: [
      'L\'un des téléphériques les plus raides au monde',
      'Sky Bridge : pont suspendu courbe à 660m d\'altitude',
      'Vue à 360° jusqu\'en Thaïlande par temps clair',
      'Plateformes en verre pour les plus courageux',
      'Sommet du mont Mat Cincang à 700m',
      'Incontournable de Langkawi',
    ],
    nearby: [
      { name: 'Jetski à Langkawi', slug: 'jetski', image: '/images/jetski-1.jpg', lieu: 'Langkawi' },
      { name: 'Tour en Mangrove', slug: 'mangrove-tour', image: '/images/mangrove-3.jpg', lieu: 'Langkawi' },
      { name: 'Croisière BBQ', slug: 'bbq-cruise', image: '/images/bbq-cruise-1.webp', lieu: 'Langkawi' },
    ],
  },
};

export default function ExcursionPage() {
  const { slug } = useParams();
  const data = EXCURSIONS_DATA[slug];
  const [scrollY, setScrollY] = useState(0);
  const galleryRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, {passive:true});
    return () => window.removeEventListener('scroll', h);
  }, [slug]);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center" style={{background: cream}}>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Excursion introuvable</h1>
        <Link to="/" className="text-teal-600 font-semibold hover:text-teal-500">← Retour à l'accueil</Link>
      </div>
    </div>
  );

  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par l'excursion ${data.name} !`)}`;
  const navOpaque = scrollY > 80;

  return (
    <div className="overflow-x-hidden">
      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navOpaque ? 'bg-white/95 backdrop-blur-2xl shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/">
            <img src="/images/logo.png" alt="Selamat Voyage" className={`transition-all duration-300 ${navOpaque ? 'h-20' : 'h-28'}`} />
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className={`hidden md:inline-flex text-sm font-medium px-4 py-2 rounded-full transition-colors ${navOpaque?'text-gray-500 hover:text-teal-600':'text-white/70 hover:text-white'}`}>
              ← Toutes les excursions
            </Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="bg-teal-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-400 transition-colors inline-flex items-center gap-2 shadow-md shadow-teal-500/20">
              <iconify-icon icon="simple-icons:whatsapp" width="16" height="16" style={{color:'#fff'}}></iconify-icon> Réserver
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO — Full-bleed immersive ═══════════ */}
      <section className="relative h-screen min-h-[500px] md:min-h-[700px] overflow-hidden">
        {data.video ? (
          <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"
            onLoadedMetadata={() => { if(videoRef.current) videoRef.current.currentTime = 4; }}
            style={{transform:`scale(${1 + scrollY*0.0003}) translateY(${scrollY*0.15}px)`}}>
            <source src={data.video} type="video/mp4" />
          </video>
        ) : (
          <img src={data.hero} className="absolute inset-0 w-full h-full object-cover" alt={data.name}
            style={{transform:`scale(${1 + scrollY*0.0003}) translateY(${scrollY*0.15}px)`}} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/70"></div>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight font-bold text-white leading-[0.9] mb-8"
              style={{transform:`translateY(${scrollY*-0.15}px)`, opacity: Math.max(0, 1 - scrollY/600)}}>
              {data.name}
            </h1>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="bg-teal-500 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-teal-400 transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg shadow-teal-500/30"
              style={{opacity: Math.max(0, 1 - scrollY/600)}}>
              <iconify-icon icon="simple-icons:whatsapp" width="20" height="20" style={{color:'#fff'}}></iconify-icon> Réserver cette excursion
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <iconify-icon icon="lucide:chevron-down" width="24" height="24" style={{color:'rgba(255,255,255,0.4)'}}></iconify-icon>
        </div>
      </section>

      {/* ═══════════ INTRO — editorial ═══════════ */}
      <section className="py-24 px-6" style={{background: cream}}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal-600 text-xs font-semibold tracking-widest uppercase mb-6">L'expérience</p>
          <h2 className="text-2xl md:text-4xl tracking-tight font-bold text-gray-900 leading-snug mb-10">{data.shortDesc}</h2>

          {/* Info pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: 'lucide:clock', v: data.duration },
              { icon: 'lucide:users', v: data.groupSize },
              { icon: 'lucide:route', v: data.distance },
              { icon: 'lucide:gauge', v: data.difficulty },
            ].map((p,i) => (
              <div key={i} className="inline-flex items-center gap-2 rounded-full px-4 py-2" style={{background: creamDark}}>
                <iconify-icon icon={p.icon} width="14" height="14" style={{color:'#0d9488'}}></iconify-icon>
                <span className="text-xs font-semibold text-gray-700">{p.v}</span>
              </div>
            ))}
            <div className="inline-flex items-center gap-1.5 rounded-full px-4 py-2" style={{background: creamDark}}>
              <iconify-icon icon="lucide:star" width="14" height="14" style={{color:'#fbbf24'}}></iconify-icon>
              <span className="text-xs font-semibold text-gray-700">{data.rating}/5 — {data.reviews} avis</span>
            </div>
          </div>

          <div className="w-12 h-px bg-teal-400 mx-auto mb-10"></div>
          <div className="space-y-5 text-left">
            {data.description.map((p, i) => (
              <p key={i} className="text-sm md:text-base text-gray-500 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HIGHLIGHTS ═══════════ */}
      {data.highlights && (
        <section className="py-20 px-6" style={{background: creamDark}}>
          <div className="max-w-4xl mx-auto">
            <p className="text-teal-600 text-xs font-semibold tracking-widest uppercase mb-3 text-center">Pourquoi cette excursion</p>
            <h2 className="text-3xl md:text-4xl tracking-tight font-bold text-gray-900 text-center mb-14">Les points forts.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl p-5 hover:shadow-md transition-all" style={{background: cream}}>
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center shrink-0 mt-0.5">
                    <iconify-icon icon="lucide:check" width="14" height="14" style={{color:'#fff'}}></iconify-icon>
                  </div>
                  <span className="text-sm text-gray-700 font-medium leading-snug">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ PHOTO GALLERY ═══════════ */}
      <section className="px-6 py-10" style={{background: cream}}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3" style={{gridAutoRows:'220px'}}>
          {data.gallery.map((img, i) => (
            <div key={i} className={`rounded-2xl overflow-hidden relative group cursor-pointer ${i===0?'sm:col-span-2 sm:row-span-2':''}`}>
              <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ ITINERARY — horizontal scrolling cards ═══════════ */}
      <section className="py-24 px-6" style={{background: cream}}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-teal-600 text-xs font-semibold tracking-widest uppercase mb-3">Déroulement</p>
              <h2 className="text-3xl md:text-4xl tracking-tight font-bold text-gray-900">Votre journée,<br />minute par minute.</h2>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <iconify-icon icon="lucide:clock" width="14" height="14" style={{color:'#9ca3af'}}></iconify-icon>
              Durée totale : {data.duration}
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{scrollbarWidth:'none'}}>
            {data.itinerary.map((step, i) => (
              <div key={i} className="snap-start shrink-0 w-64 rounded-3xl p-6 relative group hover:shadow-xl transition-all duration-300" style={{background: i===0?'#0d9488':creamDark}}>
                <div className={`text-[48px] font-bold leading-none mb-4 select-none ${i===0?'text-white/10':'text-teal-500/10'}`}>
                  {String(i+1).padStart(2,'0')}
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${i===0?'bg-white/20':'bg-teal-50'}`}>
                  <iconify-icon icon={step.icon} width="20" height="20" style={{color:i===0?'#fff':'#0d9488'}}></iconify-icon>
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${i===0?'text-teal-200':'text-teal-500'}`}>{step.time}</div>
                <h3 className={`font-bold text-sm mb-2 ${i===0?'text-white':'text-gray-900'}`}>{step.title}</h3>
                <p className={`text-xs leading-relaxed ${i===0?'text-white/70':'text-gray-500'}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════ INCLUDES + TOBRING ═══════════ */}
      <section className="py-24 px-6" style={{background: cream}}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl p-8 relative overflow-hidden" style={{background: creamDark}}>
            <div className="text-[100px] font-bold text-teal-500/5 absolute -top-6 -right-4 leading-none select-none">✓</div>
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <iconify-icon icon="lucide:check-circle" width="20" height="20" style={{color:'#0d9488'}}></iconify-icon>
              Ce qui est inclus
            </h3>
            <div className="space-y-3">
              {data.includes.map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <iconify-icon icon="lucide:check" width="12" height="12" style={{color:'#fff'}}></iconify-icon>
                  </div>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl p-8 relative overflow-hidden" style={{background: creamDark}}>
            <div className="text-[100px] font-bold text-teal-500/5 absolute -top-6 -right-4 leading-none select-none">🎒</div>
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <iconify-icon icon="lucide:backpack" width="20" height="20" style={{color:'#0d9488'}}></iconify-icon>
              À apporter
            </h3>
            <div className="space-y-3">
              {data.toBring.map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-110 transition-transform">
                    <iconify-icon icon="lucide:circle-dot" width="12" height="12" style={{color:'#0d9488'}}></iconify-icon>
                  </div>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-24 px-6" style={{background: creamDark}}>
        <div className="max-w-5xl mx-auto">
          {/* Header with rating badge */}
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-3 mb-6 rounded-full px-5 py-2.5" style={{background: cream}}>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_,j) => <iconify-icon key={j} icon="lucide:star" width="16" height="16" style={{color:'#fbbf24'}}></iconify-icon>)}
              </div>
              <span className="text-sm font-bold text-gray-900">{data.rating}/5</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-500">{data.reviews} avis vérifiés</span>
            </div>
            <h2 className="text-3xl md:text-4xl tracking-tight font-bold text-gray-900 text-center">Ils l'ont vécu.</h2>
          </div>

          {/* Featured testimonial */}
          <div className="rounded-3xl p-10 md:p-14 mb-8 relative overflow-hidden" style={{background: '#0d9488'}}>
            <div className="absolute top-6 left-10 text-[120px] font-bold leading-none text-white/5 select-none">"</div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <p className="text-white text-lg md:text-2xl font-medium leading-relaxed mb-8 italic">
                "{data.testimonials[0].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img src={data.testimonials[0].img} className="w-14 h-14 rounded-full object-cover border-3 border-white/20" alt={data.testimonials[0].name} />
                <div className="text-left">
                  <div className="text-white font-bold">{data.testimonials[0].name}</div>
                  <div className="text-white/50 text-sm">{data.testimonials[0].from}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Other testimonials */}
          <div className="grid md:grid-cols-2 gap-6">
            {data.testimonials.slice(1).map((t, i) => (
              <div key={i} className="rounded-3xl p-8 relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1" style={{background: cream}}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_,j) => <iconify-icon key={j} icon="lucide:star" width="12" height="12" style={{color:'#14b8a6'}}></iconify-icon>)}
                  </div>
                  <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <iconify-icon icon="lucide:badge-check" width="10" height="10" style={{color:'#0d9488'}}></iconify-icon> Vérifié
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} className="w-10 h-10 rounded-full object-cover shadow-sm" alt={t.name} />
                  <div>
                    <div className="font-bold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.from}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ NEARBY — hover cards ═══════════ */}
      <section className="py-24 px-6" style={{background: cream}}>
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-widest uppercase mb-3 text-center">À découvrir aussi</p>
          <h2 className="text-3xl md:text-4xl tracking-tight font-bold text-gray-900 text-center mb-14">D'autres aventures<br />vous attendent.</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.nearby.map((ex, i) => (
              <Link key={i} to={`/excursion/${ex.slug}`} className="group relative rounded-3xl overflow-hidden h-52 sm:h-64 md:h-72 block">
                <img src={ex.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={ex.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-all"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white text-lg font-bold mb-1 group-hover:translate-y-0 translate-y-1 transition-transform">{ex.name}</div>
                  <div className="text-white/50 text-xs flex items-center gap-1">
                    <iconify-icon icon="lucide:map-pin" width="10" height="10" style={{color:'rgba(255,255,255,0.5)'}}></iconify-icon> {ex.lieu}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-28 px-6" style={{background: cream}}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[80px] md:text-[120px] font-bold leading-none text-teal-500/10 select-none mb--6">Go</div>
          <h2 className="text-3xl md:text-5xl tracking-tight font-bold text-gray-900 leading-tight mb-5">
            Prêt à réserver ?
          </h2>
          <p className="text-base text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
            Un message sur WhatsApp et on s'occupe de tout — réservation, transport, transfert hôtel.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="bg-teal-500 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-teal-400 transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg shadow-teal-500/25">
              <iconify-icon icon="simple-icons:whatsapp" width="20" height="20" style={{color:'#fff'}}></iconify-icon> Réserver sur WhatsApp
            </a>
            <Link to="/" className="border-2 border-gray-200 text-gray-600 px-8 py-4 rounded-full text-base font-semibold hover:border-teal-400 hover:text-teal-600 transition-colors">
              Toutes les excursions
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-100" style={{background: cream}}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/"><img src="/images/logo.png" alt="Selamat Voyage" className="h-10" /></Link>
          <p className="text-xs text-gray-400">&copy; 2026 Selamat Voyage — Kuala Lumpur, Malaisie</p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-50 transition-colors"><iconify-icon icon="simple-icons:instagram" width="14" height="14" style={{color:'#6b7280'}}></iconify-icon></a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-50 transition-colors"><iconify-icon icon="simple-icons:tiktok" width="14" height="14" style={{color:'#6b7280'}}></iconify-icon></a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-50 transition-colors"><iconify-icon icon="simple-icons:whatsapp" width="14" height="14" style={{color:'#6b7280'}}></iconify-icon></a>
          </div>
        </div>
      </footer>

    </div>
  );
}
