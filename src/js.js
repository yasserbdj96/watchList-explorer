window.onload = function() {
    let page = 1;
    const perPage = 20;

    function search() {
        let query = document.getElementById("query").value.toLowerCase().replace(/\./g, " ");
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
                    if (title.includes(query) || year.includes(query) || country.includes(query) || type.includes(query)) {
                        results.push({
                            url: item.poster_url,
                            type: "serie",
                            condition: item.condition,
                            ep: item.ep,
                            name: item.name,
                            year: item.year
                        });
                    }
                });
                data.movies.forEach(function(item) {
                    let title = item.name.toLowerCase().replace(/\./g, " ");
                    let year = item.year.toLowerCase();
                    let country = item.country.toLowerCase();
                    let type = item.type.toLowerCase();
                    if (title.includes(query) || year.includes(query) || country.includes(query) || type.includes(query)) {
                        results.push({
                            url: item.poster_url,
                            type: "movie",
                            name: item.name,
                            year: item.year
                        });
                    }
                });
                let display = document.getElementById("display");
                if (page === 1) {
                    display.innerHTML = "";
                }
                let slicedResults = results.slice((page - 1) * perPage, page * perPage);
                slicedResults.forEach(function(result) {
                    let div = document.createElement("div");
                    div.classList.add("poster");
                    div.classList.add("BlockItem");
                    div.classList.add("FeaturedBLock");
                  
                    let img = document.createElement("img");
                    img.src = result.url;
                    img.height = 250;
                  
                    let BlockTitle = document.createElement("div");
                    BlockTitle.textContent = result.name.replace(/\./g, " ")+" "+result.year;
                    BlockTitle.classList.add("BlockTitle");
                    div.appendChild(BlockTitle);

                    if (result.type == "serie") {
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
            }
        };
        xhttp.open("GET", "my_list.json", true);
        xhttp.send();
    }

    document.getElementById("query").addEventListener("keyup", function(event) {
        event.preventDefault();
        page = 1;
        search();
    });

    window.addEventListener("scroll", function() {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            page++;
            search();
        }
    });
}
