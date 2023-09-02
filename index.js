// blog
const windowHandle = () =>{
    const blogLink ="blog.html";
    window.open(blogLink)
}

const handleCategory = async () =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await response.json();
    
    const tabContainer = document.getElementById("tab-container")
    data.data?.forEach((category) => {
        const div = document.createElement("div");

        div.innerHTML = `
        <button class="btn rounded" onclick="loadCard('${category.category_id}')">${category.category}</button>
        `
        tabContainer.appendChild(div);
        
    })
}

const loadCard = async (categoryId) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const videos = data.data;
    // displaycard(videos);


const cardContainer = document.getElementById('card-container')
cardContainer.innerHTML='';
// const displaycard = videos =>{
   if(videos.length === 0){
const div = document.createElement('div');
cardContainer.classList.remove('grid')
div.innerHTML =`
<div class="card card-compact  justify-center items-center">
<img src="Icon.png" alt="">
<h2 class="font-bold mt-5">Oops!! Sorry, There is no content here</h2>
   </div>
`;
cardContainer.appendChild(div)
}
else{

    videos?.forEach((items) =>{
        console.log(items)
        const div = document.createElement('div')
        cardContainer.classList.add('grid')
        div.classList = `
        card mb-10  bg-base-100 shadow-xl 
        `;
        div.innerHTML = `
        <figure ><img class="h-[200px] w-full" src="${items?.thumbnail || 'No item availbale' }" alt="thumbnail" /></figure>
        
        <div class="card-body">
        
        <div class="flex gap-4 font-bold  items-center">
         <img class="w-[50px] h-[50px] rounded-full" src="${items?.authors[0].profile_picture}" alt="profile picture">
      
        <h3>${items?.title}</h3>
    
    </div>
   
   <div class="flex gap-3  text-center  items-center">
    <h3 class="">${items?.authors[0].profile_name}</h3>
    <p> ${items?.authors[0].verified == "" || items?.authors[0].verified === false? '': 
'<img src="fi_10629607.svg " alt="">'} </p>
</div>
    <h2>${items?.others?.views}</h2>
          </div>
          
         
       
        `;
        cardContainer.appendChild(div)
    })
}
}
handleCategory()
loadCard('1000')




