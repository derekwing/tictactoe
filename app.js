var initializeBoard = () => {
  let restartButton = document.createElement('button');
  restartButton.setAttribute("id", "restart");
  restartButton.innerHTML = 'Restart Game';
  restartButton.addEventListener('click', restartClickHandler);
  document.body.appendChild(restartButton);
  let board = document.createElement('table');
  document.body.appendChild(board);
  for (let i = 0; i < 3; i++) {
    let row = document.createElement('tr');
    board.append(row);
    for (let i = 0; i < 3; i++) {
      let col = document.createElement('td');
      addClickHandler(col, board);
      row.append(col);
    }
  }
  console.log('Current turn: Player 1')
};

var addClickHandler = (col, board) => {
  col.addEventListener('click', () => {
    if (player1turn) {
      if (col.innerHTML === 'O') {
        console.log('Cannot change value of your opponent\'s O');
        console.log('Still Player 1 turn');
      } else if (col.innerHTML === 'X') {
        console.log('You already marked this cell, Choose another empty cell');
      } else {
        col.innerHTML = 'X';
        console.log('Current turn: Player 2');
        checkRow(col, board);
        checkCol(col, board);
        checkDiag(col, board);
        toggleTurn();
      }
    } else {
      if (col.innerHTML === 'X') {
        console.log('Cannot change value of your opponent\'s X');
        console.log('Still Player 2 turn');
      } else if (col.innerHTML === 'O') {
        console.log('You already marked this cell, Choose another empty cell');
      } else {
        col.innerHTML = 'O';
        console.log('Current turn: Player 1');
        checkRow(col, board);
        checkCol(col, board);
        checkDiag(col, board);
        toggleTurn();
      }
    }
    totalCount++;
    if (totalCount === 9) {
      // TODO: Stop game
      let body = document.getElementsByTagName('body');
      document.body.append('No more squares to click! Game ends on tie');
      removeClickHandler();
    }
  });
}

var removeClickHandler = () => {
  console.log('removing click handlers!');
  // Clone node method to remove all event listeners
  let element = document.getElementById('board');
  let elemClone = element.cloneNode(true);
  element.parentNode.replaceChild(elemClone, element);
  // Give event listener back to restart button
  let restartButton = document.getElementById('restart');
  restartButton.addEventListener('click', restartClickHandler);

}

var restartClickHandler = () => {
  console.log('restart clicked');
  document.body.innerHTML = '';
  initializeBoard();
  totalCount = 0;
}

var checkRow = (col, board) => {
  let parent = col.parentElement;
  let parentArr = parent.children;
  let count = 0;
  // Player 1 Logic
  if (col.innerHTML === 'X') {
    for (let i = 0; i < parentArr.length; i++) {
      if (parentArr[i].innerHTML === 'X') {
        count++;
        if (count === 3) {
          // TODO: Stop game
          let body = document.getElementsByTagName('body');
          document.body.append('Player 1 has a row of 3 X\'s! Player 1 wins!');
          removeClickHandler();
        }
      }
    }
  }
  // Player 2 Logic
  if (col.innerHTML === 'O') {
    for (let i = 0; i < parentArr.length; i++) {
      if (parentArr[i].innerHTML === 'O') {
        count++;
        if (count === 3) {
          // TODO: Stop game
          let body = document.getElementsByTagName('body');
          document.body.append('Player 2 has a Row of 3 O\'s! Player 2 wins!');
          removeClickHandler();
        }
      }
    }
  }
}

var checkCol = (col, board) => {
  let count = 0;
  let parent = col.parentElement;
  let parentCollection = parent.children;
  // Convert HTML collection to array so that indexOf is an available method.
  let parentArr = [...parentCollection]; // this works too: let arr = Array.from(parentArr);
  let indexCol = parentArr.indexOf(col);
  for (let i = 0; i < board.children.length; i++) {
    let curRow = board.children[i].children;
    // Player 1 Logic
    if (col.innerHTML === 'X') {
      if (curRow[indexCol].innerHTML === 'X') {
        count++;
        if (count === 3) {
          console.log('Player 1 has a column of 3 X\'s! Player 1 wins!');
          // TODO: Stop game
          let body = document.getElementsByTagName('body');
          document.body.append('Player 1 has a column of 3 X\'s! Player 1 wins!');
          removeClickHandler();
        }
      }
    }
    if (col.innerHTML === 'O') {
      if (curRow[indexCol].innerHTML === 'O') {
        count++;
        if (count === 3) {
          console.log('Player 2 has a column of 3 O\'s! Player 2 wins!');
          // TODO: Stop game
          let body = document.getElementsByTagName('body');
          document.body.append('Player 2 has a column of 3 O\'s! Player 2 wins!');
          removeClickHandler();
        }
      }
    }
  }
}

var checkDiag = (col, board) => { // Only need to check one major/minor diag
  let boardCollection = board.children;
  // Player 1 logic
  if (col.innerHTML === 'X') {
    // Check Major Diag (Top Left to Bot Right)
    if (
      (boardCollection[0].children[0].innerHTML === 'X') &&
      (boardCollection[1].children[1].innerHTML === 'X') &&
      (boardCollection[2].children[2].innerHTML === 'X')
    ) {
      // TODO: Stop game
      let body = document.getElementsByTagName('body');
      document.body.append('Player 1 has a Major Diag of 3 X\'s! Player 1 wins!');
      removeClickHandler();
    }
    // Check Minor Diag (Top Right to Bot Left)
    if (
      (boardCollection[0].children[2].innerHTML === 'X') &&
      (boardCollection[1].children[1].innerHTML === 'X') &&
      (boardCollection[2].children[0].innerHTML === 'X')
    ) {
      // TODO: Stop game
      let body = document.getElementsByTagName('body');
      document.body.append('Player 1 has a Minor Diag of 3 X\'s! Player 1 wins!');
      removeClickHandler();
    }
  }
  // Player 2 logic
  if (col.innerHTML === 'O') {
    // Check Major Diag (Top Left to Bot Right)
    if (
      (boardCollection[0].children[0].innerHTML === 'O') &&
      (boardCollection[1].children[1].innerHTML === 'O') &&
      (boardCollection[2].children[2].innerHTML === 'O')
    ) {
      // TODO: Stop game
      let body = document.getElementsByTagName('body');
      document.body.append('Player 2 has a Major Diag of 3 O\'s! Player 2 wins!');
      removeClickHandler();
    }
    // Check Minor Diag (Top Right to Bot Left)
    if (
      (boardCollection[0].children[2].innerHTML === 'O') &&
      (boardCollection[1].children[1].innerHTML === 'O') &&
      (boardCollection[2].children[0].innerHTML === 'O')
    ) {
      // TODO: Stop game
      let body = document.getElementsByTagName('body');
      document.body.append('Player 2 has a Minor Diag of 3 O\'s! Player 2 wins!');
      removeClickHandler();
    }
  }
}

var toggleTurn = () => {
  player1turn = !player1turn;
}
// Toggle player turn
var player1turn = true;

// Keep track of squares
var totalCount = 0;

initializeBoard();