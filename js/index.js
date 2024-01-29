function myFunction() {
  // Get the number of dimensions you want
  var x = document.getElementById("amount");

  // Check if table was created, if has created it will remove and running the code below to create new table
  let element = document.getElementById("myTable");
  let elementRestart = document.getElementById("restart-button");
  let elementAlert = document.getElementsByClassName("alert");
  let elementAlertLose = document.getElementsByClassName("alert-lose");
  let elementAlertDraw = document.getElementsByClassName("alert-draw");

  if (elementAlert.length > 0 || elementAlertLose.length > 0 || elementAlertDraw.length > 0) {
    for (let i = 0; i < elementAlert.length; i++) {
      elementAlert[i].remove();
    }
    for (let i = 0; i < elementAlertLose.length; i++) {
      elementAlertLose[i].remove();
    }
    for (let i = 0; i < elementAlertDraw.length; i++) {
      elementAlertDraw[i].remove();
    }
  }
  if (element) {
    element.remove();
  }
  if (elementRestart) {
    elementRestart.remove();
  }

  // Create the table and his attribute
  let table = document.createElement("table");
  table.setAttribute("id", "myTable");
  document.getElementById("div-table").appendChild(table);

  // Array used to contain potential winning lines
  let winPossibility = [];
  // Create row for the table
  for (let i = 0; i < x.value; i++) {
    let tr = document.createElement("tr");
    table.appendChild(tr);

    // Create column for the row
    for (let j = 0; j < x.value; j++) {
      let td = document.createElement("td");
      tr.appendChild(td);

      // Function used to find potential winning lines
      const datas = checkCorrectLine(i, j, x.value);
      winPossibility.push(...datas);

      td.onclick = function () {
        if (td.textContent) {
          return;
        }
        let getDataTrueElement = document.getElementById("myTable");
        if (getDataTrueElement.dataset.boolean == "true") {
          return;
        }
        let arr = clickCell(td, tr, winPossibility);
        winPossibility = arr;
        const stringYouWinner = findWinner(winPossibility, "you", true, x.value);
        if (stringYouWinner == "win" || stringYouWinner == "draw") {
          return;
        }

        let arr2 = compLogic(table, winPossibility);
        winPossibility = arr2;
        findWinner(winPossibility, "computer", false, x.value);
      };
    }
  }
}

function functionCreateAlert(stringWinner) {
  let divRestart = document.createElement("div");
  divRestart.setAttribute("id", "restart-button");
  divRestart.className = "restart-button";
  document.getElementById("div-alert").appendChild(divRestart);

  let textPleaseSubmitAgain = document.createTextNode("Restart");
  divRestart.appendChild(textPleaseSubmitAgain);
  divRestart.onclick = function () {
    myFunction();
  };

  let divAlert = document.createElement("div");
  if (stringWinner.includes("you")) {
    divAlert.className = "alert";
  } else if (stringWinner.includes("computer")) {
    divAlert.className = "alert-lose";
  } else {
    divAlert.className = "alert-draw";
  }

  document.getElementById("div-alert").appendChild(divAlert);

  let spanClass = document.createElement("span");
  spanClass.className = "closebtn";
  spanClass.onclick = function () {
    closeFunctionSpan(this);
  };
  let Xsymbol = document.createTextNode("x");
  spanClass.appendChild(Xsymbol);

  if (stringWinner.includes("you")) {
    const collection = document.getElementsByClassName("alert");
    collection[0].appendChild(spanClass);
  } else if (stringWinner.includes("computer")) {
    const collection = document.getElementsByClassName("alert-lose");
    collection[0].appendChild(spanClass);
  } else {
    const collection = document.getElementsByClassName("alert-draw");
    collection[0].appendChild(spanClass);
  }

  let strongElement = document.createElement("strong");

  let textAlert = document.createTextNode(stringWinner);
  strongElement.appendChild(textAlert);

  if (stringWinner.includes("you")) {
    document.getElementsByClassName("alert")[0].appendChild(strongElement);
  } else if (stringWinner.includes("computer")) {
    document.getElementsByClassName("alert-lose")[0].appendChild(strongElement);
  } else {
    document.getElementsByClassName("alert-draw")[0].appendChild(strongElement);
  }

  function closeFunctionSpan(el) {
    el.parentElement.style.display = "none";
  }
}

function compLogic(table, winPossibility) {
  let arrRandom = [];

  //  Find row have not yet filled by user
  let searchBool = true;
  winPossibility?.map((row, index) => {
    if (!row.includes(searchBool)) {
      arrRandom.push(index);
    }
  });

  //  Random cells that still empty to be inserted
  let randomNumber = random(arrRandom);

  if (arrRandom.length == 0) {
    let cellRowArr = [];
    winPossibility?.map((row, index) => {
      console.log("row cell", row);
      const rowCellTrue = row.some((item) => {
        return item != true;
      });
      const rowCellFalse = row.some((item) => {
        return item != false;
      });
      if (rowCellTrue && rowCellFalse) {
        row.map((cell) => {
          if (cell != true && cell != false) {
            console.log("cell cell", cell);
            cellRowArr = cell.split(",");

            cellRowArr = cellRowArr.map((item) => {
              return parseInt(item);
            });
          }
        });
      }
    });

    console.log("arrRandom222", arrRandom);
    console.log("cellRowArr222", cellRowArr);
    var getCell = document.getElementById("myTable").rows[cellRowArr[0]].cells;
    getCell[cellRowArr[1]].innerHTML = "O";

    let search = cellRowArr[0] + "," + cellRowArr[1];
    arr = changeArray(winPossibility, search, false);
    return arr;
  }

  console.log("arrRandom", arrRandom);
  console.log("randomNumber", randomNumber);
  //   Get index row and cell index
  let arrCellRandom = [];
  winPossibility[randomNumber].map((item, index) => {
    if (item != false) {
      arrCellRandom.push(index);
    }
  });

  console.log("arrCellRandom", arrCellRandom);
  let randomNumberCell = random(arrCellRandom);
  console.log("randomNumberCell", randomNumberCell);
  let cellRowArr = [];
  console.log("winPossibility[randomNumber]", winPossibility[randomNumber]);
  winPossibility[randomNumber].map((item, index) => {
    console.log("index", index);
    console.log("item", item);
    if (randomNumberCell == index) {
      cellRowArr = item.split(",");
      console.log("cellRowAr1", cellRowArr);
      cellRowArr = cellRowArr.map((item) => {
        return parseInt(item);
      });
    }
  });
  console.log("cellRowArr", cellRowArr);

  var cell = document.getElementById("myTable").rows[cellRowArr[0]].cells;
  cell[cellRowArr[1]].innerHTML = "O";
  let search = cellRowArr[0] + "," + cellRowArr[1];
  arr = changeArray(winPossibility, search, false);
  return arr;
}

