// blog
const windowHandle = () =>{
    const blogLink ="blog.html";
    window.open(blogLink)
}

const handleCategory = async () =>{
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await response.json();
    const tabContainer = document.getElementById("tab-container")

    data.data?.forEach((category) => {
        const div = document.createElement("div");
       div.innerHTML = `
        <button class="btn rounded" onclick="loadCard('${category.category_id}')">${category.category}</button>
        `
        tabContainer.appendChild(div);
        
    });
}


let sorting;
const loadCard = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    sorting = data.data;
    displaycard(sorting);
}


const displaycard =(cardItems) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.textContent='';
    
    const blankContainer = document.getElementById('blank-container')
    blankContainer.textContent ='';



// const displaycard = videos =>{
   if(cardItems.length === 0){
const div = document.createElement('div');
// cardContainer.classList.remove('grid')
div.innerHTML =`
<div class="card mt-20 card-compact  justify-center items-center">
<img src="./image/Icon.png" alt="">
<h2 class="font-bold mt-5">Oops!! Sorry, There is no content here</h2>
   </div>
`;
blankContainer.appendChild(div);
}
else{
cardItems.forEach((items) => {
    const {thumbnail, title, authors, others } = items;
    let hours;
    let min;
    if (others.posted_date) {

        hours = Math.floor(others.posted_date / 3600) % 24
        min = Math.floor((others.posted_date % 3600) / 60)
    }

    
       
        const div = document.createElement('div')
        // cardContainer.classList.add('grid')
        div.classList = `
        card mb-10  bg-base-100 shadow-xl 
        `;
        div.innerHTML = `
        <div class =" relative"> 
        <figure ><img class="h-[200px] w-full  rounded-lg" src="${thumbnail}" alt="thumbnail" /></figure>
        <h2> ${others.posted_date ? `<h3 class=" bg-black px-2 py-1 text-white rounded-lg absolute bottom-2 right-2"> ${hours} Hrs ${min} Min ago </h3>` : ""} </h2>
        </div> 
        <div class="card-body">
        
        <div class="flex gap-4 font-bold  items-center">
         <img class="w-[50px] h-[50px] rounded-full" src="${authors[0].profile_picture}" alt="profile picture">
      
        <h3>${title}</h3>
    
    </div>
   
   <div class="flex gap-3  text-center  items-center">
    <h3 class="">${items?.authors[0].profile_name}</h3>
    <p> ${items?.authors[0].verified == "" || items?.authors[0].verified === false? '': 
'<img src="./image/fi_10629607.svg " alt="">'} </p>
</div>
    <h2>${items?.others?.views} views</h2>
          </div>
          
          
        `;
        cardContainer.appendChild(div)
    });
}
}
document.getElementById('sortBtn').addEventListener('click', function(){
    const sortBtn = sorting.sort((a, b) => {
        const x = parseFloat(a.others.views.slice(0, -1))
        const y = parseFloat(b.others.views.slice(0, -1))
        return y - x;
    
    })
    displaycard(sortBtn)
})


handleCategory()
loadCard('1000')




