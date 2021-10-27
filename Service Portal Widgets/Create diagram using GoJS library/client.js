// build GraphObject
var $ = go.GraphObject.make;  // for conciseness in defining templates
myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
  {
    maxSelectionCount: 1, // users can select only one part at a time
    "toolManager.hoverDelay": 10,  // how quickly tooltips are shown
    initialAutoScale: go.Diagram.Uniform,  // scale to show all of the contents
    "ChangedSelection": onSelectionChanged, // view additional information
  });

function infoString(obj) {
  var part = obj.part;
  if (part instanceof go.Adornment) part = part.adornedPart;
  var msg = "";
  if (part instanceof go.Link) {
    msg = "";
  } else if (part instanceof go.Node) {
    msg = part.data.text + ":\n\n" + part.data.description;
  }
  return msg;
}

var colors = {
  "red": "#be4b15",
  "green": "#52ce60",
  "blue": "#6ea5f8",
  "lightred": "#fd8852",
  "lightblue": "#afd4fe",
  "lightgreen": "#b9e986",
  "pink": "#faadc1",
  "purple": "#d689ff",
  "orange": "#fdb400",
};

// A data binding conversion function. Given an name, return the Geometry.
// If there is only a string, replace it with a Geometry object, which can be shared by multiple Shapes.
function geoFunc(geoname) {
  var geo = icons[geoname];
  if (typeof geo === "string") {
    geo = icons[geoname] = go.Geometry.parse(geo, true);
  }
  return geo;
}

myDiagram.nodeTemplate =
  $(go.Node, "Spot",
    {
      locationObjectName: 'main',
      locationSpot: go.Spot.Center,
      toolTip:
        $(go.Adornment, "Auto",
          $(go.Shape, { fill: "#CCFFCC" }),
          $(go.TextBlock, { margin: 4, width: 140 }, //https://gojs.net/latest/intro/toolTips.html
            new go.Binding("text", "", infoString).ofObject()))
      /*toolTip:
        $("ToolTip",
          $(go.TextBlock, { margin: 4, width: 140 }, //https://gojs.net/latest/intro/toolTips.html
            new go.Binding("text", "", infoString).ofObject())
        )*/
    },
    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
    // The main element of the Spot panel is a vertical panel housing an optional icon,
    // plus a rectangle that acts as the port
    $(go.Panel, "Vertical",
      $(go.Shape, {
        name: 'icon',
        width: 1, height: 1,
        stroke: null, strokeWidth: 0,
        fill: colors.blue
      },
        new go.Binding("fill", "color", function (c) { return colors[c]; }),
        new go.Binding("width", "iconWidth"),
        new go.Binding("height", "iconHeight"),
        new go.Binding("geometry", "icon", geoFunc)),
      $(go.Shape, {
        name: 'main',
        width: 40, height: 40,
        margin: new go.Margin(-1, 0, 0, 0),
        portId: "",
        stroke: null, strokeWidth: 0,
        fill: colors.blue
      },
        new go.Binding("fill", "color", function (c) { return colors[c]; }),
        new go.Binding("width", "portWidth"),
        new go.Binding("height", "portHeight"))
    ),

    $(go.TextBlock, {
      font: "Bold 14px Lato, sans-serif",
      textAlign: "center",
      margin: 3,
      maxSize: new go.Size(100, NaN),
      alignment: go.Spot.TopCenter,
      alignmentFocus: go.Spot.BottomCenter
    },
      new go.Binding("text"))

  );

// Some links need a custom to or from spot
function spotConverter(dir) {
  if (dir === "left") return go.Spot.LeftSide;
  if (dir === "right") return go.Spot.RightSide;
  if (dir === "top") return go.Spot.TopSide;
  if (dir === "bottom") return go.Spot.BottomSide;
  if (dir === "rightsingle") return go.Spot.Right;
}

