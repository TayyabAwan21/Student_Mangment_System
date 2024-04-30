import inquirer from "inquirer";
import chalk from "chalk";
class studentManagment {
    students;
    constructor() {
        this.students = [];
    }
    genId() {
        const Id = Math.floor(Math.random() * 100000);
        return Id;
    }
    enrollStudent(name) {
        const StuId = this.genId();
        let new_stud = {
            name,
            StuId,
            enroll_courses: [],
            balance: 0
        };
        this.students.push(new_stud);
        console.log(chalk.bold.greenBright(`${new_stud.name} has been enrolled with ${new_stud.StuId}`));
    }
    addSubjects(StuId, Courses) {
        const student = this.findId(StuId);
        if (!student) {
            console.log(chalk.red("Courses cant be registred Student is not Enrolled yet"));
        }
        else if (student) {
            student.enroll_courses.push(...Courses);
            const Fee = Courses.reduce((total, subject) => total + subject.fee, 0);
            student.balance += Fee;
        }
    }
    veiwBalance(StuId) {
        const student = this.findId(StuId);
        if (student) {
            console.log(`${student.name} Balance is ${student.balance}`);
        }
        else {
            console.log("Student does not exist");
        }
    }
    payFee(StuId, amount) {
        const student = this.findId(StuId);
        if (student) {
            if (student.balance <= amount) {
                student.balance -= amount;
                console.log(`${amount} has been successfully paid by ${student.name}`);
            }
            else {
                console.log("Fee is not paid");
            }
        }
        else {
            console.log("Student does not exist");
        }
    }
    VeiwStatus(StuId) {
        const student = this.findId(StuId);
        if (student) {
            console.log(chalk.red(`Student name : ${student.name}`));
            console.log(chalk.green("Student Enrolled Courses are: "));
            student
                .enroll_courses.forEach(course => console.log(`${course.Course_name}`));
            console.log(`Student Balnce is ${student.balance}`);
        }
        else {
            console.log("Student does not exist");
        }
    }
    findId(StuId) {
        return this.students.find(student => student.StuId == StuId);
    }
}
const sms = new studentManagment();
console.log(chalk.bgCyanBright("Welcome to Tayyab's Student Managment Software"));
async function Managment() {
    while (true) {
        let user = await inquirer.prompt({
            name: "action", message: "Which Action You want to Perfom",
            type: "list",
            choices: ["Enroll Student", "Register SUbjects", "Veiw Staus",
                "Veiw Balance", "Pay Fee", "Exit"]
        });
        if (user.action == "Enroll Student") {
            let res = await inquirer.prompt({
                name: "act", message: "Enter Student name",
                type: "input",
            });
            sms.enrollStudent(res.act);
        }
        if (user.action == "Register SUbjects") {
            let res = await inquirer.prompt({
                name: "act", message: "Enter Student Id",
                type: "number"
            });
            let coUrse = await subjReg();
            sms.addSubjects(res.act, [coUrse]);
        }
        if (user.action == "Veiw Staus") {
            let res = await inquirer.prompt({
                name: "act", message: "Enter Student Id",
                type: "number",
            });
            sms.VeiwStatus(res.act);
        }
        if (user.action == "Veiw Balance") {
            let res = await inquirer.prompt({
                name: "act", message: "Enter Student Id",
                type: "number",
            });
            sms.veiwBalance(res.act);
        }
        if (user.action == "Pay Fee") {
            let res = await inquirer.prompt([
                {
                    name: "act", message: "Enter Student Id: ",
                    type: "number",
                }, {
                    name: "amount", message: "Enter the Amount: ",
                    type: "number",
                }
            ]);
            sms.payFee(res.act, res.amount);
        }
        if (user.action == "Exit") {
            break;
        }
    }
}
Managment();
async function subjReg() {
    return inquirer.prompt([
        {
            name: "Course_name", message: "Enter Course Name: ",
            type: "input"
        }, { name: "fee", message: "Enter Course Fee: ",
            type: "number"
        }
    ]);
}
