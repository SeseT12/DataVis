import {showPlot} from "./scatterplot.js";

export function showGenreVinyl(svg, datasets, currentGenre, width, height, vinylWidth, vinylHeight, x, y, marginBottom, marginLeft, marginTop, marginRight, discCenterX, discCenterY, scaleFactorWidth, scaleFactorHeight){
    const data = [
        "Rock", "Pop", "Latin", "Rap", "R&B", "EDM"
    ];

    // Calculate angles for each segment
    const totalSegments = data.length;
    const angle = 2 * Math.PI / totalSegments;

    // Draw vinyl disc segments
    const outerRadius = Math.min(vinylWidth, vinylHeight) / 2 - 20; // Adjusted outer radius
    const innerRadius = outerRadius * 0.2; // Adjusted inner hole size

    svg.append("circle")
        .attr("cx", discCenterX)
        .attr("cy", discCenterY)
        .attr("r", outerRadius)
        .attr("class", "genre-vinyl")
        .attr("fill", "#333")
        .attr("stroke", "#333") // Adjusted stroke color for the outer part
        .attr("stroke-width", 0.1); // Adjusted stroke width for the outer part

    svg.selectAll("discSegments")
        .data(data)
        .enter()
        .append("path")
        .attr("d", (d, i) => {
            const startAngle = i * angle;
            const endAngle = (i + 1) * angle;
            const arcGenerator = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(startAngle)
                .endAngle(endAngle);

            return arcGenerator();
        })
        .attr("transform", `translate(${discCenterX},${discCenterY})`)
        .attr("fill", "#555")
        .attr("stroke", "black") // Adjusted stroke color for the segments
        .attr("stroke-width", 2)
        .attr("class", "genre-vinyl")
        .on('click', (event, data) => {
            svg.selectAll("*").remove();
            showPlot(svg, datasets, data, x, y, height, width, marginBottom, marginLeft, marginTop, marginRight, scaleFactorWidth, scaleFactorHeight);
        }); // Adjusted stroke width for the segments

    svg.selectAll("selectionIndicator")
        .data(data)
        .enter()
        .append("path")
        .attr("d", (d, i) => {
            const startAngle = i * angle;
            const endAngle = (i + 1) * angle;
            const arcGenerator = d3.arc()
                .innerRadius(outerRadius)
                .outerRadius(outerRadius)
                .startAngle(startAngle)
                .endAngle(endAngle);

            return arcGenerator();
        })
        .attr("transform", `translate(${discCenterX},${discCenterY})`)
        .attr("fill", "#555")
        .attr("class", "genre-vinyl")
        .attr("stroke", (d) => {
            let strokeColour = "black";
            if(d === currentGenre)
                strokeColour = "white";
            return strokeColour;
        }) // Adjusted stroke color for the segments
        .attr("stroke-width", 2);

    //average popularity
    svg.selectAll("avgPopCones")
        .data(data)
        .enter()
        .append("path")
        .attr("d", (d, i) => {
            const startAngle = i * angle;
            const endAngle = (i + 1) * angle;
            const outerRadiusPopularity = d3.scaleLinear().domain([0, 100]).range([innerRadius, outerRadius]);
            const arcGenerator = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadiusPopularity(50))
                .startAngle(startAngle)
                .endAngle(endAngle);

            return arcGenerator();
        })
        .attr("transform", `translate(${discCenterX},${discCenterY})`)
        .attr("fill", "#0CDA75")
        .attr("stroke-width", 2)
        .attr("class", "genre-vinyl")
        .on('click', (event, data) => {
            svg.selectAll("*").remove();
            showPlot(svg, datasets, data, x, y, height, width, marginBottom, marginLeft, marginTop, marginRight, scaleFactorWidth, scaleFactorHeight);
        });

    // Add bigger circular hole in the center
    svg.append("circle")
        .attr("cx", discCenterX)
        .attr("cy", discCenterY)
        .attr("r", innerRadius)
        .attr("fill", "#111")
        .attr("class", "genre-vinyl")
        .attr("stroke", "#333") // Adjusted stroke color for the hole
        .attr("stroke-width", 6); // Adjusted stroke width for the hole


    // Draw grooves (concentric circles)
    const grooveCount = 10; // Adjusted groove count
    const grooveSpacing = (outerRadius - innerRadius) / grooveCount; // Adjusted spacing between grooves
    for (let i = 0; i < grooveCount; i++) {
        const grooveRadius = innerRadius + i * grooveSpacing;
        svg.append("circle")
            .attr("cx", discCenterX)
            .attr("cy", discCenterY)
            .attr("r", grooveRadius)
            .attr("fill", "none")
            .attr("class", "genre-vinyl")
            .attr("stroke", "rgb(107,107,112)")
            .attr("stroke-width", 1); // Adjusted groove width
    }

    // Add text labels to the center of each segment
    svg.selectAll("discLabels")
        .data(data)
        .enter()
        .append("text")
        .text(d => d)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", (d, i) => {
            const segmentAngle = (i + 5) * angle;
            const labelRadius = outerRadius + 10; // Adjusted label radius
            const x = Math.cos(segmentAngle) * labelRadius;
            const y = Math.sin(segmentAngle) * labelRadius;
            const rotation = segmentAngle * (180 / Math.PI);
            return `translate(${discCenterX + x},${discCenterY + y}) rotate(${rotation + 90}) scale(${scaleFactorWidth})`;
        })
        .attr("class", "genre-vinyl")
        .style("fill", "white")
        .style("font-size", "12px");
}