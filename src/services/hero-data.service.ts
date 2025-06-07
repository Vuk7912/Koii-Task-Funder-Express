// Hero Data Service
// Manages hero information retrieval with flexible, extensible design

export interface Hero {
  id: number;
  name: string;
  realName: string;
  description: string;
  powers: string[];
}

export class HeroDataService {
  private heroes: Hero[] = [
    {
      id: 1,
      name: 'spiderman',
      realName: 'Peter Parker',
      description: 'Friendly neighborhood Spider-Man',
      powers: ['web-slinging', 'spider-sense', 'wall-crawling']
    },
    {
      id: 2,
      name: 'ironman',
      realName: 'Tony Stark',
      description: 'Genius, billionaire, philanthropist',
      powers: ['powered armor', 'advanced technology', 'flight']
    },
    {
      id: 3,
      name: 'captainamerica',
      realName: 'Steve Rogers',
      description: 'Super soldier and Avengers leader',
      powers: ['enhanced strength', 'tactical genius', 'shield mastery']
    }
  ];

  /**
   * Get hero by name (case-insensitive)
   * @param name Hero name to search
   * @returns Hero object or undefined
   */
  getHeroByName(name: string): Hero | undefined {
    if (!name) {
      throw new Error('Hero name is required');
    }

    const normalizedName = name.toLowerCase().replace(/\s/g, '');
    return this.heroes.find(
      hero => hero.name.toLowerCase() === normalizedName
    );
  }

  /**
   * Get all heroes
   * @returns Array of heroes
   */
  getAllHeroes(): Hero[] {
    return [...this.heroes];
  }

  /**
   * Add a new hero to the collection
   * @param hero Hero object to add
   * @returns Added hero
   * @throws Error if hero already exists or is invalid
   */
  addHero(hero: Hero): Hero {
    // Validate hero
    if (!hero.name || !hero.realName) {
      throw new Error('Hero name and real name are required');
    }

    // Check for existing hero
    const existingHero = this.getHeroByName(hero.name);
    if (existingHero) {
      throw new Error(`Hero with name ${hero.name} already exists`);
    }

    // Assign new ID if not provided
    if (!hero.id) {
      hero.id = this.heroes.length + 1;
    }

    this.heroes.push(hero);
    return hero;
  }
}

// Export singleton instance
export const heroDataService = new HeroDataService();