$(function () {
    function display(bool) {
        if (bool) {
            $("#container").show();
            $("#boire").show();
        } else {
            $("#container").hide();
        }
    }


    display(false)

    var pann = document.getElementById("panier-img");
    pann.addEventListener("click", function() {
        
        $("#panier").show();

        document.getElementById("food-img").style.backgroundColor = "rgb(58 71 106)";
        document.getElementById("food-img").style.border = "transparent";

        document.getElementById("drink-img").style.background = "rgb(58 71 106)";
        document.getElementById("drink-img").style.border = "transparent";

        document.getElementById("other-img").style.background = "rgb(58 71 106)";
        document.getElementById("other-img").style.border = "transparent";
        
        document.getElementById("panier-img").style.backgroundColor = "rgb(62, 86, 148)";
        document.getElementById("panier-img").style.border = "2px solid rgb(245 245 245 / 69%)";
        
    });

    var foodd = document.getElementById("food-img");

    foodd.addEventListener("click", function() {
        $.post('https://yShop/eat', JSON.stringify({}));
        return
    });

    var drinkk = document.getElementById("drink-img");

    drinkk.addEventListener("click", function() {
        $.post('https://yShop/drink', JSON.stringify({}));
        return
    });

    
    var otherr = document.getElementById("other-img");

    otherr.addEventListener("click", function() {
        $.post('https://yShop/other', JSON.stringify({}));
        return
    });



    
    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type === "ui") {
            if (item.status == true) {
                display(true)
            } else {
                display(false)
            }
        }
        if (item.type === "panier") {
            document.getElementById("numberpanier").innerHTML = item.item;
        }
        if (item.type === "vider-panier") {
            const panvid = document.getElementById("cart-container")
            panvid.innerHTML = "";

            var itemName = document.createElement("h1");
            itemName.classList.add("titre-panier");
            itemName.textContent = "PANIER";
            panvid.appendChild(itemName);
            total =  0
        }
        
        
        if (item.type === "eat") {
            $(".item").show();
            $("#panier").hide();
            document.getElementById("drink-img").style.backgroundColor = "rgb(58 71 106)";
            document.getElementById("drink-img").style.border = "transparent";
            
            document.getElementById("other-img").style.background = "rgb(58 71 106)";
            document.getElementById("other-img").style.border = "transparent";

            document.getElementById("panier-img").style.background = "rgb(58 71 106)";
            document.getElementById("panier-img").style.border = "transparent";

            document.getElementById("food-img").style.backgroundColor = "rgb(62, 86, 148)";
            document.getElementById("food-img").style.border = "2px solid rgb(245 245 245 / 69%)";
            

            document.getElementById("shop").innerHTML = "";
            var shop = document.getElementById("shop");
            for (var i = 0; i < item.list.length; i++) {
                var itemDiv = document.createElement("div");
                itemDiv.classList.add("item-boxe");
                itemDiv.dataset.itemlabel= item.list[i].itemlabel;
                itemDiv.dataset.itemImg = item.list[i].photo;
                itemDiv.dataset.itemPrice = item.list[i].price;
                itemDiv.dataset.itemName = item.list[i].itemname;
                
          
                var itemauth = document.createElement("div");
                itemauth.classList.add("item-author");
                itemauth.dataset.itemlabel= item.list[i].itemlabel;
                itemauth.dataset.itemImg = item.list[i].photo;
                itemauth.dataset.itemPrice = item.list[i].price;
                itemauth.dataset.itemName = item.list[i].itemname;


                var itemPrice = document.createElement("h3");
                itemPrice.classList.add("price-item");
                itemPrice.textContent = "$" + item.list[i].price; 
                itemauth.appendChild(itemPrice);

                var itemImg = document.createElement("img");
                itemImg.src = item.list[i].photo;
                itemImg.classList.add("img-item");
                itemImg.classList.add("mystyle");
                itemauth.appendChild(itemImg);

                var itembody = document.createElement("div");
                itembody.classList.add("item-body");
                itembody.dataset.itemlabel= item.list[i].itemlabel;
                itembody.dataset.itemImg = item.list[i].photo;
                itembody.dataset.itemPrice = item.list[i].price;
                itembody.dataset.itemName = item.list[i].itemname;


                var itemName = document.createElement("h1");
                itemName.classList.add("name-item");
                itemName.textContent = item.list[i].itemlabel;
                itembody.appendChild(itemName);
          

                var input = document.createElement("input");
                input.classList.add("item-quantity-panier");
                input.placeholder = "";
                input.type = "number";
                input.min = 1;
                input.value = 1;
                itembody.appendChild(input);

                input.onchange = function() {
                    if (this.value > 50) {
                        this.value = 50;
                    }
                };
                

                var addButton = document.createElement("button");
                addButton.classList.add("item-add-panier");
                addButton.type = "submit";
                addButton.textContent = "Ajouter au panier";
                addButton.onclick = function() {
                    var itemlabel = this.parentNode.dataset.itemlabel;
                    var itemPrice = this.parentNode.dataset.itemPrice;
                    var itemImg = this.parentNode.dataset.itemImg;
                    var itemName = this.parentNode.dataset.itemName;
                   
                    var itemQuantity = parseInt(this.parentNode.querySelector("input[type='number']").value);
                   
                    $.post("https://yShop/addpanier", JSON.stringify({
                        label: itemlabel,
                        name: itemName,
                        price: itemPrice,
                        img: itemImg,
                        quantity: itemQuantity
                    }))
                    addpanier(itemlabel, itemPrice, itemQuantity, itemImg, itemName)

                }
                itemDiv.appendChild(itemauth);
                itemDiv.appendChild(itembody);
                itemDiv.appendChild(addButton);


          
                shop.appendChild(itemDiv);
            }
            $("#boire").show();
        }

        if (item.type === "drink") {
            $(".item").show();
            $("#panier").hide();
            document.getElementById("food-img").style.backgroundColor = "rgb(58 71 106)";
            document.getElementById("food-img").style.border = "transparent";

            document.getElementById("other-img").style.background = "rgb(58 71 106)";
            document.getElementById("other-img").style.border = "transparent";
            
            document.getElementById("panier-img").style.background = "rgb(58 71 106)";
            document.getElementById("panier-img").style.border = "transparent";

            document.getElementById("drink-img").style.background = "rgb(62, 86, 148)";
            document.getElementById("drink-img").style.border = "2px solid rgb(245 245 245 / 69%)";
            
            document.getElementById("shop").innerHTML = "";
            var shop = document.getElementById("shop");
          
            for (var i = 0; i < item.list.length; i++) {
                var itemDiv = document.createElement("div");
                itemDiv.classList.add("item-boxe");
                itemDiv.dataset.itemlabel= item.list[i].itemlabel;
                itemDiv.dataset.itemImg = item.list[i].photo;
                itemDiv.dataset.itemPrice = item.list[i].price;
                itemDiv.dataset.itemName = item.list[i].itemname;
                
          
                var itemauth = document.createElement("div");
                itemauth.classList.add("item-author");
                itemauth.dataset.itemlabel= item.list[i].itemlabel;
                itemauth.dataset.itemImg = item.list[i].photo;
                itemauth.dataset.itemPrice = item.list[i].price;
                itemauth.dataset.itemName = item.list[i].itemname;


                var itemPrice = document.createElement("h3");
                itemPrice.classList.add("price-item");
                itemPrice.textContent = "$" + item.list[i].price; 
                itemauth.appendChild(itemPrice);

                var itemImg = document.createElement("img");
                itemImg.src = item.list[i].photo;
                itemImg.classList.add("img-item");
                itemImg.classList.add("mystyle");
                itemauth.appendChild(itemImg);

                var itembody = document.createElement("div");
                itembody.classList.add("item-body");
                itembody.dataset.itemlabel= item.list[i].itemlabel;
                itembody.dataset.itemImg = item.list[i].photo;
                itembody.dataset.itemPrice = item.list[i].price;
                itembody.dataset.itemName = item.list[i].itemname;


                var itemName = document.createElement("h1");
                itemName.classList.add("name-item");
                itemName.textContent = item.list[i].itemlabel;
                itembody.appendChild(itemName);
          


                var input = document.createElement("input");
                input.classList.add("item-quantity-panier");
                input.placeholder = "Quantity";
                input.type = "number";
                input.min = 1;
                input.value = 1;
                itembody.appendChild(input);
                
                input.onchange = function() {
                    if (this.value > 50) {
                        this.value = 50;
                    }
                };
                


                var addButton = document.createElement("button");
                addButton.classList.add("item-add-panier");
                addButton.type = "submit";
                addButton.textContent = "Ajouter au panier";
                addButton.onclick = function() {
                    var itemlabel = this.parentNode.dataset.itemlabel;
                    var itemPrice = this.parentNode.dataset.itemPrice;
                    var itemImg = this.parentNode.dataset.itemImg;
                    var itemName = this.parentNode.dataset.itemName;
                   
                    var itemQuantity = parseInt(this.parentNode.querySelector("input[type='number']").value);
                   
                    $.post("https://yShop/addpanier", JSON.stringify({
                        label: itemlabel,
                        name: itemName,
                        price: itemPrice,
                        img: itemImg,
                        quantity: itemQuantity
                    }))
                    addpanier(itemlabel, itemPrice, itemQuantity, itemImg, itemName)

                }
                itemDiv.appendChild(itemauth);
                itemDiv.appendChild(itembody);
                itemDiv.appendChild(addButton);


          
                shop.appendChild(itemDiv);
            }
            $("#boire").show();
        }

        if (item.type === "other") {
            $(".item").show();
            $("#panier").hide();
        
            document.getElementById("food-img").style.backgroundColor = "rgb(58 71 106)";
            document.getElementById("food-img").style.border = "transparent";

            document.getElementById("drink-img").style.background = "rgb(58 71 106)";
            document.getElementById("drink-img").style.border = "transparent";

            document.getElementById("panier-img").style.background = "rgb(58 71 106)";
            document.getElementById("panier-img").style.border = "transparent";
            
            
            document.getElementById("other-img").style.backgroundColor = "rgb(62, 86, 148)";
            document.getElementById("other-img").style.border = "2px solid rgb(245 245 245 / 69%)";
            
            

            document.getElementById("shop").innerHTML = "";
            var shop = document.getElementById("shop");
          
            for (var i = 0; i < item.list.length; i++) {
                var itemDiv = document.createElement("div");
                itemDiv.classList.add("item-boxe");
                itemDiv.dataset.itemlabel= item.list[i].itemlabel;
                itemDiv.dataset.itemImg = item.list[i].photo;
                itemDiv.dataset.itemPrice = item.list[i].price;
                itemDiv.dataset.itemName = item.list[i].itemname;
                
          
                var itemauth = document.createElement("div");
                itemauth.classList.add("item-author");
                itemauth.dataset.itemlabel= item.list[i].itemlabel;
                itemauth.dataset.itemImg = item.list[i].photo;
                itemauth.dataset.itemPrice = item.list[i].price;
                itemauth.dataset.itemName = item.list[i].itemname;


                var itemPrice = document.createElement("h3");
                itemPrice.classList.add("price-item");
                itemPrice.textContent = "$" + item.list[i].price; 
                itemauth.appendChild(itemPrice);

                var itemImg = document.createElement("img");
                itemImg.src = item.list[i].photo;
                itemImg.classList.add("img-item");
                itemImg.classList.add("mystyle");
                itemauth.appendChild(itemImg);

                var itembody = document.createElement("div");
                itembody.classList.add("item-body");
                itembody.dataset.itemlabel= item.list[i].itemlabel;
                itembody.dataset.itemImg = item.list[i].photo;
                itembody.dataset.itemPrice = item.list[i].price;
                itembody.dataset.itemName = item.list[i].itemname;


                var itemName = document.createElement("h1");
                itemName.classList.add("name-item");
                itemName.textContent = item.list[i].itemlabel;
                itembody.appendChild(itemName);
          

                var input = document.createElement("input");
                input.classList.add("item-quantity-panier");
                input.placeholder = "Quantity";
                input.type = "number";
                input.min = 1;
                input.value = 1;
                itembody.appendChild(input);

                input.onchange = function() {
                    if (this.value > 50) {
                        this.value = 50;
                    }
                };
                

                var addButton = document.createElement("button");
                addButton.classList.add("item-add-panier");
                addButton.type = "submit";
                addButton.textContent = "Ajouter au panier";
                addButton.onclick = function() {
                    var itemlabel = this.parentNode.dataset.itemlabel;
                    var itemPrice = this.parentNode.dataset.itemPrice;
                    var itemImg = this.parentNode.dataset.itemImg;
                    var itemName = this.parentNode.dataset.itemName;
                   
                    var itemQuantity = parseInt(this.parentNode.querySelector("input[type='number']").value);
                   
                    $.post("https://yShop/addpanier", JSON.stringify({
                        label: itemlabel,
                        name: itemName,
                        price: itemPrice,
                        img: itemImg,
                        quantity: itemQuantity
                    }))
                    addpanier(itemlabel, itemPrice, itemQuantity, itemImg, itemName)

                }
                itemDiv.appendChild(itemauth);
                itemDiv.appendChild(itembody);
                itemDiv.appendChild(addButton);


          
                shop.appendChild(itemDiv);
            }
            $("#boire").show();
        }
          
        
    })

    document.onkeyup = function (data) {
        if (data.which == 27) {
            $("#boire").hide();
            $.post('https://yShop/exit', JSON.stringify({}));
            return
        }
    };
    $("tee").click(function () {
        $.post('https://yShop/exit', JSON.stringify({}));
        return
    })

    $("#eat-cate").click(function () {
        
        $.post('https://yShop/eat', JSON.stringify({}));
        return
    })


    $("#submit").click(function () {
        let inputValue = $("#input").val()
        if (inputValue.length >= 100) {
            $.post("https://yShop/error", JSON.stringify({
                error: "Input was greater than 100"
            }))
            return
        } else if (!inputValue) {
            $.post("https://yShop/error", JSON.stringify({
                error: "There was no value in the input field"
            }))
            return
        }
       
        $.post('https://yShop/main', JSON.stringify({
            text: inputValue,
        }));
        return;
    })
    $("#acht").click(function () {        
        
        var panItems = document.querySelectorAll('.panier-boxe');

        panItems.forEach(function(item) {

            var prr = item.dataset.panPrice * item.dataset.panQTY;
            var itemLabel = item.dataset.panLabel;
            var itemName = item.dataset.panName;
            var itemPrice = item.dataset.panPrice;
            var itemQty = item.dataset.panQTY;
            $.post('https://yShop/acht', JSON.stringify({
                label: itemLabel,
                name: itemName,
                price: itemPrice,
                quantity: itemQty,
                total: total
            }));
            return;
        });
        
        $(".acht").hide()
    })

    var total = 0

    function addpanier(label, price, qty, img, name) {        
    
        var paa = document.getElementById("cart-container");
        var prr = price * qty
        total = total + prr


        var itemDiv = document.createElement("div");
        itemDiv.classList.add("panier-boxe");
        itemDiv.dataset.panImg = img;
        itemDiv.dataset.panLabel = label;
        itemDiv.dataset.panName = name;
        itemDiv.dataset.panPrice = prr;
        itemDiv.dataset.panQTY = qty;
        itemDiv.dataset.total = total;


        var panierRec = document.createElement("div");
        panierRec.classList.add("panier-rectange");
        panierRec.dataset.panImg = img;
        panierRec.dataset.panLabel = label;
        panierRec.dataset.panName = name;
        panierRec.dataset.panPrice = prr;
        panierRec.dataset.panQTY = qty;
        panierRec.dataset.total = total;


        var PanierImg = document.createElement("img");
        PanierImg.src = img;
        PanierImg.classList.add("img-panier");
        panierRec.appendChild(PanierImg);


        var panierbody = document.createElement("div");
        panierbody.classList.add("panier-body");
        panierbody.dataset.panImg = img;
        panierbody.dataset.panLabel = label;
        panierbody.dataset.panName = name;
        panierbody.dataset.panPrice = prr;
        panierbody.dataset.panQTY = qty;

        var panLabel = document.createElement("h1");
        panLabel.classList.add("name-panier");
        panLabel.textContent = label;
        panierbody.appendChild(panLabel);


        

        var itemPrice = document.createElement("h3");
        itemPrice.classList.add("panier-prix");
        itemPrice.textContent = prr + "$"; 
        panierbody.appendChild(itemPrice);



        var panieraut = document.createElement("div");
        panieraut.classList.add("panieraut");
        panieraut.dataset.panImg = img;
        panieraut.dataset.panLabel = label;
        panieraut.dataset.panName = name;
        panieraut.dataset.panPrice = prr;
        panieraut.dataset.panQTY = qty;

        var panQTY = document.createElement("h3");
        panQTY.classList.add("panier-qty");
        panQTY.textContent = qty; 
       

        var addButton = document.createElement("button");
        addButton.classList.add("panier-supprimer");
        addButton.type = "submit";
        addButton.textContent = "X";
        addButton.onclick = function() {
            $.post("https://yShop/removepanier", JSON.stringify({
                quantity: qty
            }))

            total = total - prr

            itemDiv.remove();
            this.parentNode.remove(); 

        }
        panierRec.appendChild(panierbody);
        panierRec.appendChild(panieraut);
        

        itemDiv.appendChild(panierRec);

        

        panieraut.appendChild(panQTY);

        panieraut.appendChild(addButton);

  
        paa.appendChild(itemDiv);
    
    }
})


function test() {
    document.getElementById('panier').style.display = "block";
}

function increaseCount(a, b) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
  }
  
  function decreaseCount(a, b) {
    var input = b.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 1) {
      value = isNaN(value) ? 0 : value;
      value--;
      input.value = value;
    }
  }