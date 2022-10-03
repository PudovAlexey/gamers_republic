export const MenuItems = {
    node: {virtual: true},
    children: [
        {node: {text: "StartGame", action: () => console.log('startGame')}},
        {node: {text: "Options"}, children: [
            {node: {text: "Sound Settings", control: <div>sound settings</div>}},
            {node: {text: "Difficult Settings", control: <div>difficult</div>}} 
        ]},
        {node: {text: "Out", action: console.log('out')}, children: ""}
    ]
}