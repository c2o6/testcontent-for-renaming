g=JSON.parse(document.querySelector("textarea#wpTextbox1").value);

buckets = new Map();
for (const feature of g.features) {
    const type = feature.geometry.type;
    if ( ! buckets.has(type) ) {
        buckets.set(type, []);
    }
    buckets.get(type).push(feature);
}

function get_extras(description) {
    return [];
}

function scrub_extras(description) {
    return description;
}

function render_point(feature) {
    return [
        feature.geometry.coordinates.join(","),
        feature.properties.title,
        scrub_extras(feature.properties.description)
        //,
        // "File:" + custom_icon,
        // "", // (group?)
        // "", // (inline label?)
        // "File:" + visited_icon
    ].concat(get_extras(feature.properties.description)).join("~");
}

function render_polygon(feature) {
    return [
        feature.geometry.coordinates[0].map( e => e.join(",") ).join(":"),
        feature.properties.title,
        scrub_extras(feature.properties.description)
        //, green   // border color
        //, 0.4     // border opacity
        //, 4       // border thickness
        //, green   // fill color
        //, 0.2     // fill opacity
        //, show only on hover?
    ].concat(get_extras(feature.properties.description)).join("~");
}

function render_line(feature) {
    return [
        feature.geometry.coordinates[0].map( e => e.join(",") ).join(":"),
        feature.properties.title,
        scrub_extras(feature.properties.description)
        //, red     // line color
        //, 0.4     // line opacity
        //, 4       // line thickness
    ].concat(get_extras(feature.properties.description)).join("~");
}
sections = [];
if (buckets.has("Point")) {
    sections.push( buckets.get("Point").map( e => render_point(e) ).join(";\n") );
}
if (buckets.has("Polygon")) {
    sections.push( "polygons=" + buckets.get("Polygon").map( e =>render_polygon(e) ).join(";\n") );
}
if (buckets.has("Line")) {
    sections.push( "lines=" + buckets.get("Polygon").map( e => render_polygon(e) ).join(";\n") );
}
alert(sections.join("\n| "));