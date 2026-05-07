import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const properties = [
  {
    title: "3 Bedroom Semi-Detached House",
    slug: "3-bedroom-semi-detached-house-chatsworth-road-chesterfield-s40",
    description: "A well-presented semi-detached home situated in a sought-after location. The property features a spacious open-plan kitchen and a private rear garden. Excellent transport links to the town centre.",
    price: 245000,
    listing_type: "sale",
    property_type: "semi-detached",
    bedrooms: 3,
    bathrooms: 1,
    address_line1: "Chatsworth Road",
    town: "Chesterfield",
    postcode: "S40 2AP",
    lat: 53.2345,
    lng: -1.4567,
    features: ["Off-street parking", "Rear garden", "Open plan kitchen"],
    status: "active",
    epc_rating: "C",
    council_tax_band: "B",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    title: "4 Bedroom Detached Executive Home",
    slug: "4-bedroom-detached-house-walton-back-lane-walton-s42",
    description: "This stunning executive detached home offers luxury living in the heart of Walton. Featuring period features combined with modern amenities and a large en-suite master bedroom.",
    price: 450000,
    listing_type: "sale",
    property_type: "detached",
    bedrooms: 4,
    bathrooms: 2,
    address_line1: "Walton Back Lane",
    town: "Walton",
    postcode: "S42 7LT",
    lat: 53.2123,
    lng: -1.4789,
    features: ["En-suite", "Period features", "Double garage"],
    status: "active",
    epc_rating: "B",
    council_tax_band: "E",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  // ... Adding 13 more as requested in Fix 8b
  {
    title: "3 Bedroom Terraced House",
    slug: "3-bedroom-terraced-house-ashgate-road-chesterfield-s40",
    description: "A charming terraced property perfect for first-time buyers. Located within walking distance to local amenities and schools. Well-maintained interior throughout.",
    price: 215000,
    listing_type: "sale",
    property_type: "terraced",
    bedrooms: 3,
    bathrooms: 1,
    address_line1: "Ashgate Road",
    town: "Chesterfield",
    postcode: "S40 4AF",
    lat: 53.2389,
    lng: -1.4456,
    features: ["Period features", "Close to schools", "Private garden"],
    status: "active",
    epc_rating: "D",
    council_tax_band: "A",
    images: ["https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    title: "4 Bedroom Detached House",
    slug: "4-bedroom-detached-house-holymoor-road-holymoorside-s42",
    description: "Located in the peaceful village of Holymoorside, this detached home offers a quiet retreat with easy access to Chesterfield. Modern interior with high-quality finishes.",
    price: 425000,
    listing_type: "sale",
    property_type: "detached",
    bedrooms: 4,
    bathrooms: 2,
    address_line1: "Holymoor Road",
    town: "Holymoorside",
    postcode: "S42 7DX",
    lat: 53.2156,
    lng: -1.5123,
    features: ["Quiet location", "Modern interior", "Open plan kitchen"],
    status: "active",
    epc_rating: "C",
    council_tax_band: "D",
    images: ["https://images.unsplash.com/photo-1513584684374-8bdb7483fe8f?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    title: "5 Bedroom Detached Villa",
    slug: "5-bedroom-detached-house-inkersall-road-staveley-s43",
    description: "A substantial family home offering expansive living space. Perfect for large families with five generous bedrooms and multiple reception rooms.",
    price: 585000,
    listing_type: "sale",
    property_type: "detached",
    bedrooms: 5,
    bathrooms: 3,
    address_line1: "Inkersall Road",
    town: "Staveley",
    postcode: "S43 3ED",
    lat: 53.2567,
    lng: -1.3789,
    features: ["Substantial living space", "Multiple reception rooms", "Large garden"],
    status: "active",
    epc_rating: "B",
    council_tax_band: "F",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    title: "3 Bedroom Semi-Detached House",
    slug: "3-bedroom-semi-detached-house-storrs-road-brampton-s40",
    description: "A lovely semi-detached house in the popular Brampton area. Recently updated with a new kitchen and bathroom. Ideal for growing families.",
    price: 275000,
    listing_type: "sale",
    property_type: "semi-detached",
    bedrooms: 3,
    bathrooms: 1,
    address_line1: "Storrs Road",
    town: "Brampton",
    postcode: "S40 3PY",
    lat: 53.2312,
    lng: -1.4678,
    features: ["Recently updated", "New kitchen", "Popular location"],
    status: "active",
    epc_rating: "C",
    council_tax_band: "B",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    title: "4 Bedroom Barn Conversion",
    slug: "4-bedroom-barn-conversion-ashover-s45",
    description: "An exquisite barn conversion set in the picturesque village of Ashover. Combining rustic charm with contemporary luxury and breathtaking views.",
    price: 625000,
    listing_type: "sale",
    property_type: "barn-conversion",
    bedrooms: 4,
    bathrooms: 3,
    address_line1: "Narrowleys Lane",
    town: "Ashover",
    postcode: "S45 0AU",
    lat: 53.1678,
    lng: -1.4890,
    features: ["Rustic charm", "Breathtaking views", "Contemporary luxury"],
    status: "active",
    epc_rating: "C",
    council_tax_band: "G",
    images: ["https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    title: "3 Bedroom Country Cottage",
    slug: "3-bedroom-cottage-eyam-hope-valley-s32",
    description: "A quintessentially English cottage located in the historic village of Eyam. Packed with period features and set within a mature garden.",
    price: 395000,
    listing_type: "sale",
    property_type: "cottage",
    bedrooms: 3,
    bathrooms: 1,
    address_line1: "Main Street",
    town: "Eyam",
    postcode: "S32 5QW",
    lat: 53.2845,
    lng: -1.6734,
    features: ["Period features", "Mature garden", "Historic location"],
    status: "active",
    epc_rating: "E",
    council_tax_band: "D",
    images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    title: "4 Bedroom Detached Family Home",
    slug: "4-bedroom-detached-house-hasland-chesterfield-s41",
    description: "A spacious detached home in the heart of Hasland. Offering flexible living accommodation and a large rear garden. Close to local shops and parks.",
    price: 385000,
    listing_type: "sale",
    property_type: "detached",
    bedrooms: 4,
    bathrooms: 2,
    address_line1: "Hasland Road",
    town: "Hasland",
    postcode: "S41 0RU",
    lat: 53.2212,
    lng: -1.4123,
    features: ["Large garden", "Close to shops", "Flexible living"],
    status: "active",
    epc_rating: "D",
    council_tax_band: "C",
    images: ["https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    title: "5 Bedroom Executive Manor",
    slug: "5-bedroom-executive-manor-old-brampton-s42",
    description: "One of the area's finest executive homes, set in gated grounds. Exceptionally high specification and privacy in Old Brampton.",
    price: 750000,
    listing_type: "sale",
    property_type: "detached",
    bedrooms: 5,
    bathrooms: 4,
    address_line1: "Main Road",
    town: "Old Brampton",
    postcode: "S42 7JG",
    lat: 53.2389,
    lng: -1.5012,
    features: ["Gated grounds", "High specification", "Extreme privacy"],
    status: "active",
    epc_rating: "B",
    council_tax_band: "H",
    images: ["https://images.unsplash.com/photo-1600607687940-47a61219276d?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    title: "2 Bedroom Terraced House",
    slug: "2-bedroom-terraced-house-whittington-moor-s41",
    description: "A well-presented terraced house ideal for first-time buyers or investors. Conveniently located for easy access to the A61 and town centre.",
    price: 140000,
    listing_type: "sale",
    property_type: "terraced",
    bedrooms: 2,
    bathrooms: 1,
    address_line1: "Sheffield Road",
    town: "Whittington Moor",
    postcode: "S41 8LF",
    lat: 53.2512,
    lng: -1.4345,
    features: ["Great investment", "Good transport links", "Move-in ready"],
    status: "active",
    epc_rating: "D",
    council_tax_band: "A",
    images: ["https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    title: "4 Bedroom Detached House",
    slug: "4-bedroom-detached-house-tibshelf-road-holmewood-s42",
    description: "A modern detached home perfect for family life. Featuring a large kitchen-diner and master suite with en-suite. Quiet cul-de-sac location.",
    price: 335000,
    listing_type: "sale",
    property_type: "detached",
    bedrooms: 4,
    bathrooms: 2,
    address_line1: "Tibshelf Road",
    town: "Holmewood",
    postcode: "S42 5TD",
    lat: 53.1890,
    lng: -1.3678,
    features: ["Kitchen-diner", "Master en-suite", "Quiet cul-de-sac"],
    status: "active",
    epc_rating: "C",
    council_tax_band: "C",
    images: ["https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    title: "2 Bedroom Town Centre Apartment",
    slug: "2-bedroom-apartment-chesterfield-town-centre-s40",
    description: "A high-spec apartment in the heart of Chesterfield. Modern open-plan living with integrated appliances and secure parking.",
    price: 775,
    listing_type: "rent",
    property_type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    address_line1: "Knifesmithgate",
    town: "Chesterfield",
    postcode: "S40 1RF",
    lat: 53.2367,
    lng: -1.4289,
    features: ["Town centre location", "Secure parking", "High specification"],
    status: "active",
    epc_rating: "C",
    council_tax_band: "B",
    available_from: "2026-06-01",
    deposit: 890,
    min_tenancy: 6,
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    title: "3 Bedroom Semi-Detached House",
    slug: "3-bedroom-semi-detached-house-birdholme-s40",
    description: "A comfortable family home in the Birdholme area. Spacious living rooms and a well-maintained garden. Close to local schools.",
    price: 1050,
    listing_type: "rent",
    property_type: "semi-detached",
    bedrooms: 3,
    bathrooms: 1,
    address_line1: "Derby Road",
    town: "Birdholme",
    postcode: "S40 2ER",
    lat: 53.2189,
    lng: -1.4234,
    features: ["Spacious living", "Well-maintained garden", "Close to schools"],
    status: "active",
    epc_rating: "D",
    council_tax_band: "B",
    available_from: "2026-05-15",
    deposit: 1210,
    min_tenancy: 12,
    images: ["https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    title: "4 Bedroom Detached House",
    slug: "4-bedroom-detached-house-wingerworth-s42",
    description: "A stunning family home in the highly desirable village of Wingerworth. Modern finishes throughout and a large private garden.",
    price: 1400,
    listing_type: "rent",
    property_type: "detached",
    bedrooms: 4,
    bathrooms: 2,
    address_line1: "Lydgate Drive",
    town: "Wingerworth",
    postcode: "S42 6QH",
    lat: 53.2012,
    lng: -1.4389,
    features: ["Desirable village location", "Modern finishes", "Large private garden"],
    status: "active",
    epc_rating: "B",
    council_tax_band: "E",
    available_from: "2026-05-20",
    deposit: 1600,
    min_tenancy: 12,
    images: ["https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=1200&auto=format&fit=crop"]
  }
]

async function seed() {
  console.log('Starting seed...')
  
  // 1. Get Dales & Peaks agency id
  const { data: agency, error: agencyError } = await supabase
    .from('agencies')
    .select('id')
    .eq('slug', 'dales-and-peaks')
    .single()
    
  if (agencyError || !agency) {
    console.error('Agency not found. Please run the SQL schema first.')
    return
  }
  
  console.log('Found agency:', agency.id)
  
  // 2. Insert properties
  for (const p of properties) {
    const { images, ...propertyData } = p
    const { data: insertedProperty, error: propError } = await supabase
      .from('properties')
      .upsert({
        ...propertyData,
        agency_id: agency.id,
        published_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      }, { onConflict: 'slug' })
      .select('id')
      .single()
      
    if (propError) {
      console.error(`Error inserting property ${p.title}:`, propError.message)
      continue
    }
    
    console.log(`Inserted property: ${p.title}`)
    
    // 3. Insert images
    if (images && images.length > 0) {
      const imageRecords = images.map((url, index) => ({
        property_id: insertedProperty.id,
        url,
        sort_order: index,
        alt_text: p.title
      }))
      
      const { error: imgError } = await supabase
        .from('property_images')
        .insert(imageRecords)
        
      if (imgError) {
        console.error(`Error inserting images for ${p.title}:`, imgError.message)
      }
    }
  }
  
  console.log('Seed completed.')
}

seed()
