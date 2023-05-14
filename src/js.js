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
        const perPage = 20;
        function search(page) {
            let query = document.getElementById("query").value.toLowerCase().replace(/\./g, " ");
            let display = document.getElementById("display");
            if (query == "help"){
                display.innerHTML = 'This help will be available soon';
            } else if (query == "") {
                display.innerHTML = "To discover what you're looking for, enter the name of a movie/serie, the year it was released, or the name of the country it was made in.";
            } else {
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let data = JSON.parse(this.responseText);
                        let results = [];
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
                        if (results ==""){
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
                xhttp.open("GET", "my_list.json", true);
                xhttp.send();
            }
        }
    
        document.getElementById("query").addEventListener("keyup", function(event) {
            event.preventDefault();
            page = 1;
            search(page);
        });
    
        let scrollPosition = 0;

        document.addEventListener("scroll", function() {
            const currentPosition = window.scrollY;
            if (currentPosition > scrollPosition) {
                // Scrolling down
                if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                    page++;
                    search(page);
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
      
    
    //}END.