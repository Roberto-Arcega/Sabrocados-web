export const BUSINESS_INFO = {
  name: "Sabrocados",
  legalName: "Sabrocados",
  description:
    "Snacks de cerdo deshidratado artesanal con limón y triple salsa negra. Alta en proteína, baja en carbohidratos, keto-friendly.",
  url: "https://sabrocados.com",
  logo: "https://sabrocados.com/sabrocados-logo.png",
  phone: "+52 477 577 5959",
  email: "hola@sabrocados.com",
  address: {
    streetAddress: "León",
    addressLocality: "León",
    addressRegion: "Guanajuato",
    postalCode: "37000",
    addressCountry: "MX",
  },
  geo: {
    latitude: 21.1250077,
    longitude: -101.6859605,
  },
  socialProfiles: ["https://instagram.com/sabrocados"],
  openingHours: "Mo-Fr 09:00-18:00",
  priceRange: "$$",
};

export const PRODUCT_INFO = {
  name: "Sabrocados - Carne de Cerdo Deshidratada",
  description:
    "Carne de cerdo deshidratada con limón y triple salsa negra. Snack artesanal alto en proteína y bajo en carbohidratos.",
  sku: "SABRO-001",
  brand: "Sabrocados",
  category: "Snacks / Carne Seca / Jerky",
  image: "https://sabrocados.com/hero-product.png",
  price: 99,
  currency: "MXN",
  availability: "https://schema.org/InStock",
  servingSize: "25g",
  nutrition: {
    calories: "80 kcal",
    proteinContent: "5.8g",
    carbohydrateContent: "2g",
    fatContent: "5g",
    fiberContent: "0g",
    sodiumContent: "250mg",
  },
  rating: {
    ratingValue: 4.8,
    reviewCount: 127,
  },
};

export const FAQ_DATA = [
  {
    question: "¿Es apto para dieta keto?",
    answer:
      "¡Sí! Con solo 2g de carbohidratos por porción y alto contenido de proteína, Sabrocados es perfecto para quienes siguen una dieta cetogénica o baja en carbohidratos.",
  },
  {
    question: "¿Cuánto tiempo dura el producto?",
    answer:
      "Gracias a nuestro proceso de deshidratación artesanal, Sabrocados tiene una vida útil de 6 meses sin abrir. Una vez abierto, recomendamos consumirlo dentro de 2 semanas para disfrutar su mejor sabor.",
  },
  {
    question: "¿Cómo debo conservarlo?",
    answer:
      "Guárdalo en un lugar fresco y seco. No requiere refrigeración mientras esté sellado. Una vez abierto, puedes mantenerlo en su empaque original o en un contenedor hermético.",
  },
  {
    question: "¿Contiene alérgenos?",
    answer:
      "Sabrocados contiene soya (presente en las salsas). Está libre de gluten, lácteos y frutos secos. Si tienes alguna alergia específica, consulta nuestra lista completa de ingredientes.",
  },
  {
    question: "¿Hacen envíos a todo México?",
    answer:
      "¡Sí! Enviamos a toda la República Mexicana. Los envíos dentro de Guanajuato tardan 1-2 días hábiles. Para el resto del país, el tiempo de entrega es de 3-5 días hábiles.",
  },
];

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    description: BUSINESS_INFO.description,
    email: BUSINESS_INFO.email,
    telephone: BUSINESS_INFO.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    sameAs: BUSINESS_INFO.socialProfiles,
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${BUSINESS_INFO.url}/#localbusiness`,
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    image: PRODUCT_INFO.image,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    priceRange: BUSINESS_INFO.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    openingHours: BUSINESS_INFO.openingHours,
    sameAs: BUSINESS_INFO.socialProfiles,
    servesCuisine: "Snacks Artesanales Mexicanos",
  };
}

export function generateProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BUSINESS_INFO.url}/#product`,
    name: PRODUCT_INFO.name,
    description: PRODUCT_INFO.description,
    image: PRODUCT_INFO.image,
    sku: PRODUCT_INFO.sku,
    brand: {
      "@type": "Brand",
      name: PRODUCT_INFO.brand,
    },
    category: PRODUCT_INFO.category,
    offers: {
      "@type": "Offer",
      url: BUSINESS_INFO.url,
      priceCurrency: PRODUCT_INFO.currency,
      price: PRODUCT_INFO.price,
      availability: PRODUCT_INFO.availability,
      seller: {
        "@type": "Organization",
        name: BUSINESS_INFO.name,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: PRODUCT_INFO.rating.ratingValue,
      reviewCount: PRODUCT_INFO.rating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    nutrition: {
      "@type": "NutritionInformation",
      servingSize: PRODUCT_INFO.servingSize,
      calories: PRODUCT_INFO.nutrition.calories,
      proteinContent: PRODUCT_INFO.nutrition.proteinContent,
      carbohydrateContent: PRODUCT_INFO.nutrition.carbohydrateContent,
      fatContent: PRODUCT_INFO.nutrition.fatContent,
      fiberContent: PRODUCT_INFO.nutrition.fiberContent,
      sodiumContent: PRODUCT_INFO.nutrition.sodiumContent,
    },
  };
}

export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BUSINESS_INFO.url}/#website`,
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    description: BUSINESS_INFO.description,
    publisher: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      logo: BUSINESS_INFO.logo,
    },
    inLanguage: "es-MX",
  };
}

export function generateBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: BUSINESS_INFO.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Productos",
        item: `${BUSINESS_INFO.url}/#productos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Nutrición",
        item: `${BUSINESS_INFO.url}/#nutricion`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contacto",
        item: `${BUSINESS_INFO.url}/#contacto`,
      },
    ],
  };
}

export function getAllSchemas() {
  return [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateProductSchema(),
    generateFAQSchema(),
    generateWebSiteSchema(),
    generateBreadcrumbSchema(),
  ];
}
