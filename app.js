// // console.log("app.js console log");

// // Add event listener to each cell in the table
//   // Event listener: Table cell (<td>) on click event
//   // On click, change the text/value to O or X
// // let elementrows = document.querySelectorAll('tr');
// // console.log('document.querySelectorAll(\'tr\');:', elementrows);
// let element = document.querySelectorAll('td');
// console.log('document.querySelectorAll(\'td\');:', element);
// element.forEach((cell, index) => {
  // cell.addEventListener('click', () => {
  //   // Add logic to each table cell
  //   console.log('Table cell clicked');
  //   if (player1turn) {
  //     if (cell.innerHTML === 'O') {
  //       console.log('Cannot change value of your opponent\'s O');
  //       console.log('Still Player 1 turn');
  //     } else if (cell.innerHTML === 'X') {
  //       console.log('You already marked this cell, Choose another empty cell');
  //     } else {
  //       cell.innerHTML = 'X';
  //       console.log('Player 2 turn');
  //       player1turn = !player1turn; // Set to false (player 2 turn)
  //       checkRow(index);
  //       countX++;
  //     }
  //   } else {
  //     if (cell.innerHTML === 'X') {
  //       console.log('Cannot change value of your opponent\'s X');
  //       console.log('Still Player 2 turn');
  //     } else if (cell.innerHTML === 'O') {
  //       console.log('You already marked this cell, Choose another empty cell');
  //     } else {
  //       cell.innerHTML = 'O';
  //       console.log('Player 1 turn');
  //       player1turn = !player1turn; // Set to true (player 1 turn)
  //       checkRow(index);
  //       countO++;
  //     }
  //   }
  // });
// });

// // Player 1 will always start first
// let player1turn = true;   // X

// // Add logic to count 3 in a row/diagonally
// let countX = 0;
// let countO = 0;
// // if countTotal = 9, game ends in tie, no more squares to click
// let countTotal = 0;

// // [td, td, td, 0-2
// // td, td, td, 3-5
// // td, td, td] 6-8
// let board = element;
// // let row1 = element.split(0,3);
// // console.log('row1:', row1);

// console.log('board:', board);
// var checkRow = (index) => {
//   console.log('Cell index is:', index);
// }

// var checkCol = (cell) => {

// }

// var checkDiag = (cell) => {

// }
// Initialize and render board onto DOM
// Create board (html table)
// Add 3 rows to board (html table row <tr>)
  // With 3 columns in each row (<td>)
var initializeBoard = () => {
  var board = document.createElement('table');
  board.setAttribute('id', 'board');
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
  console.log('board:', board);
  console.log('rows:', board.children);
  console.log('rows.children:', board.children[0].children);
  // console.log(':', board);
};

var addClickHandler = (col, board) => {
  col.addEventListener('click', () => {
    // Add logic to each table cell
    totalCount++;
    console.log('totalCount:', totalCount);
    if (totalCount === 9) {
      console.log('No more squares to click! Game ends on tie');
      // TODO: Stop game
      removeClickHandler();
    }
    console.log('Table cell clicked');
    if (player1turn) {
      if (col.innerHTML === 'O') {
        console.log('Cannot change value of your opponent\'s O');
        console.log('Still Player 1 turn');
      } else if (col.innerHTML === 'X') {
        console.log('You already marked this cell, Choose another empty cell');
      } else {
        col.innerHTML = 'X';
        console.log('Player 2 turn');
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
        console.log('Player 1 turn');
        checkRow(col, board);
        checkCol(col, board);
        checkDiag(col, board);
        toggleTurn();
      }
    }
  });
}

var removeClickHandler = () => {
  console.log('removing click handlers!');
  // Clone node method to remove all event listeners
  let element = document.getElementById('board');
  console.log('element:', element);
  console.log('element.parentNode:', element.parentNode);
  let elemClone = element.cloneNode(true);
  console.log('elemClone:', elemClone);
  element.parentNode.replaceChild(elemClone, element);


  // Can remove clickhandlers from board
  // console.log('board.children[0].children[0]:', board.children[0].children[0].tagName);
  // for (let i = 0; i < board.children.length; i++) {
  //   let row = board.children[i];
  //   console.log('row: ', row);
  //   for (let j = 0; j < row.children.length; j++) {
  //     let col = row.children[j];
  //     let colElement = col.tagName;
  //     console.log('col:', col);
  //     console.log('colElement:', colElement);
  //     colElement.removeEventListener('click', addClickHandler);
  //   }
  // }

  // Or can remove clickhandlers by getting <td> tag
  // let cells = document.querySelectorAll('td');
  // // console.log('cells:', cells);
  // cells.forEach(cell => {
  //   console.log('cell:', cell);
  //   cell.removeEventListener('click', addClickHandler);
  // });
}

var checkRow = (col, board) => {
  console.log('Col index is:', col);
  let parent = col.parentElement;
  let parentArr = parent.children;
  console.log('Parent of col is:', parent);
  console.log('Parent arr:', parentArr);
  let count = 0;
  console.log('col.innerHTML:', col.innerHTML);
  // Player 1 Logic
  console.log('parentArr[0]:', parentArr[0]);
  if (col.innerHTML === 'X') {
    for (let i = 0; i < parentArr.length; i++) {
      if (parentArr[i].innerHTML === 'X') {
        count++;
        if (count === 3) {
          console.log('Player 1 has a row of 3 X\'s! Player 1 wins!');
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
          console.log('Player 2 has a Row of 3 O\'s! Player 2 wins!');
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
  // Get row of current cell(col)
  // Get the index of the current cell(col) in the row
  // Check the board's column at this index and count X/O
  let count = 0;
  let parent = col.parentElement;
  let parentCollection = parent.children;
  // let indexCol = parentArr.indexOf(col);
  // console.log('indexCol:', indexCol);
  // Convert HTML collection to array so that indexOf is an available method.
  let parentArr = [...parentCollection]; // this works too: let arr = Array.from(parentArr);
  // console.log('arr:', parentArr);
  let indexCol = parentArr.indexOf(col);
  // console.log('indexCol:', indexCol);
  // console.log('board:', board);
  // console.log('board.children:', board.children);
  for (let i = 0; i < board.children.length; i++) {
    let curRow = board.children[i].children;
    // console.log('curRow: ', curRow);
    // console.log('curRow[indexCol]:', curRow[indexCol]);
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
  console.log(boardCollection);
  // Player 1 logic
  if (col.innerHTML === 'X') {
    // Check Major Diag (Top Left to Bot Right)
    if (
      (boardCollection[0].children[0].innerHTML === 'X') &&
      (boardCollection[1].children[1].innerHTML === 'X') &&
      (boardCollection[2].children[2].innerHTML === 'X')
    ) {
      console.log('Player 1 has a Major Diag of 3 X\'s! Player 1 wins!');
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
      console.log('Player 1 has a Minor Diag of 3 X\'s! Player 1 wins!');
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
      console.log('Player 2 has a Major Diag of 3 O\'s! Player 2 wins!');
      // TODO: Stop game
      let body = document.getElementsByTagName('body');
      document.body.append('Player 2 has a Major Diag of 3 O\'s! Player 2 wins!');
      removeClickHandler();
    }
    // Check Minor Diag (Top Right to Bot Left)
    if (
      (boardCollection[0].children[2].innerHTML === 'O') &&
      (boardCollection[1].children[1].innerHTML === 'O') &&
      (boardCollection[0].children[2].innerHTML === 'O')
    ) {
      console.log('Player 2 has a Minor Diag of 3 O\'s! Player 2 wins!');
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