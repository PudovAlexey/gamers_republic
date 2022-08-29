import wall from '../arcanoidAssets/arcanoidWall.png'
import Level1  from './Level1'
export type Assets = Record<string, string>
class Levels {
    levels = {
        1: Level1
    }

    buildLevel(level) {
        const CurrentLevel = this.levels[level]
        const levelObjects = new CurrentLevel({wall})
        return levelObjects.parseLevel()
    }
}

export default Levels