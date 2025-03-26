import React, {useState} from "react";
import NavBar from "./NavBar";
import { Image, Calendar, Carousel, TimePicker, Drawer, Button } from "antd"

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

// custom components:
export default function App() {

  const [open, setOpen] = useState(false);

  const onChange = currentSlide => {
    console.log(currentSlide);
  }

  const showDrawer = () => {
    setOpen(true);
  }

  const onClose = () => {
    setOpen(false);
  }

  return (
    <>
      <NavBar />

      <main className="min-h-screen max-w-[1000px] mt-24 mx-auto">
        <p>Put your design system components in the space below...</p>
        <h2 className="font-Comfortaa my-4 font-bold text-xl">
          Photo Gallery
        </h2>
        <div className="flex flex-wrap content-start">
          <Image
            src="https://picsum.photos/600/600?id=1"
            width={200}
          />
          <Image
            src="https://picsum.photos/600/600?id=2"
            width={200}
          />
          <Image
            src="https://picsum.photos/600/600?id=3"
            width={200}
          />
          <Image
            src="https://picsum.photos/600/600?id=4"
            width={200}
          />
          <Image
            src="https://picsum.photos/600/600?id=5"
            width={200}
          />
          <Image
            src="https://picsum.photos/600/600?id=6"
            width={200}
          />
          <Image
            src="https://picsum.photos/600/600?id=7"
            width={200}
          />
          <Image
            src="https://picsum.photos/600/600?id=8"
            width={200}
          />
          <Image
            src="https://picsum.photos/600/600?id=9"
            width={200}
          />
          <Image
            src="https://picsum.photos/600/600?id=10"
            width={200}
          />
        </div>

        <div>
          <h2 className="font-Comfortaa my-4 font-bold text-xl">
            Calendar
          </h2>
          <Calendar />
        </div>

        <div>
          <h2 className="font-Comfortaa my-4 font-bold text-xl">
            Carousel
          </h2>
          <Carousel afterChange={onChange} autoplay={{dotDuration:true}} autoplaySpeed={2500}>
            <div>
              <h3 style={contentStyle}>First slide</h3>
            </div>
            <div>
              <h3 style={contentStyle}>Second Slide</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3rd slide</h3>
            </div>
            <div>
              <h3 style={contentStyle}>fourth slide</h3>
            </div>
          </Carousel>
        </div>

        <div>
          <h2 className="font-Comfortaa my-4 font-bold text-xl">
            Timepicker
          </h2>
          <TimePicker size="large" use12Hours={true} status='error'/>
        </div>

        <div>
          <h2 className="font-Comfortaa my-4 font-bold text-xl">
            Drawer
          </h2>
          <Button buttonType="primary" onClick={showDrawer}>
            Open Drawer
          </Button>

          <Drawer title="Random Drawer" placement="right" onClose={onClose} open={open}>
            <p> This is a very important drawer</p>
            <p> it's wehre I make all my typos</p>
            <p> okay, see you later</p>
          </Drawer>

        </div>

      </main>

      <footer className="p-5 bg-white">footer goes here</footer>
    </>
  );
}
