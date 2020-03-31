import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('estudiante');
var btnfilterByName = document.getElementById("button-filterByName");
var btnCreds = document.getElementById("button-filterCreds");
var inputSearchBox = document.getElementById("search-box");
var min = document.getElementById("minimo");
var max = document.getElementById("maximo");
var totalCreditElm = document.getElementById("total-credits");
renderStudentInTable(dataStudent);
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnCreds.onclick = function () { return applyFilterByCreds(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(students) {
    console.log('Desplegando cursos');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.codigo + "</td>\n                            <td>" + student.cedula + "</td>\n                            <td>" + student.edad + "</td>\n                            <td>" + student.direccion + "</td>\n                            <td>" + student.telefono + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCreds() {
    var mini = +min.value;
    var maxi = +max.value;
    clearCoursesInTable();
    var cursos = searchCredits(maxi, mini, dataCourses);
    renderCoursesInTable(cursos);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCredits(max, min, courses) {
    return courses.filter(function (course) { return course.credits <= max && course.credits >= min; });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
