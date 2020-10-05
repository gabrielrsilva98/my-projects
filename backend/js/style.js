let developers = null;
let countDevelopers = null;

window.addEventListener("load", () => {
  doFetch();
  const btnSearch = document.querySelector("#btn-search");
  btnSearch.addEventListener("click", () => {
    const nameValue = document.querySelector("#nameValue").value;
    const radioCondition = document.querySelector(".radioCondition:checked")
      .value;
    const languages = getCheckedBoxes("programmingLanguages");
    if (!nameValue && !languages.length) {
      render(developers);
    } else {
      findContent(developers, nameValue, languages, radioCondition);
    }
  });
});

async function doFetch() {
  const res = await fetch("http://localhost:3001/devs");
  const json = await res.json();
  developers = json.map((dev) => {
    const { name, picture, programmingLanguages } = dev;
    let languages = [];
    for (let i = 0; i < programmingLanguages.length; i++) {
      const element = programmingLanguages[i].id;
      languages.push(element);
    }
    languages = languages.join(" | ");
    return {
      name,
      picture,
      programmingLanguages: languages,
    };
  });
  render(developers);
}

function render(data) {
  const list = document.querySelector("#devs-list");
  list.innerHTML = "";
  const count = document.querySelector("#devs-count");
  count.textContent = `${data.length} registro(s) encontrado(s)`;

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const newDiv = document.createElement("div");
    const newParagraph = document.createElement("p");
    const newParagraph2 = document.createElement("p");
    const newImage = document.createElement("img");

    list.appendChild(newDiv);
    newDiv.classList.add("col-4", "alert", "alert-dark");

    newDiv.appendChild(newImage).src = element.picture;
    newDiv.appendChild(newParagraph);
    newParagraph.textContent = element.name;

    newDiv.appendChild(newParagraph2);
    newParagraph2.textContent = element.programmingLanguages;
  }
}

function findContent(data, nome, languages, condition) {
  function filterDev(data) {
    let validation = false;
    const devName = replaceContent(data.name.toLowerCase()).replace(" ", "");
    const comparator = replaceContent(nome.toLowerCase()).replace(" ", "");
    const languageName = data.programmingLanguages.split(" | ");

    if (condition === "ou") {
      if (languages.length) {
        for (let i = 0; i < languageName.length; i++) {
          const element1 = languageName[i];
          if (languages.includes(element1)) {
            validation = true;
          }
        }
        if (!devName.includes(comparator)) {
          validation = false;
        }
      } else {
        if (devName.includes(comparator)) {
          validation = true;
        }
      }
      return validation;
    }
    if (condition === "e") {
      if (languages.length) {
        if (languages.length === languageName.length) {
          for (let i = 0; i < languageName.length; i++) {
            const element1 = languageName[i];
            if (!languages.includes(element1)) {
              return false;
            }
            else {
                validation = true;
            }
          }
          if (!devName.includes(comparator)) {
            validation = false;
          }
        }
      } else {
        if (devName.includes(comparator)) {
          validation = true;
        }
      }
      return validation;
    }
  }

  const found = data.filter(filterDev);
  render(found);
}

function replaceContent(str) {
  str = str
    .replace(" ", "")
    .replace(/[ÀÁÂÃÄÅ]/, "A")
    .replace(/[àáâãäå]/, "a")
    .replace(/[ÈÉÊË]/, "E")
    .replace(/[èéêë]/, "e")
    .replace(/[ÍÌÎÏ]/, "I")
    .replace(/[íìîï]/, "i")
    .replace(/[ÓÒÔÖÕ]/, "O")
    .replace(/[óòôöõ]/, "o")
    .replace(/[ÚÙÛÜ]/, "U")
    .replace(/[úùûü]/, "u");

  return str;
}

function getCheckedBoxes(chkboxName) {
  var checkboxes = document.getElementsByName(chkboxName);
  var checkboxesChecked = [];
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i].defaultValue);
    }
  }
  return checkboxesChecked;
}
