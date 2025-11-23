import axios from 'axios';
import countryList from '../country-list.json';

export interface Country {
  name: string;
  code: string;
  currency: string;
  flag: string;
}

/**
 * Get country details by country code
 * @param code - Country code (e.g., 'US', 'ID', 'GB')
 * @returns Country object or null if not found
 */
export function getDetailCountry(code: string): Country | null {
  if (!code || !countryList.countries) {
    return null;
  }

  const country = countryList.countries.find(
    (c: Country) => c.code.toUpperCase() === code.toUpperCase()
  );

  return country || null;
}

/**
 * Get all countries
 * @returns Array of all countries
 */
export function getAllCountries(): Country[] {
  return countryList.countries || [];
}

/**
 * Search countries by name or code
 * @param query - Search query
 * @returns Filtered countries
 */
export function searchCountries(query: string): Country[] {
  if (!query || !countryList.countries) {
    return countryList.countries || [];
  }

  const lowerQuery = query.toLowerCase();
  return countryList.countries.filter(
    (country: Country) =>
      country.name.toLowerCase().includes(lowerQuery) ||
      country.code.toLowerCase().includes(lowerQuery) ||
      country.currency.toLowerCase().includes(lowerQuery)
  );
}

export async function getCurrencyApi(code: string): Promise<string | null> {
  const response = await axios.get(`/select/currency/${code}`);
  if (response.data.success) {
    return response.data.data;
  }
  return null;
}
