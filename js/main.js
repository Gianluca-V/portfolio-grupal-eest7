document.addEventListener("DOMContentLoaded", () => {
    (fetchData = async () => {
        await fetch("../data.json")
            .then(response => response.json())
            .then(res => {
                generateStudent(res);
            })
            .catch(err => {
                console.log(`An error ocurred ${err}`)
            })
    })()

    const generateStudent = (data) => {
        const studentsContainer = document.querySelector(".students__container");

        console.log(data)
        data.forEach(student => {
            const studentElement = document.createElement("div")
            studentElement.classList.add("students__student");
            const studentName = document.createElement("h3");
            studentName.classList.add("students__name");
            studentName.textContent = `${student.name}, ${student.age}`;

            const studentAge = document.createElement("div")
            studentAge.classList.add("students__age");
            studentAge.textContent = student.age;

            const studentDescription = document.createElement("div");
            studentDescription.classList.add("students__description");
            studentDescription.textContent = student.description;

            studentElement.appendChild(studentName);
            studentElement.appendChild(studentDescription);
            studentsContainer.appendChild(studentElement);

            studentElement.addEventListener("click", () => {
                updateDialog(student);
            });
        });
    }

})

const updateDialog = (student) => {
    const dialog = document.querySelector(".students__projects");
    dialog.innerHTML = "";
    dialog.showModal();
    student.projects.forEach(project => {
        const projectElement = document.createElement("div")
        projectElement.classList.add("students__project");

        const projectImg = document.createElement("img")
        projectImg.classList.add("project__img");
        projectImg.src = project.img;
        projectImg.alt = project.name;

        const projectName = document.createElement("h3")
        projectName.classList.add("project__name");
        projectName.textContent = project.name;

        const projectDesc = document.createElement("p")
        projectDesc.classList.add("project__description");
        projectDesc.textContent = project.desc;

        projectElement.appendChild(projectName);
        projectElement.appendChild(projectDesc);
        projectElement.appendChild(projectImg);
        dialog.appendChild(projectElement);
    });
    const closeElement = document.createElement("div");
    closeElement.classList.add("project__close");
    closeElement.addEventListener("click", () => {
        dialog.close();
    })

    closeElement.textContent = "X";
    dialog.appendChild(closeElement);
}
