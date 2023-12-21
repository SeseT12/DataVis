import {showPlot} from "./scatterplot.js"
import {showGenreVinyl} from "./genreVinyl.js";
//import d3 from "d3";

const width = window.innerWidth;//842;
const height = window.innerHeight;//595;
const scaleFactorWidth = window.innerWidth / 842;
const scaleFactorHeight = window.innerHeight / 595;
const marginTop = 80 * scaleFactorHeight;
const marginRight = 200 * scaleFactorWidth;
const marginBottom = 50 * scaleFactorHeight;
const marginLeft = 60 * scaleFactorWidth;


// Create the SVG container.
const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#000000");

const files = ["permanent_wave.csv", "hard_rock.csv", "classic_rock.csv", "album_rock.csv",
                        "dance_pop.csv", "electropop.csv", "poptimism.csv", "post_teen_pop.csv",
                        "latin_hip_hop.csv", "latin_pop.csv", "reggaeton.csv", "tropical.csv",
                        "gangster_rap.csv", "trap.csv", "southern_hip_hop.csv", "hip_hop.csv",
                        "hip_pop.csv", "neo_soul.csv", "new_jack_swing.csv", "urban_contemporary.csv",
                        "big_room.csv", "electro_house.csv", "pop_edm.csv", "progressive_electro_house.csv",
                        ];
const promises = files.map(file => d3.csv(file));

svg.append("text")
    .attr("font-size", "28px")
    .attr("transform", `translate(${width / 2}, ${40 * scaleFactorHeight})`)
    .style("text-anchor", "middle")
    .attr("fill", "#0CDA75")
    .text("Harmony in Data: Unveiling Spotify Song Characteristics")
    .style("font-family", "Montserrat");


Promise.all(promises)
    .then(datasets => {
        console.log("All data loaded successfully");

        const x = d3.scaleUtc()
            .domain([new Date("1962-01-01"), new Date("2021-01-01")])
            .range([marginLeft, width - marginRight]);

        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([height - marginBottom, marginTop]);

        showGenreVinyl(svg, datasets, "", width, height, width - 60 * scaleFactorWidth, height - 60 * scaleFactorHeight, x, y, marginBottom, marginLeft, marginTop, marginRight, width / 2, height / 2 + 30 * scaleFactorHeight, scaleFactorWidth, scaleFactorHeight);
        //showPlot(svg, datasets, "Rock", x, y, height, width, marginBottom, marginLeft, marginTop, marginRight);


    })
    .catch(errors => {
        // Handle errors if any of the promises are rejected
        console.error("Error loading data:", errors);
    });
/*
//const dataPromise = d3.csv("rock_songs_removed@23.csv");

dataPromise.then(data => {
    console.log("Run2");

    // Declare the x (horizontal position) scale.
    const x = d3.scaleUtc()
        .domain([new Date("1962-01-01"), new Date("2021-01-01")])
        .range([marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - marginBottom, marginTop]);

    showPlot(svg, data, x, y, height, width, marginBottom, marginLeft, marginTop, marginRight);
}).catch(error => {
    // Handle errors if the Promise is rejected
    console.error(error);
});
*/
