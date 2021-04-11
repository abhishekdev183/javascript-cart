function getCartItems() {
    let totalPrice = 0;
    let cart_div = document.querySelector('.cart-div');
    let cartItems = JSON.parse(localStorage.getItem('js_cart'));
    cartItems.forEach((val) => {
        totalPrice += val.items[0].productPrice * val.items[0].productCount;
        let cartElement = document.createElement('div');
        let delbtn = document.createElement('button');
        let addOne = document.createElement('button');
        let RemoveOne = document.createElement('button');
        let addOneText = document.createTextNode('Add one')
        let RemoveOneText = document.createTextNode('Remove one')
        let delText = document.createTextNode('Delete');
        addOne.appendChild(addOneText);
        RemoveOne.appendChild(RemoveOneText);
        delbtn.appendChild(delText);
        RemoveOne.setAttribute('onclick', `removeOneItem('${val.items[0].productName}')`)
        addOne.setAttribute('onclick', `addToCart('${val.items[0].productName}',${val.items[0].productPrice})`)
        delbtn.setAttribute('onclick', `deleteCart('${val.items[0].productName}')`);
        let cartTextNode = document.createTextNode(`${val.items[0].productName} count : ${val.items[0].productCount}`);
        cartElement.appendChild(cartTextNode);
        cart_div.appendChild(cartElement);
        cart_div.appendChild(addOne);
        cart_div.appendChild(RemoveOne);
        cart_div.appendChild(delbtn);
    });
    let total = document.createElement('h3');
    let totalText = document.createTextNode(`total price is : ${totalPrice}`);
    total.appendChild(totalText);
    cart_div.appendChild(total);
}


function addToCart(name, price) {
    let cartArray = []
    let addCart = {
        items: [{
            productName: name,
            productPrice: price,
            productCount: 1
        }]
    };

    if (localStorage.getItem('js_cart')) {
        let oldCartItem = JSON.parse(localStorage.getItem('js_cart'))
        for (const key in oldCartItem) {
            if (Object.hasOwnProperty.call(oldCartItem, key)) {
                const ele = oldCartItem[key];
                console.log(ele.items[0].productName);
                if (ele.items[0].productName == addCart.items[0].productName) {
                    ele.items[0].productCount += 1;
                    let pushCount = JSON.stringify(oldCartItem);
                    localStorage.setItem('js_cart', pushCount);
location.reload();
                    return;
                }
            }
        }
        oldCartItem.push(addCart);
        let newCart = JSON.stringify(oldCartItem);
        localStorage.setItem('js_cart', newCart);

    } else {
        cartArray.push(addCart);
        let itemString = JSON.stringify(cartArray);
        localStorage.setItem('js_cart', itemString);
    }

}

function deleteCart(name) {
    let count = 0
    let oldCartItem = JSON.parse(localStorage.getItem('js_cart'));

    oldCartItem.forEach((val) => {
        if (val.items[0].productName == name) {
            oldCartItem.splice(count, 1);
            let deletedItem = JSON.stringify(oldCartItem);
            localStorage.setItem('js_cart', deletedItem);
        }
        count++;
    });
location.reload();
}

function removeOneItem(name) {
    let oldCartItem = JSON.parse(localStorage.getItem('js_cart'))
    for (const key in oldCartItem) {
        if (Object.hasOwnProperty.call(oldCartItem, key)) {
            const ele = oldCartItem[key];
            if (ele.items[0].productName == name) {

                if (ele.items[0].productCount <= 1) {
                    return false;
                } else {
                    ele.items[0].productCount -= 1;
                    let pushCount = JSON.stringify(oldCartItem);
                    localStorage.setItem('js_cart', pushCount);
location.reload();
                    return;
                }

            }
        }
    }

}


getCartItems();


