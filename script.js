
  //variables to select elements
  
  const itemForm = document.getElementById('item-form');
  const itemInput = document.getElementById('item-input');
  const itemList = document.getElementById('item-list');
  const clearBtn = document.getElementById('clear');
  const itemFilter = document.getElementById('filter');



  // Function to add item

  function onAddItemSubmit(e){
    e.preventDefault();
    const newItem = itemInput.value;

  // Validate Input 

  if (newItem === ''){
    alert('Please add an item');
    return;

  }
    addItemToDom(newItem);
    addItemToLocalStorage(newItem);
    checkUI();

    // to clear input 
    itemInput.value = '';

}

  function addItemToDom(item){

    // Create List Item 

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // to add to listing
  
  itemList.appendChild(li);

  }

  function addItemToLocalStorage(newItem){
    let itemsFromStorage;

    if (localStorage.getItem('items') === null){
      itemsFromStorage = [];
    } else {
      itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

  // add item to array 

    itemsFromStorage.push(newItem);
  
  // add to local storage

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

  }

// function to get items from local storage

  function getItemsFromLocalStorage(){
    let itemsFromStorage;

    if (localStorage.getItem('items') === null){
      itemsFromStorage = [];
    } else {
      itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
  }

  function displayItems(){
    const items = getItemsFromLocalStorage();
    items.forEach((item) => addItemToDom(item));
    checkUI();
  }
// function to create button and icon

  function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
  }

  function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;

  }

  function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
      removeItem(e.target.parentElement.parentElement);
    } else {
      
    }
  }

//functions to remove items

  function removeItem(item){
    
      if (confirm('Are you sure?')){
        item.remove();
        removeItemFromStorage(item.textContent);
        checkUI();
      }
  }

  function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromLocalStorage();

    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

  }


  function clearItems() {
    if (confirm('Are you sure you want to clear all items?')) {
      while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
      }
      localStorage.removeItem('items');
      checkUI();
    }
  }


  function checkUI(){
    const items = itemList.querySelectorAll('li') // make sure this one is not on a global scope otherwise nodelist would be 0.
    if(items.length === 0){
      clearBtn.style.display = 'none';
      itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
    }
  }
  
// filter function
  
  function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
      const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1){
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
  
      }
    });
  }

  
// Event Listeners
  
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkUI();

  



  
