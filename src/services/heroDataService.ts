// Hero Data Service: Centralized service for managing hero information

/**
 * Hero interface defining the structure of hero data
 */
export interface Hero {
  id: number;
  name: string;
  alias: string;
  universe: string;
  powers: string[];
}

/**
 * HeroDataService provides methods for retrieving and managing hero data
 */
export class HeroDataService {
  // In-memory storage of heroes
  private heroes: Hero[] = [
    {
      id: 1,
      name: "Peter Parker",
      alias: "Spider-Man",
      universe: "Marvel",
      powers: ["Wall-crawling", "Spider-sense", "Web-shooting"]
    },
    {
      id: 2,
      name: "Tony Stark",
      alias: "Iron Man", 
      universe: "Marvel",
      powers: ["Genius-level intellect", "High-tech armor", "Flight"]
    },
    {
      id: 3,
      name: "Steve Rogers",
      alias: "Captain America",
      universe: "Marvel", 
      powers: ["Peak human strength", "Enhanced healing", "Expert tactician"]
    }
  ];

  /**
   * Retrieves a hero by their name (case-insensitive)
   * @param name - Name or alias of the hero
   * @returns Hero object or undefined if not found
   */
  getHeroByName(name: string): Hero | undefined {
    if (!name) {
      throw new Error("Hero name is required");
    }

    return this.heroes.find(
      hero => 
        hero.name.toLowerCase() === name.toLowerCase() || 
        hero.alias.toLowerCase() === name.toLowerCase()
    );
  }

  /**
   * Retrieves all heroes
   * @returns Array of all heroes
   */
  getAllHeroes(): Hero[] {
    return [...this.heroes];
  }

  /**
   * Adds a new hero to the collection
   * @param hero - Hero object to add
   * @returns The added hero
   * @throws Error if hero already exists or required fields are missing
   */
  addHero(hero: Omit<Hero, 'id'>): Hero {
    // Validate required fields
    if (!hero.name || !hero.alias || !hero.universe) {
      throw new Error("Name, alias, and universe are required");
    }

    // Check for duplicate
    const existingHero = this.getHeroByName(hero.name);
    if (existingHero) {
      throw new Error(`Hero with name ${hero.name} already exists`);
    }

    // Generate new ID (simple implementation)
    const newHero = {
      ...hero,
      id: this.heroes.length + 1
    };

    this.heroes.push(newHero);
    return newHero;
  }

  /**
   * Retrieves heroes by universe
   * @param universe - Universe to filter heroes
   * @returns Array of heroes in the specified universe
   */
  getHeroesByUniverse(universe: string): Hero[] {
    if (!universe) {
      throw new Error("Universe is required");
    }

    return this.heroes.filter(
      hero => hero.universe.toLowerCase() === universe.toLowerCase()
    );
  }
}

// Export a singleton instance for convenience
export const heroDataService = new HeroDataService();