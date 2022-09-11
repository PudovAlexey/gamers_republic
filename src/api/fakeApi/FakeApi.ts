import { buildTree } from "../../utils/treeWalker/treeWalker";
import { compareValue } from "../../utils/utils";
import { GameCategories } from "./data/Games/GameCategories";
import { gamesList } from "./data/Games/GamesList";

class FakeApi {
  async getGameCategories() {
    const gameCategoriesTree = buildTree({nodes: GameCategories})
    let reqCategories = await this.fakeDelay(gameCategoriesTree);
    return reqCategories
  }

  async getGameByCategoryId(categoryId) {

  }

  async findGameList(search) {
    try {
      const findGamesBySearch = !search
        ? []
        : gamesList.filter((game) => {
            return (
              compareValue(game.game, search, "substringLower") ||
              compareValue(game.hashTags, search, "someOfLower")
            );
          });
      let reqGamesList = await this.fakeDelay(findGamesBySearch);
      return reqGamesList;
    } catch (err) {
      this.requestError(err);
    }
  }
  async getGameList() {
    try {
      let reqGamesList = await this.fakeDelay(gamesList);
      return reqGamesList;
    } catch (err) {
      this.requestError(err);
    }
  }

  requestError(err) {
    return err;
  }

  async fakeDelay(data) {
    let delay = 1000;
    var promise = await new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          resolve(data);
        } catch (err) {
          reject(err);
        }
      }, delay);
    });
    return promise;
  }
}

export default FakeApi;
