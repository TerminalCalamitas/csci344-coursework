/* 
cat:  https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF.jpg
dog:  https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg
bird: https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/1200px-Eopsaltria_australis_-_Mogo_Campground.jpg
fish: https://thumbs-prod.si-cdn.com/n7Z82GD9Eav_CtpnzizNo66-dKc=/420x240/https://public-media.si-cdn.com/filer/d6/93/d6939718-4e41-44a8-a8f3-d13648d2bcd0/c3npbx.jpg'
*/


const showCat = (ev) => {
    // change #image-demo to show a cat
    console.log('update the image to show a cat!');
    document.querySelector('#image-demo').src = 'https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF.jpg';
};

const showDog = (ev) => {
    // your code here...
    console.log('update the image to show a dog!');
    document.querySelector('#image-demo').src = 'https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg'
    document.querySelector('#image-demo').alt = 'dog';
};

const showBird = (ev) => {
    // your code here...
    console.log('update the image to show a bird!');
    document.querySelector('#image-demo').src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/1200px-Eopsaltria_australis_-_Mogo_Campground.jpg'
    document.querySelector('#image-demo').alt = 'bird';
};

const showFish = (ev) => {
    // your code here...
    console.log('update the image to show a fish!');
    document.querySelector('#image-demo').src = 'https://public-media.si-cdn.com/filer/d6/93/d6939718-4e41-44a8-a8f3-d13648d2bcd0/c3npbx.jpg'
    document.querySelector('#image-demo').alt = 'fish';
};

const showDino = (ev) => {
  console.log('update the image to show a dino!');
  document.querySelector('#image-demo').src = 'https://imgs.search.brave.com/fR9h2L2orFtOihXiKykFauJHALIRZyjQvfAtvhYntx0/rs:fit:860:0:0:0/g:ce/aHR0cDovL2ltYWdl/cy5kaW5vc2F1cnBp/Y3R1cmVzLm9yZy8x/MDM4LVZlbG9jaXJh/cHRvcl8zMDNhLmpw/Zw'
  document.querySelector('#image-demo').alt = 'dino';
};

const showImage = (ev, link, name) => {
    // your code here...
    console.log('update the image to show a custom image!');
    document.querySelector('#image-demo').src = link;
    document.querySelector('#image-demo').alt = name;
};
