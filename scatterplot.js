import {showDetailView} from "./detailview.js";
import {showGenreVinyl} from "./genreVinyl.js";
import {showAdditionalInfo} from "./additionalInfo.js";

export function showPlot(svg, datasets, genre, x, y, height, width, marginBottom, marginLeft, marginTop, marginRight, scaleFactorWidth, scaleFactorHeight){
    svg.append("text")
        .attr("font-size", "24px")
        .attr("transform", `translate(${width / 2 - 70 * scaleFactorWidth}, ${55 * scaleFactorHeight}) scale(${scaleFactorWidth})`)
        .style("text-anchor", "middle")
        .attr("fill", "#0CDA75")
        .attr("class", "title")
        .text("Harmony in Data: Unveiling Spotify Song Characteristics")
        .style("font-family", "Montserrat");

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .attr("class", "axis")
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("transform", `translate(${(width - marginRight - marginLeft)/ 2 + marginLeft}, ${height - marginTop + 65 * scaleFactorHeight})`)
        .style("text-anchor", "middle")
        .attr("font-size", `${16 * scaleFactorWidth}px`)
        .text("Year of Song Release");

    // Add the y-axis.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .attr("class", "axis")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", `rotate(${-90})`)
        .attr("x", -((height - marginTop - marginBottom) / 2 + marginBottom))
        .attr("y", 25 * scaleFactorWidth)
        .attr("font-size", `${16 * scaleFactorWidth}px`)
        .style("text-anchor", "middle")
        .text("Song Popularity");

    const subgenres = {"Rock" : ["Permanent Wave", "Hard Rock", "Classic Rock", "Album Rock"],
                            "Pop" : ["Dance Pop", "Electropop", "Poptimism", "Post Teen Pop"],
                            "Latin" : ["Latin Hip Hop", "Latin Pop", "Reggaeton", "Tropical"],
                            "Rap" : ["Ganster Rap", "Trap", "Southern Hip Hop", "Hip Hop"],
                            "R&B" : ["Hip Pop", "Neo Soul", "New Jack Swing", "Urban Contemporary"],
                            "EDM" : ["Big Room", "Electro House", "Pop EDM", "Progressive Electro House"],}

    svg.append("text")
        .attr("transform", `translate(${750 * scaleFactorWidth}, ${220 * scaleFactorHeight}) scale(${scaleFactorWidth})`)
        .attr("class", "subgenres-legend")
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Subgenres");

    svg.append("line")
        .attr("class", "subgenres-legend")
        .attr("x1", `${660 * scaleFactorWidth}`)
        .attr("y1", `${227 * scaleFactorHeight}`)
        .attr("x2", `${840 * scaleFactorWidth}`)
        .attr("y2", `${227 * scaleFactorHeight}`)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1 * scaleFactorWidth);

    svg.append("text")
        .attr("class", "subgenres-legend")
        .attr("transform", `translate(${(760 * scaleFactorWidth)}, ${250 * scaleFactorHeight}) scale(${scaleFactorWidth})`)
        .style("text-anchor", "end")
        .style("font-size", "14px")
        .text(subgenres[genre][0]);

    svg.append("circle")
        .attr("class", "subgenres-legend")
        .attr("cx", 790 * scaleFactorWidth)
        .attr("cy", 245 * scaleFactorHeight)
        .attr("r", 7 * scaleFactorWidth)
        .attr("class", "data-point");

    svg.append("text")
        .attr("class", "subgenres-legend")
        .attr("transform", `translate(${760 * scaleFactorWidth}, ${275 * scaleFactorHeight}) scale(${scaleFactorWidth})`)
        .style("text-anchor", "end")
        .style("font-size", "14px")
        .text(subgenres[genre][1]);

    svg.append("path")
        .attr("class", "subgenres-legend")
        .attr("d", d3.symbol(d3.symbolSquare).size(180 * scaleFactorWidth))
        .attr("transform",  `translate(${790 * scaleFactorWidth}, ${270 * scaleFactorHeight})`)
        .attr("class", "data-point");

    svg.append("text")
        .attr("class", "subgenres-legend")
        .attr("transform", `translate(${760 * scaleFactorWidth}, ${300 * scaleFactorHeight}) scale(${scaleFactorWidth})`)
        .style("text-anchor", "end")
        .style("font-size", "14px")
        .text(subgenres[genre][2]);

    svg.append("path")
        .attr("class", "subgenres-legend")
        .attr("d", d3.symbol(d3.symbolTriangle).size(130 * scaleFactorWidth))
        .attr("transform",  `translate(${790 * scaleFactorWidth}, ${295 * scaleFactorHeight})`)
        .attr("class", "data-point");

    svg.append("text")
        .attr("class", "subgenres-legend")
        .attr("transform", `translate(${760 * scaleFactorWidth}, ${325 * scaleFactorHeight}) scale(${scaleFactorWidth})`)
        .style("text-anchor", "end")
        .style("font-size", "14px")
        .text(subgenres[genre][3])
        .each(function(d) {
            const textWidth = this.getComputedTextLength();
            const maxWidthThreshold = 100 * scaleFactorWidth;
            if (textWidth > maxWidthThreshold) {
                d3.select(this)
                    .attr("textLength", maxWidthThreshold)
                    .attr("lengthAdjust", "spacingAndGlyphs");
            }
        });

    svg.append("path")
        .attr("class", "subgenres-legend")
        .attr("d", d3.symbol(d3.symbolStar).size(130 * scaleFactorWidth))
        .attr("transform",  `translate(${790 * scaleFactorWidth}, ${320 * scaleFactorHeight})`)
        .attr("class", "data-point");

    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    const subgenreColors = {"permanent wave" : "#006400", "hard rock" : "#228B22", "album rock" : "#00FF00", "classic rock" : "#00FF7F"};
    //const shapes = ["circle", "rect", "triangle"]
    const genreDatasetIndices = {"Pop" : 1, "Rock" : 0, "Latin" : 2, "Rap" : 3, "R&B" : 4, "EDM" : 5};
    const genreDatasets = datasets.slice(genreDatasetIndices[genre] * 4, genreDatasetIndices[genre] * 4 + 4);
    genreDatasets.forEach((data, index) => {
        if(index === 0){
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => x(new Date(d.track_album_release_date)))
                .attr("cy", d => y(d.track_popularity))
                .attr("r", 5 * scaleFactorWidth)  // radius of the circle
                .attr("class", "data-point")
                .on('click', function (event, data) {
                    shapeClick(data, svg, x, y, scaleFactorWidth, scaleFactorHeight);
                })
                .on("mouseover", (event, d) => {
                    showTooltip(event, d, tooltip);
                })
                .on("mouseout", () => {
                    hideTooltip(tooltip);
                });
        }
        if(index === 1)
            addRectangles(data, svg, x, y, tooltip, scaleFactorWidth, scaleFactorHeight);
        if(index === 2)
            addTriangles(data, svg, x, y, tooltip, scaleFactorWidth, scaleFactorHeight);
        if(index === 3)
            addStars(data, svg, x, y, tooltip, scaleFactorWidth, scaleFactorHeight);
    })

    showGenreVinyl(svg, datasets, genre, width, height,150 * scaleFactorWidth, 150 * scaleFactorHeight, x, y, marginBottom, marginLeft, marginTop, marginRight, (width - marginLeft - 38 * scaleFactorWidth), height / 2 - (marginTop + 110 * scaleFactorHeight), scaleFactorWidth, scaleFactorHeight);
    showAdditionalInfo(svg, null, scaleFactorWidth, scaleFactorHeight);
}

