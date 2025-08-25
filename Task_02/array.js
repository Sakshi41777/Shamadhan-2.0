// Array of marks
let marks = [45, 100, 89, 34, 92, 76, 88];

// Method 1: Using Math.max and spread operator
let highest1 = Math.max(...marks);
console.log("Highest Marks (Method 1):", highest1);

// Method 2: Using a loop
let highest2 = marks[0];
for (let i = 1; i < marks.length; i++) {
  if (marks[i] > highest2) {
    highest2 = marks[i];
  }
}
console.log("Highest Marks (Method 2):", highest2);

// Method 3: Using forEach
let highest3 = marks[0];
marks.forEach(mark => {
  if (mark > highest3) {
    highest3 = mark;
  }
});
console.log("Highest Marks (Method 3):", highest3);