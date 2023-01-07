const express = require("express");

const app = express();

const storage = require("node-persist");
app.use(express.json());

const init = async () => {
    await storage.init({ dir: "./students" });
};

init();

app.get("/allStudents", async (req, res) => {
    const students = await storage.getItem("students");
    let html = "<h1>All Students Data</h1>";

    const allStudentHtml = students.forEach((student) => {
        html += `
            <div>
                <h3>Student id: ${student.id}</h1>
                <h3>Student name: ${student.name}</h1>
                <h3>Student gpa: ${student.gpa}</h1>
                <hr>
            </div>
        `;
    });

    res.send(html);
});

app.post("/createStudent", async (req, res) => {
    const students = (await storage.getItem("students")) || [];
    const newStudent = req.body;
    newStudent.id = students.length + 1;

    await storage.setItem("students", [...students, newStudent]);
    res.send("Student saved");
});

app.listen(8090, () => console.log("Project running on port", 8090));