myDiagram.linkTemplate =
  $(go.Link, {
    toShortLength: -2,
    fromShortLength: -2,
    layerName: "Background",
    routing: go.Link.Orthogonal,
    corner: 15,
    fromSpot: go.Spot.RightSide,
    toSpot: go.Spot.LeftSide
  },
    // make sure links come in from the proper direction and go out appropriately
    new go.Binding("fromSpot", "fromSpot", function (d) { return spotConverter(d); }),
    new go.Binding("toSpot", "toSpot", function (d) { return spotConverter(d); }),

    new go.Binding("points").makeTwoWay(),
    // mark each Shape to get the link geometry with isPanelMain: true
    $(go.Shape, { isPanelMain: true, stroke: colors.lightblue, strokeWidth: 10 },
      new go.Binding("stroke", "color", function (c) { return colors[c]; })),
    $(go.Shape, { isPanelMain: true, stroke: "white", strokeWidth: 3, name: "PIPE", strokeDashArray: [20, 40] })
  );


// build model
var model = $(go.GraphLinksModel);

model.nodeDataArray =
  [
    {
      key: 1,
      pos: '-180 -57',
      icon: 'natgas',
      iconWidth: 30,
      iconHeight: 60,
      portHeight: 20,
      text: 'Gas\nCompanies',
      description: 'Provides natural gas liquids (NGLs).',
      caption: 'Gas Drilling Well',
      imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/BarnettShaleDrilling-9323.jpg/256px-BarnettShaleDrilling-9323.jpg'
    },
    {
      key: 2,
      pos: '-180 100',
      icon: 'oil',
      iconWidth: 40,
      iconHeight: 60,
      portHeight: 20,
      text: 'Oil\nCompanies',
      description: 'Provides associated petroleum gas (APG). This type of gas used to be released as waste from oil drilling, but is now commonly captured for processing.',
      caption: 'Offshore oil well',
      imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Oil_platform_P-51_%28Brazil%29.jpg/512px-Oil_platform_P-51_%28Brazil%29.jpg'
    },
    {
      key: 3,
      pos: '-80 100',
      icon: 'gasprocessing',
      iconWidth: 40,
      iconHeight: 40,
      text: 'Gas Processing',
      description: 'APG processing turns associated petrolium gas into natural gas liquids (NGLs) and stable natural gas (SGN).',
      caption: 'Natural gas plant',
      imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Solohiv_natural_gas_plant_-_fragment.jpg/256px-Solohiv_natural_gas_plant_-_fragment.jpg'
    },
    {
      key: 4,
      pos: '30 -50',
      icon: 'fractionation',
      iconWidth: 40,
      iconHeight: 60,
      text: 'Gas Fractionation',
      description: 'Natural gas liquids are separated into individual hydrocarbons like propane and butanes, hydrocarbon mixtures (naphtha) and liquefied petroleum gases (LPGs).',
      caption: 'Gas Plant',
      imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Gasblok.jpg/256px-Gasblok.jpg'
    },
    {
      key: 5,
      pos: '130 -50',
      icon: 'pyrolysis',
      iconWidth: 40,
      iconHeight: 40,
      color: 'orange',
      text: 'Pyrolysis (Cracking)',
      description: 'Liquefied petroleum gases (LPGs) are transformed into Ethylene, propylene, benzene, and other by-products.',
      caption: 'Pyrolysis plant',
      imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Guelph.jpg'
    },
    {
      key: 6,
      pos: '330 -140',
      icon: 'polymerization',
      iconWidth: 40,
      iconHeight: 40,
      portHeight: 12,
      color: 'red',
      text: 'Basic Polymers',
      description: 'Ethylene and propylene (monomers) are processed into end products using various methods (polymerization).',
      caption: 'Plastics engineering-Polymer products',
      imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Plastics_engineering-Polymer_products.jpg/256px-Plastics_engineering-Polymer_products.jpg'
    },
    {
      key: 7,
      pos: '330 -55',
      icon: 'polymerization',
      iconWidth: 40,
      iconHeight: 40,
      portHeight: 12,
      color: 'green',
      text: 'Plastics',
      description: 'Polymerization produces PET, glycols, alcohols, expandable polystyrene, acrylates, BOPP-films and geosynthetics.',
      caption: 'Lego Color Bricks',
      imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Lego_Color_Bricks.jpg/256px-Lego_Color_Bricks.jpg'
    },
    {
      key: 8,
      pos: '330 40',
      icon: 'polymerization',
      iconWidth: 40,
      iconHeight: 40,
      portHeight: 12,
      color: 'lightgreen',
      text: 'Synthetic Rubbers',
      description: 'Polymerization produces commodity and specialty rubbers and thermoplastic elastomers.',
      caption: 'Sheet of synthetic rubber coming off the rolling mill at the plant of Goodrich',
      imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sheet_of_synthetic_rubber_coming_off_the_rolling_mill_at_the_plant_of_Goodrich.jpg/512px-Sheet_of_synthetic_rubber_coming_off_the_rolling_mill_at_the_plant_of_Goodrich.jpg'
    },
    {
      key: 9,
      pos: '330 115',
      color: 'orange',
      portHeight: 22,
      text: 'Intermediates',
      description: 'Produced Ethylene, Propylene, Butenes, Benzene, and other by-products.',
      caption: 'Propylene Containers',
      imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/XVJ-12_Propylene_%288662385917%29.jpg/256px-XVJ-12_Propylene_%288662385917%29.jpg'
    },
    {
      key: 10,
      pos: '330 205',
      icon: 'finishedgas',
      iconWidth: 30,
      iconHeight: 30,
      portHeight: 15,
      text: 'LPG, Naphtha,\nMTBE',
      description: 'Propane, butane, and other general purpose fuels and byproducts.',
      caption: 'Liquid Petroleum Gas Truck',
      imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/LPG_Truck.jpg/256px-LPG_Truck.jpg'
    },
    {
      key: 11,
      pos: '330 280',
      icon: 'finishedgas',
      iconWidth: 30,
      iconHeight: 30,
      portHeight: 15,
      text: 'Natural Gas, NGLs',
      description: 'Used for heating, cooking, and electricity generation',
      caption: 'Natural Gas Flame',
      imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/%22LPG_flame%22.JPG/512px-%22LPG_flame%22.JPG'
    }
  ];

