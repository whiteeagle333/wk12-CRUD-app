/* CRUDE APP CRUD is the acronym for CREATE, READ, UPDATE and DELETE.*/

/* Setting up JSON server*/
console.log(`-------------------------- 
Part 1: Setup your JSON server`);

/**
 * Documentation: https://www.npmjs.com/package/json-server#getting-started
 *  npm install -g json-server
 *  json-server --watch db.json
    Your console should look something like this:

 *         Resources
 *         http://localhost:3000/studentRoster
 * 
 *   Above is the URL we'll use for our CRUD operations.
 *
 * const declaration for your URL endpoint
 */

const STUDENT_ROSTER_URL = "http://localhost:3000/studentRoster";

/* HTTP Verb: GET -*/
console.log(
  `-------------------------- 
Part 2: GET and displaying the information`
);

/**
 * Step 1: Use $.get(api_url_here).then(data => console.log(data)) to check if
 *         our GET is set up correctly. You should be logging an array of objects.
 *
 * Step 2: Instead of logging, loop over data and add your information to the DOM.
 */

$.get(STUDENT_ROSTER_URL).then((data) =>
  data.map((student) => {
    $("tbody").append(
      $(`
    <tr>
      <td>${student.id}</td>
      <td>${student.fullName}</td>
      <td>${student.researchAssignment}</td>
      <td>
        <button onclick="deleteUser(${student.id})"}>🗑</button>
      </td>
    </tr>`)
    );
  })
);

/*- HTTP Verb: POST */
console.log(
  `-------------------------- 
Part 3: POST and adding new students`
);

/* form in  HTML to post includes label& inputs for each new student and a button to submit.
 *          it has event listener in the code below to the <button> element
 *          a log 'pls work' on click, just to make sure it's working.
 *
 *          jQuery's $.post() method.
            argument as a URL, the second argument is an object containing
 *          the data to pass in. Using jquery to target the input values.
            the button posts a new user on click.
  */

$("#submitStudent").click(function () {
  $.post(STUDENT_ROSTER_URL, {
    fullName: $("#newName").val(),
    researchAssignment: $("#newAssignment").val(),
  });
});

/* HTTP Verb: DELETE-*/
console.log(
  `-------------------------- 
Part 4: DELETE and deleting individual students`
);

/**
 *         created  a new <td> element: a delete button for every student.
 *         added a lil' ASCII trash bin: 🗑
 *         On the button element we just added, give it a property of onclick=""
 *         Inside the "", and gave it a function to do.
 *          Created a function called "deleteUser" below, that takes in an id as a parameter.
 *         Inside the code block, we used jquery/ajax to delete a user.
 *
 *         We aded the deleteUser() function inside our
 *         onclick="" on the delete button.
 *         we added the  ID to the end of the ajax URL in the deleteUser() function.
 *
 */

function deleteUser(id) {
  $.ajax(`${STUDENT_ROSTER_URL}/${id}`, {
    type: "DELETE",
  });
}

/*HTTP Verb: UPDATE -*/
console.log(
  `-------------------------- 
Part 4: PUT and updating the information`
);

/**
           Created a  function called updateUser(){}
 *         Created a form in our HTML to update a student's name/assignment by id.
 *         need put an  input values/labels for id/studentName/researchAssignment
 *
         : Added a new header for students ID id in our table.
 *         Set up $.ajax() for 'PUT'
 *         We need two key/value pairs: method and data
 *
 *         we  put in new id/name/research assignment by id, and pass those values
 *         into the appropriate places.
 *
 *         Added an event listener after the updateUser() function to
 *         do the updateUser function on click.
*/

function updateUser() {
  id = $("#updateId").val();

  $.ajax(`${STUDENT_ROSTER_URL}/${id}`, {
    method: "PUT",
    data: {
      fullName: $("#updateName").val(),
      researchAssignment: $("#updateAssignment").val(),
    },
  });
}

$("#updateStudent").click(updateUser);

console.log(`-----------Finished------------`);