function addRectangles(data, svg, x , y, tooltip, scaleFactorWidth, scaleFactorHeight) {
    svg.selectAll("rectangle")
        .data(data)
        .enter()
        .append("path")
        .attr("d", d3.symbol(d3.symbolSquare).size(64 * scaleFactorWidth))
        .attr("transform", d => `translate(${x(new Date(d.track_album_release_date))},${y(d.track_popularity)})`)
        .attr("class", "data-point")
        .on('click', function (event, data) {
            shapeClick(data, svg, x, y, scaleFactorWidth, scaleFactorHeight);
        })
        .on("mouseover", (event, d) => {
            showTooltip(event, d, tooltip);
        })
        .on("mouseout", () => {
            hideTooltip(tooltip);
        });
}

function addTriangles(data, svg, x, y, tooltip, scaleFactorWidth, scaleFactorHeight) {
    svg.selectAll("triangle")
        .data(data)
        .enter()
        .append("path")
        .attr("d", d3.symbol(d3.symbolTriangle).size(64 * scaleFactorWidth))
        .attr("transform", d => `translate(${x(new Date(d.track_album_release_date))},${y(d.track_popularity)})`)
        .attr("class", "data-point")
        .on('click', function (event, data) {
            shapeClick(data, svg, x, y, scaleFactorWidth, scaleFactorHeight);
        })
        .on("mouseover", (event, d) => {
            showTooltip(event, d, tooltip);
        })
        .on("mouseout", () => {
            hideTooltip(tooltip);
        });
}

function addStars(data, svg, x, y, tooltip, scaleFactorWidth, scaleFactorHeight) {
    svg.selectAll("star")
        .data(data)
        .enter()
        .append("path")
        .attr("d", d3.symbol(d3.symbolStar).size(64 * scaleFactorWidth))
        .attr("transform", d => `translate(${x(new Date(d.track_album_release_date))},${y(d.track_popularity)})`)
        .attr("class", "data-point")
        .on('click', function (event, data) {
            shapeClick(data, svg, x, y, scaleFactorWidth, scaleFactorHeight);
        })
        .on("mouseover", (event, d) => {
            showTooltip(event, d, tooltip);
        })
        .on("mouseout", () => {
            hideTooltip(tooltip);
        });
}

function shapeClick(data, svg, x, y, scaleFactorWidth, scaleFactorHeight){
    d3.selectAll(".data-point").style("visibility", "hidden");

    showDetailView(svg, data, x, y, x(new Date(data.track_album_release_date)), y(data.track_popularity), scaleFactorWidth, scaleFactorHeight);
    showAdditionalInfo(svg, data, scaleFactorWidth, scaleFactorHeight);
    d3.selectAll('.genre-vinyl').style("visibility", "hidden");
    d3.selectAll('.subgenres-legend').style("visibility", "hidden");
    d3.selectAll('.title').style("visibility", "hidden");
    d3.select("#detail-active").on("mouseleave", function(){
        d3.selectAll(".data-point").style("visibility", "visible");
        d3.selectAll('.detail-view').remove();
        d3.selectAll('.genre-vinyl').style("visibility", "visible");
        d3.selectAll('.subgenres-legend').style("visibility", "visible");
        d3.selectAll('.title').style("visibility", "visible");
        showAdditionalInfo(svg, null, scaleFactorWidth, scaleFactorHeight);
    });
}

function showTooltip(event, d, tooltip){
    const tooltipX = event.pageX + 10;
    const tooltipY = event.pageY - 10;
    tooltip.transition()
        .duration(100)  // Faster appearance
        .style("opacity", .9)
        .style("left", `${tooltipX}px`)
        .style("top", `${tooltipY}px`);
    tooltip.html(`${d.track_name}`);
}

function hideTooltip(tooltip){
    tooltip.transition()
        .duration(500)
        .style("opacity", 0);
}