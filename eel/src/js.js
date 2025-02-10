//   |                                                          |
// --+----------------------------------------------------------+--
//   |   Code by : yasserbdj96                                  |
//   |   Email   : yasser.bdj96@gmail.com                       |
//   |   Github  : https://github.com/yasserbdj96               |
//   |   BTC     : bc1q2dks8w8uurca5xmfwv4jwl7upehyjjakr3xga9   |
// --+----------------------------------------------------------+--  
//   |        all posts #yasserbdj96 ,all views my own.         |
// --+----------------------------------------------------------+--
//   |                                                          |

//START{
    window.onload = function() {
        let page = 1;
        const perPage = 40;
        function search(page) {
            let query = document.getElementById("query").value.toLowerCase().replace(/\./g, " ");
            let display = document.getElementById("display");
            let addnew = document.getElementById("addnew");
            if (query == "--help"){
                addnew.style.display="none";
                display.innerHTML = 'This help will be available soon';
            } else if (query == "") {
                addnew.style.display="none";
                display.innerHTML = "To discover what you're looking for, enter the name of a movie/serie, the year it was released, or the name of the country it was made in.";
            }else if (query == "--addnew") {
                addnew.style.display="block";
            } else {
                addnew.style.display="none";

                eel.read_json_file()(function(data) {
                //let xhttp = new XMLHttpRequest();
                //xhttp.onreadystatechange = function() {
                    //if (this.readyState == 4 && this.status == 200) {
                        //let data = JSON.parse(datax);
                        let results = [];
                        data.series.sort((a, b) => {
                            if (a.condition < b.condition) {
                              return -1;
                            } else if (a.condition > b.condition) {
                              return 1;
                            } else {
                              return 0;
                            }
                        });
                        data.series.forEach(function(item) {
                            let title = item.name.toLowerCase().replace(/\./g, " ");
                            let year = item.year.toLowerCase();
                            let country = item.country.toLowerCase();
                            let type = item.type.toLowerCase();
                            let condition = item.condition ? item.condition.toLowerCase() : ""; // added check for item.condition before calling toLowerCase()
                            if (query === "series" || query === "all" || condition.includes(query) || title.includes(query) || year.includes(query) || country.includes(query) || type.includes(query)) {
                                let alreadyInResults = false;
                                for (let i = 0; i < results.length; i++) {
                                    if (results[i].name === title) {
                                        alreadyInResults = true;
                                        break;
                                    }
                                }
                                if (!alreadyInResults) {
                                    results.push({
                                        url: item.poster_url,
                                        type: item.type,
                                        condition: item.condition,
                                        ep: item.ep,
                                        name: title,
                                        year: item.year
                                    });
                                }
                            }
                        });
                        data.movies.forEach(function(item) {
                            let title = item.name.toLowerCase().replace(/\./g, " ");
                            let year = item.year.toLowerCase();
                            let country = item.country.toLowerCase();
                            let type = item.type.toLowerCase();
                            if (query === "movies" || query === "all" || title.includes(query) || year.includes(query) || country.includes(query) || type.includes(query)) {
                                let alreadyInResults = false;
                                for (let i = 0; i < results.length; i++) {
                                    if (results[i].name === title) {
                                        alreadyInResults = true;
                                        
                                        break;
                                    }
                                }
                                if (!alreadyInResults) {
                                    //console.log(title);
                                    results.push({
                                        url: item.poster_url,
                                        type: item.type,
                                        name: title,
                                        year: item.year
                                    });
                                }
                            }
                        });
                        if (page === 1) {
                            display.innerHTML = "";
                        }
                        if ((results =="") && (query.substring(0, 2)!=="--")){
                            display.innerHTML = "No Result!";
                        }
                        let slicedResults = results.slice((page - 1) * perPage, page * perPage);
                        slicedResults.forEach(function(result) {
                            let div = document.createElement("div");
                            div.classList.add("poster");
                            div.classList.add("BlockItem");
                            div.classList.add("FeaturedBLock");
                            div.setAttribute('onclick', `showModal('${result.url}')`);
    
                            let img = document.createElement("img");
                            img.classList.add("poster-container");
                            img.src = result.url;
                            img.height = 250;
                            img.loading = "lazy"; // Set lazy loading

                            let BlockTitle = document.createElement("div");
                            BlockTitle.textContent = result.name.replace(/\./g, " ")+" "+result.year;
                            BlockTitle.classList.add("BlockTitle");
                            div.appendChild(BlockTitle);
    
                            if (typeof result.condition !== 'undefined'){//(result.type == "serie") {
                                let conditionSpan = document.createElement("span");
                                conditionSpan.textContent = result.condition;
                                conditionSpan.classList.add("ribbon");
                                conditionSpan.classList.add("condition");
                                conditionSpan.classList.add(result.condition);
                                div.appendChild(conditionSpan);
                      
                                let epSpan = document.createElement("span");
                                epSpan.textContent = result.ep;
                                epSpan.classList.add("ep");
                                epSpan.classList.add(result.condition);
                                div.appendChild(epSpan);
                            }
                      
                            div.appendChild(img);
                            display.appendChild(div);
                        });

                        console.clear();
                        //console.log(results);
                        /*for (let i = 0; i < results.length; i++) {
                            console.log(results[i].name);
                        }*/
                        console.log("results: "+results.length);
                        console.log("page: "+page);

                        
                    //}
                //};
                //xhttp.open("GET", "my_list.json", true);
                //xhttp.send();
                });
            }
        }

        function search2(page) {
            let query = document.getElementById("query").value.toLowerCase().replace(/\./g, " ");
            let display = document.getElementById("display");
            let addnew = document.getElementById("addnew");
            if (query == "--help"){
                addnew.style.display="none";
                display.innerHTML = 'This help will be available soon';
            } else if (query == "") {
                addnew.style.display="none";
                display.innerHTML = "To discover what you're looking for, enter the name of a movie/serie, the year it was released, or the name of the country it was made in.";
            }else if (query == "--addnew") {
                addnew.style.display="block";
            } else {
                addnew.style.display="none";
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let data = JSON.parse(this.responseText);
                        let results = [];
                        data.series.sort((a, b) => {
                            if (a.condition < b.condition) {
                              return -1;
                            } else if (a.condition > b.condition) {
                              return 1;
                            } else {
                              return 0;
                            }
                        });
                        data.series.forEach(function(item) {
                            let title = item.name.toLowerCase().replace(/\./g, " ");
                            let year = item.year.toLowerCase();
                            let country = item.country.toLowerCase();
                            let type = item.type.toLowerCase();
                            let condition = item.condition ? item.condition.toLowerCase() : ""; // added check for item.condition before calling toLowerCase()
                            if (query === "series" || query === "all" || condition.includes(query) || title.includes(query) || year.includes(query) || country.includes(query) || type.includes(query)) {
                                let alreadyInResults = false;
                                for (let i = 0; i < results.length; i++) {
                                    if (results[i].name === title) {
                                        alreadyInResults = true;
                                        break;
                                    }
                                }
                                if (!alreadyInResults) {
                                    results.push({
                                        url: item.poster_url,
                                        type: item.type,
                                        condition: item.condition,
                                        ep: item.ep,
                                        name: title,
                                        year: item.year
                                    });
                                }
                            }
                        });
                        data.movies.forEach(function(item) {
                            let title = item.name.toLowerCase().replace(/\./g, " ");
                            let year = item.year.toLowerCase();
                            let country = item.country.toLowerCase();
                            let type = item.type.toLowerCase();
                            if (query === "movies" || query === "all" || title.includes(query) || year.includes(query) || country.includes(query) || type.includes(query)) {
                                let alreadyInResults = false;
                                for (let i = 0; i < results.length; i++) {
                                    if (results[i].name === title) {
                                        alreadyInResults = true;
                                        
                                        break;
                                    }
                                }
                                if (!alreadyInResults) {
                                    //console.log(title);
                                    results.push({
                                        url: item.poster_url,
                                        type: item.type,
                                        name: title,
                                        year: item.year
                                    });
                                }
                            }
                        });
                        if (page === 1) {
                            display.innerHTML = "";
                        }
                        if ((results =="") && (query.substring(0, 2)!=="--")){
                            display.innerHTML = "No Result!";
                        }
                        let slicedResults = results.slice((page - 1) * perPage, page * perPage);
                        slicedResults.forEach(function(result) {
                            let div = document.createElement("div");
                            div.classList.add("poster");
                            div.classList.add("BlockItem");
                            div.classList.add("FeaturedBLock");
                            div.setAttribute('onclick', `showModal('${result.url}')`);
    
                            let img = document.createElement("img");
                            img.classList.add("poster-container");
                            img.src = result.url;
                            img.height = 250;
                      
                            let BlockTitle = document.createElement("div");
                            BlockTitle.textContent = result.name.replace(/\./g, " ")+" "+result.year;
                            BlockTitle.classList.add("BlockTitle");
                            div.appendChild(BlockTitle);
    
                            if (typeof result.condition !== 'undefined'){//(result.type == "serie") {
                                let conditionSpan = document.createElement("span");
                                conditionSpan.textContent = result.condition;
                                conditionSpan.classList.add("ribbon");
                                conditionSpan.classList.add("condition");
                                conditionSpan.classList.add(result.condition);
                                div.appendChild(conditionSpan);
                      
                                let epSpan = document.createElement("span");
                                epSpan.textContent = result.ep;
                                epSpan.classList.add("ep");
                                epSpan.classList.add(result.condition);
                                div.appendChild(epSpan);
                            }
                      
                            div.appendChild(img);
                            display.appendChild(div);
                        });

                        console.clear();
                        //console.log(results);
                        /*for (let i = 0; i < results.length; i++) {
                            console.log(results[i].name);
                        }*/
                        console.log("results: "+results.length);
                        console.log("page: "+page);

                        
                    }
                };
                xhttp.open("GET", "https://raw.githubusercontent.com/yasserbdj96/watchList-explorer/main/my_list.json", true);
                xhttp.send();
            }
        }
    
        document.getElementById("query").addEventListener("keyup", function(event) {
            event.preventDefault();
            page = 1;
            if (typeof eel !== 'undefined') {
                search(page);
            }else{
                search2(page);
            }
            
        });
    
        let scrollPosition = 0;

        document.addEventListener("scroll", function() {
            const currentPosition = window.scrollY;
            if (currentPosition > scrollPosition) {
                // Scrolling down
                if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                    page++;
                    if (typeof eel !== 'undefined') {
                        search(page);
                    }else{
                        search2(page);
                    }
                }
            } else {
                // Scrolling up
                // Do nothing
            }
            scrollPosition = currentPosition;
        });

    }
    
    function showModal(src) {
        // Get the modal and modal content elements
        var modal = document.querySelector(".modal");
        var modalContent = document.querySelector(".modal-content");
      
        // Set the source of the modal image to the clicked image
        modalContent.src = src;
      
        // Display the modal
        modal.style.display = "block";
      
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
      }
      
