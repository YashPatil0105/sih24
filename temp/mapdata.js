var simplemaps_countrymap_mapdata={
  main_settings: {
   //General settings
    width: "responsive", //'700' or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",
    
    //State defaults
    state_description: "State description",
    state_color: "#F5DEB3",
    state_hover_color: "#3b729f",
    state_url: "",
    border_size: 1.5,
    all_states_inactive: "no",
    all_states_zoomable: "yes",
    
    //Location defaults
    location_description: "Location description",
    location_url: "./Features.html",
    location_color: "#FF0000",
    location_opacity: "1",
    location_hover_opacity: 1,
    location_size: 15,
    location_type: "circle",
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    
    //Label defaults
    label_color: "#ffffff",
    label_hover_color: "#ffffff",
    label_size: 16,
    label_font: "Arial",
    label_display: "auto",
    label_scale: "yes",
    hide_labels: "no",
    hide_eastern_labels: "no",
   
    //Zoom settings
    zoom: "no",
    manual_zoom: "no",
    back_image: "no",
    initial_back: "no",
    initial_zoom: "-1",
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom_out_incrementally: "yes",
    zoom_percentage: 0.99,
    zoom_time: 0.5,
    
    //Popup settings
    popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 5,
    popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",
    
    //Advanced settings
    div: "map",
    auto_load: "yes",
    url_new_tab: "no",
    images_directory: "default",
    fade_time: 0.1,
    link_text: "View Website",
    popups: "detect",
    state_image_url: "",
    state_image_position: "",
    location_image_url: ""
  },
  state_specific: {
    INAN: {
      name: "Andaman and Nicobar"
    },
    INAP: {
      name: "Andhra Pradesh"
    },
    INAR: {
      name: "Arunachal Pradesh"
    },
    INAS: {
      name: "Assam"
    },
    INBR: {
      name: "Bihar"
    },
    INCH: {
      name: "Chandigarh"
    },
    INCT: {
      name: "Chhattisgarh"
    },
    INDH: {
      name: "Dādra and Nagar Haveli and Damān and Diu"
    },
    INDL: {
      name: "Delhi"
    },
    INGA: {
      name: "Goa"
    },
    INGJ: {
      name: "Gujarat"
    },
    INHP: {
      name: "Himachal Pradesh"
    },
    INHR: {
      name: "Haryana"
    },
    INJH: {
      name: "Jharkhand"
    },
    INJK: {
      name: "Jammu and Kashmir"
    },
    INKA: {
      name: "Karnataka"
    },
    INKL: {
      name: "Kerala"
    },
    INLA: {
      name: "Ladakh"
    },
    INLD: {
      name: "Lakshadweep"
    },
    INMH: {
      name: "Maharashtra"
    },
    INML: {
      name: "Meghalaya"
    },
    INMN: {
      name: "Manipur"
    },
    INMP: {
      name: "Madhya Pradesh"
    },
    INMZ: {
      name: "Mizoram"
    },
    INNL: {
      name: "Nagaland"
    },
    INOR: {
      name: "Orissa"
    },
    INPB: {
      name: "Punjab"
    },
    INPY: {
      name: "Puducherry"
    },
    INRJ: {
      name: "Rajasthan"
    },
    INSK: {
      name: "Sikkim"
    },
    INTG: {
      name: "Telangana"
    },
    INTN: {
      name: "Tamil Nadu"
    },
    INTR: {
      name: "Tripura"
    },
    INUP: {
      name: "Uttar Pradesh"
    },
    INUT: {
      name: "Uttaranchal"
    },
    INWB: {
      name: "West Bengal"
    }
  },
  locations: {
    "0": {
      lat: "23.6367",
      lng: "87.0820",
      name: "Raniganj Coal Mine",
      description: "Coal production = 33.90 million tonnes"
    },
    "1": {
      lat: "23.7470",
      lng: "86.4145",
      name: "Jharia Coal Mine",
      description: "Coal production = 36.40 million tonnes",
      type: "circle",
      opacity: "1"
    },
    "2": {
      lat: "22.363848",
      lng: "82.734840",
      name: "Korba",
      description: "Coal production =  million tonnes"
    },
    "3": {
      lat: "24.19973",
      lng: "82.67535",
      name: "Singrauli"
    },
    "4": {
      lat: "20.94927",
      lng: "85.23354",
      name: "Talcher"
    },
    "5": {
      lat: "18.000",
      lng: "79.83333",
      name: "Warangal"
    },
    "6": {
      lat: "11.533",
      lng: "79.48",
      name: "Neyveli"
    },
    "7": {
      lat: "23.68562",
      lng: "85.99026",
      name: "Bokaro"
    },
    "8": {
      lat: "20.73933",
      lng: "78.59784",
      name: "Wardha"
    }
  },
  labels: {
    "0": {
      name: "Jharia",
      x: "599",
      parent_type: "location",
      parent_id: "1",
      size: "20",
      font: "Arial",
      hover_color: "#000000",
      display: "all",
      color: "#000000",
      line: "no",
      pill: "no",
      y: "460.3"
    },
    "1": {
      name: "Raniganj",
      x: 662.3,
      parent_type: "location",
      parent_id: "1",
      color: "#000000",
      hover_color: "#000000",
      size: "20",
      line: "no",
      pill: "no",
      display: "all",
      y: "480.6",
      font: "Arial"
    },
    "2": {
      name: "Korba",
      x: "500.66667",
      y: "521.16667",
      parent_type: "location",
      parent_id: "2",
      color: "#000000",
      hover_color: "#000000",
      size: "20",
      font: "Arial",
      line: "no",
      pill: "no",
      display: "all"
    },
    "3": {
      name: "Singrauli",
      parent_id: "3",
      parent_type: "location",
      color: "#000000",
      hover_color: "#000000",
      size: "20",
      font: "Arial",
      line: "no",
      pill: "no",
      display: "all",
      x: 496.6,
      y: "447.7"
    },
    "4": {
      name: "Talcher",
      parent_id: "4",
      color: "#000000",
      hover_color: "#000000",
      size: "20",
      font: "Arial",
      line: "no",
      pill: "no",
      display: "all",
      parent_type: "location",
      x: 566.7,
      y: "564.1"
    },
    "5": {
      name: "Warangal",
      parent_type: "location",
      parent_id: "5",
      color: "#000000",
      hover_color: "#000000",
      size: "20",
      font: "Arial",
      line: "no",
      pill: "no",
      display: "all",
      x: 418.8,
      y: "648.8"
    },
    "6": {
      name: "Neyveli",
      parent_type: "location",
      parent_id: "6",
      color: "#000000",
      hover_color: "#000000",
      size: "20",
      font: "Arial",
      line: "no",
      pill: "no",
      display: "all",
      x: 409.1,
      y: "832"
    },
    "7": {
      name: "Bokaro",
      parent_type: "location",
      parent_id: "7",
      color: "#000000",
      hover_color: "#000000",
      size: "20",
      font: "Arial",
      line: "no",
      pill: "no",
      display: "all",
      x: "577.4",
      y: "482.1"
    },
    "8": {
      name: "Wardha",
      parent_type: "location",
      parent_id: "8",
      color: "#000000",
      hover_color: "#000000",
      size: "20",
      font: "Arial",
      line: "no",
      pill: "no",
      display: "all",
      x: 385,
      y: "569.3"
    },
    INAN: {
      name: "Andaman and Nicobar",
      parent_id: "INAN",
      x: 774.3,
      y: 793.5
    },
    INAP: {
      name: "Andhra Pradesh",
      parent_id: "INAP",
      x: 391.4,
      y: 729.2
    },
    INAR: {
      name: "Arunachal Pradesh",
      parent_id: "INAR",
      x: 826,
      y: 327.1
    },
    INAS: {
      name: "Assam",
      parent_id: "INAS",
      x: 779.9,
      y: 395.1
    },
    INBR: {
      name: "Bihar",
      parent_id: "INBR",
      x: 590.4,
      y: 411.8
    },
    INCH: {
      name: "Chandigarh",
      parent_id: "INCH",
      x: 334.8,
      y: 255
    },
    INCT: {
      name: "Chhattisgarh",
      parent_id: "INCT",
      x: 493,
      y: 519.1
    },
    INDH: {
      name: "Dādra and Nagar Haveli and Damān and Diu",
      parent_id: "INDH",
      x: 232.2,
      y: 574
    },
    INDL: {
      name: "Delhi",
      parent_id: "INDL",
      x: 344,
      y: 320.1
    },
    INGA: {
      name: "Goa",
      parent_id: "INGA",
      x: 261.7,
      y: 713.2
    },
    INGJ: {
      name: "Gujarat",
      parent_id: "INGJ",
      x: 197.8,
      y: 481.3
    },
    INHP: {
      name: "Himachal Pradesh",
      parent_id: "INHP",
      x: 348.9,
      y: 216.6
    },
    INHR: {
      name: "Haryana",
      parent_id: "INHR",
      x: 321.3,
      y: 306.2
    },
    INJH: {
      name: "Jharkhand",
      parent_id: "INJH",
      x: 559.5,
      y: 475.4
    },
    INJK: {
      name: "Jammu and Kashmir",
      parent_id: "INJK",
      x: 276.6,
      y: 159.1
    },
    INKA: {
      name: "Karnataka",
      parent_id: "INKA",
      x: 305.3,
      y: 704.8
    },
    INKL: {
      name: "Kerala",
      parent_id: "INKL",
      x: 336.9,
      y: 884.4
    },
    INLA: {
      name: "Ladakh",
      parent_id: "INLA",
      x: 356.4,
      y: 138.6
    },
    INLD: {
      name: "Lakshadweep",
      parent_id: "INLD",
      x: 233.1,
      y: 912.4
    },
    INMH: {
      name: "Maharashtra",
      parent_id: "INMH",
      x: 296.7,
      y: 599.4
    },
    INML: {
      name: "Meghalaya",
      parent_id: "INML",
      x: 709.8,
      y: 416.2
    },
    INMN: {
      name: "Manipur",
      parent_id: "INMN",
      x: 800.8,
      y: 444
    },
    INMP: {
      name: "Madhya Pradesh",
      parent_id: "INMP",
      x: 415.8,
      y: 490.3
    },
    INMZ: {
      name: "Mizoram",
      parent_id: "INMZ",
      x: 775.8,
      y: 474.9
    },
    INNL: {
      name: "Nagaland",
      parent_id: "INNL",
      x: 823.1,
      y: 398.6
    },
    INOR: {
      name: "Orissa",
      parent_id: "INOR",
      x: 551.4,
      y: 558.7
    },
    INPB: {
      name: "Punjab",
      parent_id: "INPB",
      x: 300,
      y: 256.8
    },
    INPY: {
      name: "Puducherry",
      parent_id: "INPY",
      x: 417.9,
      y: 838.8
    },
    INRJ: {
      name: "Rajasthan",
      parent_id: "INRJ",
      x: 256.3,
      y: 375
    },
    INSK: {
      name: "Sikkim",
      parent_id: "INSK",
      x: 654.1,
      y: 356.5
    },
    INTG: {
      name: "Telangana",
      parent_id: "INTG",
      x: 396.3,
      y: 643.5
    },
    INTN: {
      name: "Tamil Nadu",
      parent_id: "INTN",
      x: 376.9,
      y: 838.6
    },
    INTR: {
      name: "Tripura",
      parent_id: "INTR",
      x: 740.4,
      y: 473.4
    },
    INUP: {
      name: "Uttar Pradesh",
      parent_id: "INUP",
      x: 443.5,
      y: 377.6
    },
    INUT: {
      name: "Uttaranchal",
      parent_id: "INUT",
      x: 407,
      y: 273.5
    },
    INWB: {
      name: "West Bengal",
      parent_id: "INWB",
      x: 636.2,
      y: 486.7
    }
  },
  legend: {
    entries: [
      {
        name: "Jharia",
        color: "Red",
        type: "location",
        shape: "circle",
        ids: "1"
      },
      {
        name: "Raniganj",
        color: "Red",
        type: "location",
        shape: "circle",
        ids: "0"
      },
      {
        name: "Korba",
        color: "Red",
        type: "location",
        shape: "circle",
        ids: "2"
      },
      {
        name: "Singrauli",
        color: "Red",
        type: "location",
        shape: "circle",
        ids: "3"
      },
      {
        name: "Talcher",
        color: "Red",
        type: "location",
        shape: "circle",
        ids: "4"
      },
      {
        name: "Warangal",
        color: "Red",
        type: "location",
        shape: "circle",
        ids: "5"
      },
      {
        name: "Neyveli",
        color: "Red",
        type: "location",
        shape: "circle",
        ids: "6"
      },
      {
        name: "Bokaro",
        color: "Red",
        type: "location",
        shape: "circle",
        ids: "7"
      },
      {
        name: "Wardha",
        color: "Red",
        type: "location",
        shape: "circle",
        ids: "8"
      }
    ]
  },
  regions: {}
};