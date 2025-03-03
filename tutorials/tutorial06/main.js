// global variables tracking the user's preferences:
let searchTerm = "";
let openOnly = false;

const search = (ev) => {
    ev.preventDefault(); // overrides default button action

    // Set user's preferences (global variables) from the DOM:
    searchTerm = document.querySelector("#search_term").value;
    openOnly = document.querySelector("#is_open").checked;

    // Invoke the show matching courses function
    showMatchingCourses();
};

// Part 1.1a
const isClassFull = (course) => {
    // modify this to accurately apply the filter:
    const full = course.EnrollmentMax <= course.EnrollmentCurrent;
    return full;
};

const isClassNotFull = (course) => {
  const empty = !isClassFull(course)
  return empty;
};

// Part 1.1b
const doesTermMatch = (course) => {
    // modify this to accurately apply the filter:
    const title = course.Title;

    return title.toLowerCase().includes(searchTerm.toLowerCase());
};

// Part 1.2
const dataToHTML = (course) => {
    // modify this to be more detailed
    let classStatus = "";
    if (isClassFull(course)) {
      classStatus = `<i class="fa-solid fa-circle-xmark"></i> Closed `;
    } else {
    classStatus = `<i class="fa-solid fa-circle-check"></i> Open`;
  }

  let seatsAvailable = course.EnrollmentMax - course.EnrollmentCurrent;
  if (seatsAvailable < 0) {
    seatsAvailable = 0;
  }
    
   return ` 
        <section class="course">
            <h2>${course.Code}: ${course.Title}</h2>
            <p>
                ${classStatus}  &bull; ${course.CRN} &bull; Seats Available: ${seatsAvailable}
            </p>
            <p>
                ${course.Days || "TBD"} &bull; ${course.Location.FullLocation || "TBD"} &bull; ${course.Hours} credit hour(s)
            </p>
            <p><strong>${course.Instructors[0].Name}</strong></p>
        </section>
    `;
   /* return `
        <section class="course">
            ${course.Code}
        </section>
    `;*/
};

// Part 2
const showMatchingCourses = () => {
    console.log(`Search term: ${searchTerm}`);
    console.log(`Only show open classes: ${openOnly}`);
    console.log(`Course data:`, courseList);

    const search = searchTerm.toLowerCase();

    // output all of the matching courses to the screen:

    const container = document.querySelector(".courses");
    container.innerHTML = null;

    let matches = courseList.filter(doesTermMatch);
    
    if (openOnly) {
      matches = matches.filter(isClassNotFull)
      
    }
  
    matches.forEach(course => {
      const html = dataToHTML(course);
      
      container.insertAdjacentHTML("beforeend", html);
    });

};
