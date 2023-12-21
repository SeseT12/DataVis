export function showAdditionalInfo(svg, data, scaleFactorWidth, scaleFactorHeight){
    d3.selectAll('.additional-info').remove();
    svg.append("text")
        .attr("font-size", "20px")
        .attr("transform", `translate(${750 * scaleFactorWidth}, ${370 * scaleFactorHeight}) scale(${scaleFactorWidth})`)
        .attr("class", "additional-info")
        .style("text-anchor", "middle")
        .text("Additional Song Info");

    svg.append("line")
        .attr("x1", `${660 * scaleFactorWidth}`)
        .attr("y1", `${377 * scaleFactorHeight}`)
        .attr("x2", `${840 * scaleFactorWidth}`)
        .attr("y2", `${377 * scaleFactorHeight}`)
        .attr("class", "additional-info")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1 * scaleFactorWidth);

    const keys = ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"];
    let key = "";
    if (data != null)
        key = (data.key !== -1) ? keys[parseInt(data.key)] : "Unknown";
    svg.append("text")
        .attr("transform", `translate(${750 * scaleFactorWidth}, ${400 * scaleFactorHeight}) scale(${scaleFactorWidth})`)
        .attr("class", "additional-info")
        .style("text-anchor", "middle")
        .text(`Key: ${key}`);

    const modes = ["Minor", "Major"];
    const mode = (data != null) ? modes[parseInt(data.mode)] : "";
    svg.append("text")
        .attr("transform", `translate(${750 * scaleFactorWidth}, ${430 * scaleFactorHeight}) scale(${scaleFactorWidth})`)
        .attr("class", "additional-info")
        .style("text-anchor", "middle")
        .text(`Mode: ${mode}`);

    const loudness = (data != null) ? `${data.loudness} db` : "";
    svg.append("text")
        .attr("transform", `translate(${750 * scaleFactorWidth}, ${460 * scaleFactorHeight}) scale(${scaleFactorWidth})`)
        .attr("class", "additional-info")
        .style("text-anchor", "middle")
        .text(`Loudness: ${loudness}`);

    const tempo = (data != null) ? `${parseInt(Math.ceil(data.tempo))} BPM` : "";
    svg.append("text")
        .attr("transform", `translate(${750 * scaleFactorWidth}, ${490 * scaleFactorHeight}) scale(${scaleFactorWidth})`)
        .attr("class", "additional-info")
        .style("text-anchor", "middle")
        .text(`Tempo: ${tempo}`);

    const duration = (data != null) ? `${data.duration_ms / 1000} s` : "";
    svg.append("text")
        .attr("transform", `translate(${750 * scaleFactorWidth}, ${520 * scaleFactorHeight}) scale(${scaleFactorWidth})`)
        .attr("class", "additional-info")
        .style("text-anchor", "middle")
        .text(`Duration: ${duration}`);
}