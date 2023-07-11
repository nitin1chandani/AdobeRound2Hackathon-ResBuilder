// Variable declarations
let templateId = "a";
let currentComponent = 5;

function handleComponent1() {
  const templates = document.querySelectorAll(".template");
  for (let element of templates) {
    element.addEventListener("click", () => {
      if (templateId !== undefined) {
        let temp = document.querySelector(`#${templateId}`);
        temp.classList.remove("active");
      }
      element.classList.add("active");
      templateId = element.getAttribute("id");
    });
  }
}

function handleComponent4() {
  $("#add-skill").click((e) => {
    e.preventDefault();
    if ($("#skills").val() !== "") {
      let newSkill = document.createElement("span");
      newSkill.setAttribute("name", "skills[]");
      newSkill.classList.add("skill");
      newSkill.innerText = $("#skills").val();
      $("#skills").val("");
      $("#show-skills").append(newSkill);
    }
  });
}

function handleComponent5() {
  $("#add-education").click((e) => {
    e.preventDefault();
    let section = document.querySelector(".education");
    section.children[0].classList.remove("invisible-component");
    let element = document.createElement("div");
    element.innerHTML = section.innerHTML;
    element.classList.add("education");
    section.insertAdjacentElement("beforebegin", element);

    $(element.children[0]).click((e) => {
      e.target.parentElement.parentElement.remove();
      if ($(".education").length === 1) {
        $(".education #delete").addClass("invisible-component");
      }
    });
  });

  $("#delete").click((e) => {
    console.log(e.target);
    e.target.parentElement.parentElement.remove();
    if ($(".education").length === 1) {
      $(".education #delete").addClass("invisible-component");
    }
  });
}

function handleComponent6() {
  $("#add-experience").click((e) => {
    e.preventDefault();
    let section = document.querySelector(".experience");
    let element = document.createElement("div");
    element.innerHTML = section.innerHTML;
    element.classList.add("experience");
    section.insertAdjacentElement("beforebegin", element);
  });
}

function handleComponent7() {
  $("#add-achievement").click((e) => {
    e.preventDefault();
    let section = document.querySelector(".achievement");
    let element = document.createElement("div");
    element.innerHTML = section.innerHTML;
    element.classList.add("achievement");
    section.insertAdjacentElement("beforebegin", element);
  });
}

// Other functions and event handlers...

// Load components and initialize
for (let componentIndex = 1; componentIndex <= 7; componentIndex++) {
  $(`#component${componentIndex}`).load(
    `/Components/component${componentIndex}.html`,
    () => {
      // Add appropriate classes and event handlers for each component
      if (componentIndex !== currentComponent) {
        $(`#component${componentIndex}`).addClass("invisible-component");
      }
      if (componentIndex === 1) {
        handleComponent1();
        $("#prev").addClass("invisible-button");
      } else if (componentIndex === 4) {
        handleComponent4();
      } else if (componentIndex === 5) {
        handleComponent5();
      } else if (componentIndex === 6) {
        handleComponent6();
      } else if (componentIndex === 7) {
        handleComponent7();
      }
    }
  );
}
