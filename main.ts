import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('estudiante')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnCreds: HTMLElement = document.getElementById("button-filterCreds")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const min: HTMLInputElement = <HTMLInputElement>document.getElementById("minimo")!;
const max: HTMLInputElement = <HTMLInputElement>document.getElementById("maximo")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


renderStudentInTable(dataStudent);
btnfilterByName.onclick = () => applyFilterByName();
btnCreds.onclick = () => applyFilterByCreds();
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
    console.log('Desplegando cursos');
    courses.forEach((course) => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
        coursesTbody.appendChild(trElement);
    });
}


function renderStudentInTable(students: Student[]): void {
    console.log('Desplegando cursos');
    students.forEach((student) => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${student.codigo}</td>
                            <td>${student.cedula}</td>
                            <td>${student.edad}</td>
                            <td>${student.direccion}</td>
                            <td>${student.telefono}</td>`;        
        studentTbody.appendChild(trElement);
    });
}

function applyFilterByName() {
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function applyFilterByCreds()
{
    let mini = +min.value;
    let maxi = +max.value;
    clearCoursesInTable();
    let cursos : Course[] = searchCredits(maxi,mini,dataCourses);
    renderCoursesInTable(cursos);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter(c =>
        c.name.match(nameKey));
}

function searchCredits(max:number, min:number, courses : Course[]){
    return courses.filter(course => course.credits<=max && course.credits >=min);
}

function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
}

function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);

        }
    }
}