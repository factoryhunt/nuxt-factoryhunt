module.exports = [
  {
    "@context": "http://schema.org",
    "@id": "https://www.factoryhunt.com/#organization",
    "@type": "Organization",
    "name": "Factory Hunt",
    "url": "https://www.factoryhunt.com/",
    "logo": "https://s3-us-west-1.amazonaws.com/factoryhunt.com/assets/logos/logo_orange.png",
    "sameAs": [
      "https://www.facebook.com/factoryhunt"
    ]
    // "contactPoint": [{
    //   "@type": "ContactPoint",
    //   "telephone": "+82-10-1234-5678",
    //   "contactType": "customer service"
    // }]
  },
  {
    "@context": "http://schema.org",
    "@id": "https://www.factoryhunt.com/#webpage",
    "@type": "WebPage",
    "url": "https://www.factoryhunt.com/",
    "name": "Factory Hunt"
  },
  {
    "@context": "http://schema.org",
    "@id": "https://www.factoryhunt.com/#website",
    "@type": "WebSite",
    "url": "https://www.factoryhunt.com/",
    "name": "Factory Hunt",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.factoryhunt.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
]


const producthunt = [
  {
    "@context": "http://schema.org",
    "@id": "https://www.producthunt.com/#organization",
    "@type": "Organization",
    "name": "Product Hunt",
    "url": "https://www.producthunt.com/",
    "logo": "https://s3.amazonaws.com/producthunt/static/ph-logo-p-only.png",
    "sameAs": [
      "https://medium.com/@producthunt",
      "https://angel.co/product-hunt",
      "https://www.linkedin.com/company/9107952",
      "https://www.facebook.com/producthunt",
      "https://www.twitter.com/ProductHunt"
    ]
  },
  {
    "@context": "http://schema.org",
    "@id": "https://www.producthunt.com/#webpage",
    "@type": "WebPage",
    "url": "https://www.producthunt.com/",
    "name": "Product Hunt"
  },
  {
    "@context": "http://schema.org",
    "@id": "https://www.producthunt.com/#website",
    "@type": "WebSite",
    "url": "https://www.producthunt.com/",
    "name": "Product Hunt"
  }
]

const airbnb = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  "url": "https://www.airbnb.co.kr/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.airbnb.co.kr/s/all?query={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}