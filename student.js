// Task_01
// Create a student object
const students = [
    {
        name: "Nitin Rajput",
        age: 20,
        branch: "Artificial Intelligence & Data Science",
        rollNo: "AIDS123",
        college: "RGPV"
    },
    {
        name: "Pawan Parmar",
        age: 22,
        branch: "Artificial Intelligence & Data Science",
        rollNo: "AIDS123",
        college: "RGPV"
    },
    {
        name: "Sakshi Mishra",
        age: 19,
        branch: "Artificial Intelligence & Data Science",
        rollNo: "AIDS123",
        college: "RGPV"
    }
];
// Print student details
students.forEach((student, idx) => {
    console.log(`----- Student ${idx + 1} Details -----`);
    console.log("Name: " + student.name);
    console.log("Age: " + student.age);
    console.log("Branch: " + student.branch);
    console.log("Roll No: " + student.rollNo);
    console.log("College: " + student.college);
});
console.log("Roll No: " + students[0].rollNo);

console.log("College: " + students[0].college);
