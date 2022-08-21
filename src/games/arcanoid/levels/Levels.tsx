import wall from '../arcanoidAssets/arcanoidWall.png'
import Level1  from './Level1'
class Levels {

    buildLevel() {
        const level = new Level1({wall})
        return level.parseLevel()
    }
}

export default Levels