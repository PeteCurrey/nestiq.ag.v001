import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const towns = [
  { name: 'Chesterfield', slug: 'chesterfield' },
  { name: 'Matlock', slug: 'matlock' },
  { name: 'Bakewell', slug: 'bakewell' },
  { name: 'Ashbourne', slug: 'ashbourne' },
  { name: 'Buxton', slug: 'buxton' },
  { name: 'Belper', slug: 'belper' },
  { name: 'Dronfield', slug: 'dronfield' },
  { name: 'Alfreton', slug: 'alfreton' },
  { name: 'Ripley', slug: 'ripley' },
  { name: 'Ilkeston', slug: 'ilkeston' },
  { name: 'Swadlincote', slug: 'swadlincote' },
  { name: 'Derby', slug: 'derby' }
];

async function generateLocationPages() {
  console.log('Generating location pages...');

  for (const town of towns) {
    const { data, error } = await supabase
      .from('location_pages')
      .upsert({
        slug: town.slug,
        location_name: town.name,
        h1: `Properties for Sale in ${town.name}`,
        intro_paragraph: `Discover the finest properties for sale in ${town.name}. From historic stone cottages to modern family homes, find your perfect Derbyshire residence with NestIQ's partner agents.`,
        seo_title: `Properties for Sale in ${town.name} | NestIQ Derbyshire`,
        seo_description: `Search 100+ houses and flats for sale in ${town.name}. Verified listings from leading independent estate agents in Derbyshire.`,
        location_name: town.name,
        listing_type: 'sale'
      }, { onConflict: 'slug' });

    if (error) {
      console.error(`Error upserting ${town.name}:`, error);
    } else {
      console.log(`Successfully upserted ${town.name}`);
    }
  }

  console.log('Done!');
}

generateLocationPages();
