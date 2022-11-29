// Create function "init" open curly brackets
function init() {
    // select the dropdown menu and assign it a variable
    var selector = d3.selectAll("#selDataset");
// read the data from samples.json and assign it an argument name
    d3.json("samples.json").then((data) => {
        console.log(data);
        // Inside the data object assign a variable to the names array.
        var sampleNames = data.names;

// Use forEach to append a dropdown menu "option" to each element of the array
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                // The text of each dropdown menu is the ID
                .text(sample)
                // The value property is also assigned the ID
                .property("value", sample);
        });
    // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
}
// Call the init function

init();

// Add optionChanged() function to view the ID number for the option selected

// "newSample is the volunteer ID being passed through - 
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
};

// The buildMetadata() function takes in a sample (ID #)
function buildMetadata(sample) {
    // Use d3.json to pull in the entire dataset in samples.json and refer to as data
    d3.json("samples.json").then((data) => {
        // Assign the variable metadata to the metadata in the array
        var metadata = data.metadata;
        // Use the filter method on that array to filter for an 
// object in the array whose ID property matches the ID number passed (sample)
// within the filter method, use a function to...
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        
        // Because the results of the filter() method are returned as an array,
// the first item in the array (resultArray[0]) is selected and assigned
// the variable "result"
        var result = resultArray[0];
        
        // The ID of the Demographic Info panel is "sample-metadata". use the 
// d3.select() method to select that div and assignn the variable PANEL.
        var PANEL = d3.select("#sample-metadata");

        // Use PANEL.html("") to ensure the contents of the panel are cleared when another ID
        // number is chosen from the dropdown menu
        PANEL.html("");
        // Use the append and text methods to append a h6 heading to the panel and 
        // print tthe metadata for the selected ID
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
        });
    };
  // 1. Create the buildCharts function.
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      // 3. Create a variable that holds the samples array. 
        var samples = data.samples;
        console.log(samples);
      // 4. Create a variable that filters the samples for the object 
      // with the desired sample number.
        var resultArraySamples = samples.filter(sampleObj => sampleObj.id == sample);
        console.log(resultArraySamples);
      //  5. Create a variable that holds the first sample in the array.
        var result2 = resultArraySamples[0];
        console.log(result2);
  
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        var otuIDs = result2.otu_ids;
        var otuLabels = result2.otu_labels;
        var sampleValues = result2.sample_values;

        console.log(otuIDs);
        console.log(otuLabels);
        console.log(sampleValues);
  
      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
        
        let yticks = otuIDs.map(id => "OTU " + id ).slice(0, 10).reverse();
        console.log(yticks);
      
        let sortedSampleValues = sampleValues.slice(0, 10).reverse();
    
    
      // 8. Create the trace for the bar chart. 
    
        var trace = {
            x: sortedSampleValues,
            y: yticks,
            type: "bar",
            orientation: 'h',
            labels: otuIDs,
            text: otuLabels
        };

        var barData = [trace];

      // 9. Create the layout for the bar chart. 
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        paper_bgcolor: "rgba(0,0,0,0)"
        
       
      };
      // 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout);
        // 1. Create the trace for the bubble chart.
        var trace2 = {
          x: otuIDs,
          y: sampleValues,
          mode: "markers",
          text: otuLabels,
          marker: {
            size: sampleValues,
            color: otuIDs,
        },
          type: "scatter"
        };
            
        var bubbleData = [trace2];
        // 2. Create the layout for the bubble chart.
        var bubbleLayout = {
          title: "Bacteria Cultures Per Sample",
          xaxis: {title: "OTU ID"},
          hovermode: otuLabels,
          
          
        };
        
        // 3. Use Plotly to plot the data with the layout.
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
       


        // 1. Create a variable that filters the metadata array for the object with the desired sample number.
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
        console.log(metadata);
        console.log(resultArray);

    // 2. Create a variable that holds the first sample in the metadata array.
        var result = resultArray [0];

        console.log(result);
    // 3. Create a variable that holds the washing frequency.

        var wfreq = parseFloat(result.wfreq);

        console.log(wfreq);
      // 4. Create the trace for the gauge chart.
        var trace3 = {
          domain: {x: [0, 1], y: [0, 1]},
          title: {text: "Belly Button Washing Frequency <br> Scrubs per Week"},
          type: "indicator",
          value: wfreq,
          mode: "gauge+number",
          gauge: {
            axis: {range: [null, 10]},
            bar: {color: "black"},
            steps: [
              {range: [0, 2], color: "red"},
              {range: [2, 4], color: "orange"},
              {range: [4, 6], color: "yellow"},
              {range: [6, 8], color: "lime"},
              {range: [8, 10], color: "green"}
            ]
           }
        };
        var gaugeData = [trace3];
    
    // 5. Create the layout for the gauge chart.
        var gaugeLayout = { 
          width: 600,
          height: 500,
          margin: {t:0, b:0},
          paper_bgcolor: "rgba(0,0,0,0)"
        };

    // 6. Use Plotly to plot the gauge data and layout.
        Plotly.newPlot("gauge", gaugeData, gaugeLayout);
        });
      
    };
    

    
  

