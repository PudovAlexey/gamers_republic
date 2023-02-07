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
    title: 'check this out!',
    description: 
    "From start of my development career I dream to construct service from gamers to gamers" + 
    "where you can spend your time with friends so fun\n\r" + 
    "Forget about stress and worries. Invite a friend and play in Gamers republic together." +
    "Don't be afraid to be alone, find a companion in the chat and continue the game",
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