// Function used to choose random square to be filled by the computer
function random(numbers) {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

// Click for contain the cell
function clickCell(td, tr, arr) {
  if (!td.textContent) {
    let search = tr.rowIndex + "," + td.cellIndex;
    arr = changeArray(arr, search, true);
    text = document.createTextNode("X");
    td.appendChild(text);
    return arr;
  } else {
    return arr;
  }
}

// Function to find winner
function findWinner(winPossibility, user, boolean, amount) {
  let userString = "";
  let zeroWinPossibility = []
  winPossibility.map((item, index) => {
    const winner = item.every((item) => item == boolean);
    const winnerDraw = item.some((item) => {return item != false && item != true});
    if (winner == true) {
      userString = user + " win";
    } else if (winnerDraw == false) {
      zeroWinPossibility.push(winnerDraw)
    }
  });

  console.log(parseInt(amount) * 2 + 2);
  if (zeroWinPossibility.length == parseInt(amount) * 2 + 2) {
    userString = "draw"
    functionCreateAlert(userString);
    let getDataTrueElement = document.getElementById("myTable");
    getDataTrueElement.setAttribute("data-boolean", true);
    return "draw"
  }
  if (userString != "") {
    functionCreateAlert(userString);
    let getDataTrueElement = document.getElementById("myTable");
    getDataTrueElement.setAttribute("data-boolean", true);
    return "win";
  }
  zeroWinPossibility = []
}
// Used to change the square contain that is filled by user with true boolean or by comp with false boolean
function changeArray(array2d, itemtofind, bool) {
  return array2d.map((row) => {
    return row.map((cell) => {
      if (cell == itemtofind) {
        return (cell = bool);
      } else {
        return (cell = cell);
      }
    });
  });
}
// If you've done make the goals scenario. You can use this for computer and user.
// When it is user turn it will change bool to be true and change the array scenario with true.
// When user finish click it bool will be false and automatically generate X for comp.
// if the array become true, comp automatically get the array still have neutral array, if neutral array is nothing, comp will choose else if to fill random cell.

// The scenario straight line
// 0 +1
// +1 +1
// +1 0
// +1 -1
let cellArrDiagonal1 = [];
function straightLineDiagonal1(row, column, lineLength) {
  cellArrDiagonal1.push(row + "," + column);
  //   scenario +1 +1
  row = row + 1;
  column = column + 1;

  if (row < lineLength && column < lineLength) {
    straightLineDiagonal1(row, column, lineLength);
  }
}

let cellHorizontal = [];
function straightLineHorizontal(row, column, lineLength) {
  cellHorizontal.push(row + "," + column);
  //  scenario +0 +1
  row = row + 0;
  column = column + 1;

  if (row < lineLength && column < lineLength) {
    straightLineHorizontal(row, column, lineLength);
  }
}

let cellVertical = [];
function straightLineVertical(row, column, lineLength) {
  cellVertical.push(row + "," + column);
  //  scenario +1 +0
  row = row + 1;
  column = column + 0;

  if (row < lineLength && column < lineLength) {
    straightLineVertical(row, column, lineLength);
  }
}

let cellArrDiagonal2 = [];
function straightLineDiagonal2(row, column, lineLength) {
  cellArrDiagonal2.push(row + "," + column);
  //  scenario +1 -1
  row = row + 1;
  column = column - 1;
  if (row < 0 || column < 0) {
    return;
  }

  if (row < lineLength && column < lineLength) {
    straightLineDiagonal2(row, column, lineLength);
  }
}

// Check the winning line
function checkCorrectLine(i, j, lineLength) {
  let tableArr = [];
  cellArrDiagonal1 = [];
  straightLineDiagonal1(i, j, lineLength);
  if (cellArrDiagonal1.length == lineLength) {
    tableArr.push(cellArrDiagonal1);
  }
  cellHorizontal = [];
  straightLineHorizontal(i, j, lineLength);
  if (cellHorizontal.length == lineLength) {
    tableArr.push(cellHorizontal);
  }

  cellVertical = [];
  straightLineVertical(i, j, lineLength);
  if (cellVertical.length == lineLength) {
    tableArr.push(cellVertical);
  }
  cellArrDiagonal2 = [];
  straightLineDiagonal2(i, j, lineLength);
  if (cellArrDiagonal2.length == lineLength) {
    tableArr.push(cellArrDiagonal2);
  }

  return tableArr;
}
