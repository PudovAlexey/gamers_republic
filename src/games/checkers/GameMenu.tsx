export function gameMenu({setStartGame, navigate}) {
    return  {
        node: {virtual: true},
        children: [
            {node: {text: "StartGame", action: function() {
                console.log('startGame')
                 setStartGame(prev => !prev)
            }}},
            {node: {text: "Options"}, children: [
                {node: {text: "Sound Settings", control: <div>sound settings</div>}},
                {node: {text: "Difficult Settings", control: <div>difficult</div>}} 
            ]},
            {node: {text: "Out", action: function() {
                navigate("/games")
            }}, children: ""}
        ]
    }
} 