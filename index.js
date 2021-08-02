class TennisCounter {
  constructor() {
    this.scoreSet = ["0", "15", "30", "40", "Av"];
    this.currentSet = 0;
    this.tieBreak = false;
  }

  _printScore() {
    if (this.playerOne && this.playerTwo) {
      console.log(
        `             Set 1 | Set 2 | Set 3 — Current Set\n PlayerOne :  [${
          this.playerOne.gameScore[0]
        }]  |  [${this.playerOne.gameScore[1]}]  |  [${this.playerOne.gameScore[2]}]  —  [${
          this.tieBreak ? this.playerOne.currentGame : this.scoreSet[this.playerOne.currentGame]
        }] \n PlayerTwo :  [${this.playerTwo.gameScore[0]}]  |  [${
          this.playerTwo.gameScore[1]
        }]  |  [${this.playerTwo.gameScore[2]}]  —  [${
          this.tieBreak ? this.playerTwo.currentGame : this.scoreSet[this.playerTwo.currentGame]
        }]`
      );
    }
  }

  _increaseCurrentGameScore(winningPlayer, losingPlayer) {
    console.log(`${winningPlayer.name} scores the point`);

    if (!this.tieBreak) {
      if (
        winningPlayer.currentGame < 3 ||
        (winningPlayer.currentGame === 3 && losingPlayer.currentGame === 3)
      ) {
        winningPlayer.currentGame++;
      } else if (winningPlayer.currentGame === 3 && losingPlayer.currentGame === 4) {
        losingPlayer.currentGame--;
      } else if (
        winningPlayer.currentGame === 4 ||
        (winningPlayer.currentGame === 3 && losingPlayer.currentGame < 3)
      ) {
        this._increaseSetScore(winningPlayer, losingPlayer);
      }
    } else {
      winningPlayer.currentGame++;
      this.scoreDiff = winningPlayer.currentGame - losingPlayer.currentGame;

      if (winningPlayer.currentGame >= 7 && this.scoreDiff >= 2) {
        this._increaseSetScore(winningPlayer, losingPlayer);
      }
    }
  }

  _increaseSetScore(winningPlayer, losingPlayer) {
    console.log(`${winningPlayer.name} wins the game`);

    winningPlayer.currentGame = 0;
    losingPlayer.currentGame = 0;

    winningPlayer.gameScore[this.currentSet]++;

    this.scoreDiff =
      winningPlayer.gameScore[this.currentSet] - losingPlayer.gameScore[this.currentSet];

    if (
      (winningPlayer.gameScore[this.currentSet] === 6 && this.scoreDiff >= 2) ||
      winningPlayer.gameScore[this.currentSet] === 7
    ) {
      this._setHasBeenWon(winningPlayer);
    } else if (winningPlayer.gameScore[this.currentSet] === 6 && this.scoreDiff === 0) {
      this.tieBreak = true;
      console.log("Tie break !");
    }
  }

  _setHasBeenWon(winningPlayer) {
    console.log(`${winningPlayer.name} wins the set !`);

    this.tieBreak = false;
    winningPlayer.setsWon++;

    if (winningPlayer.setsWon < 2) {
      this.currentSet++;
    } else {
      console.log(`${winningPlayer.name} wins the match ! \nFin de partie.`);
    }
  }

  /**
   * To initialize the match.
   */
  init() {
    this.playerOne = new Player("playerOne");
    this.playerTwo = new Player("playerTwo");

    console.log(`The tennis match begins !`);

    return this._printScore();
  }

  /**
   * Give the point to playerOne.
   */
  playerOneScores() {
    this._increaseCurrentGameScore(this.playerOne, this.playerTwo);
    return this._printScore();
  }

  /**
   * Give the point to playerTwo.
   */
  playerTwoScores() {
    this._increaseCurrentGameScore(this.playerTwo, this.playerOne);
    return this._printScore();
  }

  /**
   * Allows you to give a state to the match.
   * @param {Int[]} gameScore1 - The result of the first set.
   * @param {Int[] | null} [gameScore2] - The result of the second set.
   */
  setScore(gameScore1, gameScore2 = null) {
    this.playerOne.gameScore[0] = gameScore1[0];
    this.playerTwo.gameScore[0] = gameScore1[1];

    gameScore1[0] > gameScore1[1] ? this.playerOne.setsWon++ : this.playerTwo.setsWon++;
    this.currentSet++;

    if (gameScore2) {
      this.playerOne.gameScore[1] = gameScore2[0];
      this.playerTwo.gameScore[1] = gameScore2[1];

      gameScore2[0] > gameScore2[1] ? this.playerOne.setsWon++ : this.playerTwo.setsWon++;
      this.currentSet++;
    }

    return this._printScore();
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.setsWon = 0;
    this.gameScore = [0, 0, 0];
    this.currentGame = 0;
  }
}

const tc = new TennisCounter();

console.log("\ud83c\udfbe Tennis Counter (v1.0) \ud83c\udfbe");
