console.log("Welcome to Local Storage");

const jsonbox = "https://jsonbox.io/";

// https://gomakethings.com/how-to-update-localstorage-with-vanilla-javascript/
const addWeight = document.querySelector("#add-weight");
const weightList = document.querySelector("#weight-list");

// Weight Inputs
const weightDate = document.querySelector("#weight-date");
const weightKilograms = document.querySelector("#weight-kilograms");
const fatPercent = document.querySelector("#fat-perc");
const weightBone = document.querySelector("#weight-bone");
const waterPercent = document.querySelector("#water-perc");
const weightMuscle = document.querySelector("#weight-muscle");
const bellyIndex = document.querySelector("#belly-index");
let url = localStorage.getItem("url");

// Filter for finding the boxurl element
const isElement = element => {
  return element.indexOf("boxurl") > -1 ? element : "";
};

// Filter for finding the url located in value attribute
const isURL = element => {
  return element.indexOf("value") > -1 ? element : "";
};

const updateDB = weight => {
  console.log(`URL: ${url}`);
  console.log(`Inserting into DB`);
  console.log(weight);

  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(weight),
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
};

// Main App
const app = async () => {
  console.log(`URL: ${url}`);
  if (url === null) {
    console.log(`Fetching JSONBox URL`);

    // If the url is empty get a new jsonbox for saving data
    await fetch(jsonbox)
      .then(response => {
        return response.text();
      })
      .then(data => {
        // Scrape the website for a new jsonbox url
        const html = data.split("<"); // create an array of all elements
        const element = html.find(isElement); // find the boxurl element
        const boxurl = element
          .toString()
          .split(" ") // split by spaces
          .find(isURL) // find the url in the value attribute
          .toString()
          .split('"')[1]; // split the string with quotes and take the second value
        console.log(`URL set ${boxurl}`);
        localStorage.setItem("url", boxurl);
      });
  }
};

app();

addWeight.addEventListener(
  "submit",
  function(event) {
    try {
      // Don't submit the form
      event.preventDefault();

      if (weightKilograms.value <= 0) {
        alert("Weight is required");
        return;
      }

      const weight = {
        date: weightDate.value,
        kilograms: weightKilograms.value,
        fatPercent: fatPercent.value ? fatPercent.value : 0,
        bone: weightBone.value ? weightBone.value : 0,
        waterPercent: waterPercent.value ? waterPercent.value : 0,
        muscle: weightMuscle.value ? weightMuscle.value : 0,
        bellyIndex: bellyIndex.value ? bellyIndex.value : 0,
      };
      // console.log("Weight", weight);

      //   // Add value to the array
      //   let currentWeightHistory = localStorage.getItem("weightValues")
      //     ? JSON.parse(localStorage.getItem("weightValues"))
      //     : [];
      //   currentWeightHistory.push(weight);
      //   currentWeightHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
      //   localStorage.setItem(
      //     "weightValues",
      //     JSON.stringify(currentWeightHistory),
      //   );
      //   console.table(currentWeightHistory);

      updateDB(weight);

      // Update the chart
      updateChart();

      // Reset Values
      weightDate.value = "";
      weightKilograms.value = "";
      fatPercent.value = "";
      weightBone.value = "";
      waterPercent.value = "";
      weightMuscle.value = "";
      bellyIndex.value = "";
    } catch (err) {
      console.log(err);
    }
  },
  false,
);

const updateChart = () => {
  // Check if there is already saved data
  let saved = localStorage.getItem("weightValues");
  let weightHistory = [];
  if (saved) {
    weightHistory = JSON.parse(saved);
  } else {
    return;
  }

  console.debug("Updating Chart");
  const svg = document.querySelector(".line-chart");
  let labelsDataSet = [];
  let weightDataSet = [];
  let muscleDataSet = [];
  weightHistory.forEach((weight, index) => {
    labelsDataSet.push(weight.date);
    weightDataSet.push(weight.kilograms);

    // Calculate muscle value if 0
    let muscleWeight = weight.muscle;

    // Get the previous muscle weight if 0
    if ((muscleWeight === 0) & !(index === 0)) {
      muscleWeight = weightHistory[index - 1].muscle;
    }
    muscleDataSet.push(muscleWeight);
  });

  const lineChart = new chartXkcd.Line(svg, {
    title: "Weight over time", // optional
    xLabel: "Date", // optional
    yLabel: "Weight (kg)", // optional
    data: {
      labels: labelsDataSet,
      datasets: [
        {
          label: "Weight ",
          data: weightDataSet,
        },
        {
          label: "Muscle ",
          data: muscleDataSet,
        },
      ],
    },
    options: {
      // optional
      yTickCount: 10,
      xTickCount: 5,
      legendPosition: chartXkcd.config.positionType.upRight,
    },
  });
};

updateChart();
