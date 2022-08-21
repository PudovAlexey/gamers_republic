

class AnimationFrame {
    private exit: boolean = false
    private canvasElement = null
    private context: HTMLCanvasElement | null= null
    init(canvasElement: HTMLCanvasElement, game: () => void) {
        this.context = canvasElement.getContext('2d') as HTMLCanvasElement
        this.canvasElement = canvasElement
        this.run(this.context, canvasElement ,game)
    }

    reverseY(coords) {
        return this.canvasElement?.height - 100 - coords
    }

    run(context: HTMLCanvasElement, canvas, game) {
        let start = () => {
            // console.log(context)
            game(context, this.reverseY.bind(this))
            this.run(context, canvas, game)
        }
      
        if (this.exit === false) {
            window.requestAnimationFrame(start.bind(this))

        }
    }

    onExit() {
        this.exit = true
    }
}

export default AnimationFrame