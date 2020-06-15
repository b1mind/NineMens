# 9Mind's Morris

(_9 Men's Morris_)

[Play the Game](https://b1m1nd.github.io/NineMens/)

**This is a logic board game that I have recently fallen in love with. I hope you enjoy**

💡
**This game is fully playable, if you follow the rules.**
I am looking at making a undue move button to help if you do make a wrong move.

⛑ Still working on some of the logic preventing breaking rules. Also working on other UX/UI improvements. As I start to refactor the project I might look at moving it over to <a href="https://svelte.dev/" target="_blank">Svelte "framework"</a> over vanilla js.

```
// working
✅ Player turns Phase 1 and 2
✅ Single Mills (highlighting working for double)
✅ Capturing Players
✅ Forced Capture (must capture to advance)
✅ Phase 2 only moves on path allowed
// working on
❌ Mills are not safe and can be deleted (illegal move)
❌ Double Mills will highlight but only one capture allowed
❌ Can move more than one space (illegal move, unless Phase 3)
❌ Can move back to same spot (illegal move)
❌ Phase 3 (optional) Can't Fly yet (limited to only path moves)
```

## Rules for the game

[4:20s video of rules](https://www.youtube.com/watch?v=zvbIKOHIkRE)

- There are 2 players in the game.
- The board consists of a grid of 3 squares one inside the other, with lines connecting the 24 intersections on which pieces can be placed.
- Each player has 9 pieces, called “men” of a given color.
- Each player tries to form a “mill”, which is 3 of their pieces in one row connected by the line. - To form a mill, the pieces can be placed either horizontally or vertically, but not at at a 90 degree angle, and they must be connected by lines.
- The game begins when all pieces are off the board.
- Players decide who goes first either by agreement or by lot, such as toss of a coin.
- There are 3 phases to the game:
- **Phase 1:** Placing the men onto the board
  - The players take turns placing one piece at a time onto the board, onto the empty dots.
  - During this phase each player tries to prevent the opponent from forming a mill. However, if a mill was formed anyway, then the player who formed a mill gets to remove one of the opponent’s pieces, of their choice, from the board. The piece removed has to be not in a mill itself. If all of the opponent’s pieces form a mill, then none of the opponent’s pieces can be removed.
  - Players can form more than one mill in a single move by strategically placing their pieces. If they form more than one mill, then they get to remove as many of the opponent’s pieces, as the number of mills that they formed.
  - The act of removing an opponent’s piece after forming a mill is called, “pounding”.
- **Phase 2:** Moving the men on the board
  - Once all of the pieces have been placed onto the board, the players begin moving their pieces, in alternating moves, one dot at a time to try to form mills in the same fashion as in the first phase.
  - In the second phase pieces can only move to an adjacent dot, and pieces cannot jump over each other or skip dots if more than one are available in a row.
  - A player is allowed to move a piece out of a mill and then moving it back on the next move to form the mill again. If this happens it is considered as if they formed a new mill and they get to remove one of the opponent’s pieces.
- **Optional Phase 3:** Flying the men across the board
  - When one of the players has been reduced down to 3 last pieces, phase 2 ends and phase 3 begins.
  - In phase 3, the limitation of moving only to an adjacent dot is removed, and both players can move their pieces to any available dot, even if that requires skipping dots or jumping over other pieces. Such movement is called “flying”.
  - Phase 3 is optional and is considered a variation of the game to give an advantage to the losing opponent once they only have one piece left. If the players agree not to play phase 3 then they continue playing phase 2 until the end of the game.
  - The game ends when one of the players is reduced to two pieces, and cannot any longer form mills, or if a player has no legal moves to make, making their opponent the winner in either situation.

### Future Features

<a href="https://github.com/b1m1nd/NineMens/blob/master/z.todo" target="_blank">Todo List</a>

~~features you will probably never get lol~~

- Ready up to start first turn roll
- multiplayer of some sort...
- Chatroom with ready commands or just chat if multiplayer
- Chat lobby and game rooms(one chat different views)?