function check_poster() {
    var loader = document.getElementById("loader");
    var isname = document.getElementById("isname");
    var poster_img = document.getElementById("poster_img");
    var poster = document.getElementById("poster");

    var countrySelect = document.getElementById('countrySelect');
    var selectedIndex = countrySelect.selectedIndex;
    var selectedText = selectedIndex !== -1 ? countrySelect.options[selectedIndex].textContent : "";

    var istype = document.getElementById('istype');
    var selectedIndex2 = istype.selectedIndex;
    var mselectedText = selectedIndex2 !== -1 ? istype.options[selectedIndex2].textContent : "";

    var year = document.getElementById('yearSelect');
    var selectedIndex3 = year.selectedIndex;
    var yselectedText = selectedIndex3 !== -1 ? year.options[selectedIndex3].textContent : "";

    loader.style.display = "block";
    poster.style.display = "none";

    eel.check_poster(isname.value, mselectedText, selectedText, yselectedText)(function (ret) {
        loader.style.display = "none";
        poster.style.display = "block";
        poster_img.src = ret;
        poster_img.addEventListener("click", function() {
            showModal(ret);
        });
    });
}




function populateSelectSortedByName() {
    // Load the JSON file
    fetch('countries.json')
      .then(response => response.json())
      .then(data => {
        // Sort the data by name
        data.sort((a, b) => a.name.localeCompare(b.name));
        
        // Call a function to populate the select element
        populateSelect(data);
      })
      .catch(error => console.error('Error:', error));
  
    function populateSelect(data) {
      const selectElement = document.getElementById('countrySelect');
  
      // Create a "None" option and add it as the first element
      const noneOption = document.createElement('option');
      noneOption.value = "";
      noneOption.textContent = "None";
      selectElement.appendChild(noneOption);
  
      // Iterate over the JSON data and create options
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.code;
        option.textContent = item.name;
        selectElement.appendChild(option);
      });
    }
  }


function populateYearSelect() {
    const selectElement = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();
  
    // Create a "None" option and add it as the first element
    const noneOption = document.createElement('option');
    noneOption.value = "";
    noneOption.textContent = "None";
    selectElement.appendChild(noneOption);
  
    for (let year = currentYear; year >= 1900; year--) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      selectElement.appendChild(option);
    }
}
  
// Call the function to populate the year select list
populateYearSelect();
  

// Call the function to populate the select element with sorted options
populateSelectSortedByName();
//}END.