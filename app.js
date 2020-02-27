import * as Auth from "./modules/auth/auth.mjs";

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
let weightData = [];

// Filter for finding the boxurl element
const isElement = element => {
  return element.indexOf("boxurl") > -1 ? element : "";
};

// Filter for finding the url located in value attribute
const isURL = element => {
  return element.indexOf("value") > -1 ? element : "";
};

const createWeight = weight => {
  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(weight),
  }).then(response => {
    if (response.ok) {
      updateChart();
    }
  });
};

const updateWeightData = async () => {
  // Get the saved data from the DB
  await fetch(url + "?limit=90&sort=date")
    .then(response => {
      return response.json();
    })
    .then(data => {
      weightData = data;
    });
};

const updateChart = async () => {
  // Check if there is already saved data
  await updateWeightData();
  if (weightData) {
    let labelsDataSet = [];
    let weightDataSet = [];
    let muscleDataSet = [];
    weightData.forEach((weight, index) => {
      labelsDataSet.push(weight.date);
      weightDataSet.push(weight.kilograms);

      // Calculate muscle value if 0
      let muscleWeight = weight.muscle;

      // Get the previous muscle weight if 0
      if ((muscleWeight === 0) & !(index === 0)) {
        muscleWeight = weightData[index - 1].muscle;
      }
      muscleDataSet.push(muscleWeight);
    });

    // Setup Chart
    var container = document.getElementById("chart-area");
    container.innerHTML = null;
    var data = {
      categories: labelsDataSet,
      series: [
        {
          name: "Weight",
          data: weightDataSet,
        },
        {
          name: "Muscle",
          data: muscleDataSet,
        },
      ],
    };
    var options = {
      chart: {
        width: 1160,
        height: 540,
        title: "Weight Tracking",
      },
      yAxis: {
        title: "Kilograms",
      },
      xAxis: {
        title: "Date",
        pointOnColumn: true,
        dateFormat: "MMM",
        tickInterval: "auto",
      },
      series: {
        showDot: false,
        zoomable: true,
      },
      tooltip: {
        suffix: "kg",
      },
    };
    var theme = {
      series: {
        colors: [
          "#76b852",
          "#458a3f",
          "#295ba0",
          "#2a4175",
          "#289399",
          "#289399",
          "#617178",
          "#8a9a9a",
          "#516f7d",
          "#dddddd",
        ],
      },
    };
    // For apply theme
    tui.chart.registerTheme("myTheme", theme);
    options.theme = "myTheme";
    tui.chart.lineChart(container, data, options);
  } else {
    return;
  }
};

// Main App
const app = async () => {
  if (url === null) {
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
        localStorage.setItem("url", boxurl);
      });
  }
  updateChart();
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

      createWeight(weight);

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

const buttonHandler = e => {
  if (e.target.id === "btn-login") {
    Auth.login();
  }

  if (e.target.id === "btn-logout") {
    Auth.logout();
  }
};

document.addEventListener("click", buttonHandler), false;
