'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
// this is logging our 3 seperate stacks in our "stacks" object
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
//  This function should allow us to move the individual pieces
const movePiece = (startStack,endStack) => { 
  if (isLegal(startStack,endStack) === true) {
   let topItem = stacks[startStack].pop();
   console.log(topItem)
   stacks[endStack].push(topItem);

  }
  

  // Your code here

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
// This should check if the move we are trying to make is legal. the larger stack can not be stacked on top of a smaller one
const isLegal = (startStack,endStack) => {
  const lastIndex = (stacks[startStack].length -1)
  console.log('lastindex', lastIndex)
  const startArray = stacks[startStack]
  console.log('startArray', startArray)
  const start = startArray[lastIndex]
  console.log('starting', start)
  const lastEnd = (stacks[endStack].length -1)
  console.log('endindex', lastEnd)
  const endArray = stacks[endStack]
  console.log('endArray', endArray)
  const end = endArray[lastEnd]
  console.log('startingEnd', end)
  
  if (start < end ) {
    console.log('is legal move');
    return true
  } 
  else if (start > end ) {
    console.log('cannot be larger that previous piece');
   return false 
  
  }
  else if (end === undefined) {
    console.log('is a legal move');
    return true
  }
  else if (start === undefined) {
    console.log('nothing to move')
    return false 
    
  }
  // Your code here

}

// What is a win in Towers of Hanoi? When should this function run?
// this function should run when the final stack follow the '4,3,2,1' order
const checkForWin = (startStack,endStack) => {
  if (stacks.c.length === 4 || stacks.b.length === 4) {
  console.log('player has won');  
  return true 
} 
else if (stacks.b.length !== 4 || stacks.c.length !== 4) {

  return false
}
  // Your code here

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  movePiece(startStack, endStack);
  
  checkForWin(startStack,endStack)
  // Your code here

}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
