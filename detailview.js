import {showGenreVinyl} from "./genreVinyl.js";

export function showDetailView(svg, data, x, y, xCenter, yCenter, scaleFactorWidth, scaleFactorHeight){
    const lineGenerator = d3.line()
        .x(d => d.x)
        .y(d => d.y);

    const subgenreColors = {"permanent wave" : "red", "hard rock" : "green", "album rock" : "blue", "classic rock" : "yellow"};
    svg.append("path")
        .attr("d", lineGenerator(getHeptagonVertices(xCenter, yCenter, 12 * scaleFactorWidth)))
        .attr("stroke", "black")
        .attr("fill", "#0CDA75")
        .attr("stroke", "#ffffff")
        .attr("class", "detail-view");

    svg.append("path")
        .attr("d", lineGenerator(getHeptagonVertices(xCenter, yCenter, 30 * scaleFactorWidth)))
        .attr("stroke", "black")
        .attr("class", "detail-view")
        .attr("stroke", "#ffffff")
        .attr("fill", "transparent");

    const edgeHeptagonVertices = getHeptagonVertices(xCenter, yCenter, 45 * scaleFactorWidth);
    svg.append("path")
        .attr("d", lineGenerator(edgeHeptagonVertices))
        .attr("stroke", "black")
        .attr("class", "detail-view")
        .attr("fill", "transparent")
        .attr("stroke", "#ffffff")
        .attr("id", "detail-active");

    svg.append("text")
        .attr("class", "detail-view text-label")
        .attr("x", xCenter)
        .attr("y", yCenter - 80 * scaleFactorWidth)
        .attr("stroke", "#0CDA75")
        .attr("font-size", `${10 * scaleFactorWidth}px`)
        .attr("text-anchor", "middle")
        .text(data.track_name)
        .each(function(d) {
            const textWidth = this.getComputedTextLength();
            const maxWidthThreshold = 150;
            if (textWidth > maxWidthThreshold) {
                d3.select(this)
                    .attr("textLength", maxWidthThreshold)
                    .attr("lengthAdjust", "spacingAndGlyphs");
            }
        });

    svg.append("text")
        .attr("class", "detail-view text-label")
        .attr("x", xCenter)
        .attr("y", yCenter - 70 * scaleFactorWidth)
        .attr("stroke", "#0CDA75")
        .attr("text-anchor", "middle")
        .attr("font-size", `${10 * scaleFactorWidth}px`)
        .text(data.track_album_name)
        .each(function(d) {
            const textWidth = this.getComputedTextLength();
            const maxWidthThreshold = 150;
            if (textWidth > maxWidthThreshold) {
                d3.select(this)
                    .attr("textLength", maxWidthThreshold)
                    .attr("lengthAdjust", "spacingAndGlyphs");
            }
        });

    svg.append("text")
        .attr("class", "detail-view text-label")
        .attr("x", xCenter)
        .attr("y", yCenter - 60 * scaleFactorWidth)
        .attr("stroke", "#0CDA75")
        .attr("text-anchor", "middle")
        .attr("font-size", `${10 * scaleFactorWidth}px`)
        .text(data.track_artist)
        .each(function(d) {
            const textWidth = this.getComputedTextLength();
            const maxWidthThreshold = 150;
            if (textWidth > maxWidthThreshold) {
                d3.select(this)
                    .attr("textLength", maxWidthThreshold)
                    .attr("lengthAdjust", "spacingAndGlyphs");
            }
        });

    const labels = ["danceability", "energy", "speechiness", "acousticness", "instrumentalness", "liveness", "valence"];
    const textAngles = [25.71, 77.14, 128.57, 0, 51.43, 102.85, 154.3];
    let dx = [-20, -20, -20, 20, 20, 20, 20];
    dx = dx.map(value => value * scaleFactorWidth);
    let dy = [8, 8, 8, -3 , -3, -3, -3];
    dy = dy.map(value => value * scaleFactorHeight);
    let fontSize = [8, 8, 8, 6, 6, 8, 8];
    fontSize = fontSize.map(value => `${value * scaleFactorWidth}px`)
    for(let i = 0; i < edgeHeptagonVertices.length - 1; i ++){
        svg.append("text")
            .attr("class", "detail-view")
            .attr("x", edgeHeptagonVertices[i].x)
            .attr("y", edgeHeptagonVertices[i].y)
            .attr("dx", dx[i])
            .attr("dy", dy[i]) // Adjust the vertical position of the text
            .attr("text-anchor", "middle") // Center the text
            .style("font-size", fontSize[i])
            .style("font-family", "'Roboto', sans-serif")
            .style("font-weight", 100)
            .attr("transform", `rotate(${(-90 + textAngles[i])}, ${edgeHeptagonVertices[i].x}, ${edgeHeptagonVertices[i].y})`)
            .text(labels[i]);
    }

    const radiusConverter = d3.scaleLinear().domain([0, 1.0]).range([12 * scaleFactorWidth, 45 * scaleFactorWidth]);
    labels.forEach((label, index) => {
       const coneVertices = getConeVertices(xCenter, yCenter, radiusConverter(data[label]), index, scaleFactorWidth);
        const fillColors = ["#006400", "#228B22", "#00FF00", "#00FF7F"];
        svg.append("path")
            .attr("class", "detail-view")
            .attr("d", lineGenerator(coneVertices))
            .attr("fill", "#00FF00"/*fillColors[index % 4]*/)
            .attr("stroke", "white");
    });
}

function getHeptagonVertices(xCenter, yCenter, radius){
    const heptagonVertices = Array.from({ length: 7 }).map((_, index) => {
        const angle = (index / 7) * (2 * Math.PI);
        const x = xCenter + radius * Math.cos(angle);
        const y = yCenter + radius * Math.sin(angle);
        return { x, y };
    });
    heptagonVertices.push(heptagonVertices[0]);

    return heptagonVertices
}

function getConeVertices(xCenter, yCenter, radius, section, scaleFactor){
    const coneVertices = [];
    coneVertices.push(getConeVertex(xCenter, yCenter, 12 * scaleFactor, section));
    coneVertices.push(getConeVertex(xCenter, yCenter, 12 * scaleFactor, (section + 1 % 7)));
    coneVertices.push(getConeVertex(xCenter, yCenter, radius, (section + 1) % 7));
    coneVertices.push(getConeVertex(xCenter, yCenter, radius, section));
    coneVertices.push(getConeVertex(xCenter, yCenter, 12 * scaleFactor, section));

    return coneVertices;
}

function getConeVertex(xCenter, yCenter, radius, section){
    const angle = (section / 7) * (2 * Math.PI);
    const x = xCenter + radius * Math.cos(angle);
    const y = yCenter + radius * Math.sin(angle);
    return {x, y};
}