model.linkDataArray = [
  {
    from: 1,
    to: 4
  },
  {
    from: 2,
    to: 3,
    label: 'APG'
  },
  {
    from: 3,
    to: 4
  },
  {
    from: 3,
    to: 5,
    toSpot: 'bottom'
  },
  {
    from: 4,
    to: 5
  },
  {
    from: 4,
    to: 5
  },
  {
    from: 3,
    to: 11,
    fromSpot: 'bottom'
  },
  {
    from: 4,
    to: 10,
    fromSpot: 'bottom'
  },
  {
    from: 5,
    to: 6,
    fromSpot: 'rightsingle',
    color: 'orange'
  },
  {
    from: 5,
    to: 7,
    fromSpot: 'rightsingle',
    color: 'orange'
  },
  {
    from: 5,
    to: 8,
    fromSpot: 'rightsingle',
    color: 'orange'
  },
  {
    from: 5,
    to: 9,
    fromSpot: 'rightsingle',
    color: 'orange'
  }
];

myDiagram.model = model;

loop();  // animate some flow through the pipes

var opacity = 1;
var down = true;
function loop() {
  var diagram = myDiagram;
  setTimeout(function () {
    var oldskips = diagram.skipsUndoManager;
    diagram.skipsUndoManager = true;
    diagram.links.each(function (link) {
      var shape = link.findObject("PIPE");
      var off = shape.strokeDashOffset - 3;
      // animate (move) the stroke dash
      shape.strokeDashOffset = (off <= 0) ? 60 : off;
      // animte (strobe) the opacity:
      if (down) opacity = opacity - 0.01;
      else opacity = opacity + 0.003;
      if (opacity <= 0) { down = !down; opacity = 0; }
      if (opacity > 1) { down = !down; opacity = 1; }
      shape.opacity = opacity;
    });
    diagram.skipsUndoManager = oldskips;
    loop();
  }, 60);
}

function onSelectionChanged(e) {
  var node = e.diagram.selection.first();
  if (!(node instanceof go.Node)) return;
  var data = node.data;
  var image = document.getElementById('Image');
  var title = document.getElementById('Title');
  var description = document.getElementById('Description');

  if (data.imgsrc) {
    image.src = data.imgsrc;
    image.alt = data.caption;
  } else {
    image.src = "";
    image.alt = "";
  }
  title.textContent = data.text;
  description.textContent = data.description;

}