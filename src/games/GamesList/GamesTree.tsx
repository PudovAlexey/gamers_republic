const gamesTree = {
    node: { virtual: true, text: "Categories" },
    children: [
      {
        node: { text: "Arcades" },
        children: [
          { node: { text: "Arcanoid", game: "arcanoid" } },
          { node: { text: "Snake", game: "" } },
        ],
      },
      {
        node: { text: "Racing" },
        children: [{ node: { text: "Horison Pulce", game: "" } }],
      },
      {
        node: { text: "Desktop" },
        children: [
          {
            node: { text: "Сlassic" },
            children: [
              { node: { text: "Checkers", game: "" } },
              { node: { text: "Chess", game: "" } },
            ],
          },
          {
            node: { text: "Modern" },
            children: [
              { node: { text: "Monopoly" } },
              { node: { text: "Monopoly" } },
            ],
          },
        ],
      },
    ],
  };

  export default gamesTree