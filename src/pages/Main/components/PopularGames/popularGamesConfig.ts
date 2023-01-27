type TPopularGamesConfig = {
    title: string,
    description: string,
    sliderItems: {
        title: string,
        link: string,
        description: string,
        tags: string[]
    }[]
}

const popularGamesConfig: TPopularGamesConfig = {
    title: 'Lore and Storyline',
    description: 
    "In Valorant lore, Jett is an agile agent expert in the art of evasion." + 
    "She overwhelms enemies and wounds them with a blade without them knowing her position." +
    "Of Korean origin, Jett is an agile fighter who gives priority to movement." +
    "Her abilities focus on stealth with jumps that allow her to reach high ledges," + 
    "teleportation, and smoke bombs. Her ultimate ability gives her kunaïs that inflict moderate to heavy damage," +
    "remaining very accurate even when she moves." +
    "There are a total of six groups of weapons that players will be able to purchase at the start of each round" + 
     "with each costing a different amount based on their power and weapon type. None of the weapons are tied exclusively " + 
     "to a specific character, so players will be able to use any of the weapons available in the FPS, no matter the character" + 
     "they are using for a particular match.",
     sliderItems: [
        {
        title: 'Arcanoid',
        link: "",
        description: "",
        tags: []
        }
     ]
}

export {
    popularGamesConfig
}