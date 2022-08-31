import React from "react";
import {Route,Link} from "react-router-dom"
import NavBar from "../Navbar";
import Slider from '@mui/material/Slider';
import Checkbox from "react-custom-checkbox";


export default function SliderBar(props){

    //variable used to change slider value and checkbox
    const[slide,setSlide]=React.useState({value:props.val, checked:true})

    //everytime slide change change info in Home Sliders
    React.useEffect(()=>{
        console.log(slide)
        props.change(props.name,slide)
    },[slide])

    //if slider change change slide.value
    const handleSlider = (newValue, event) => {
        console.log(newValue.target.value)
        setSlide({value:newValue.target.value, checked:slide.checked});
        console.log(slide)
        console.log(newValue)

      };

    //if checkbox toggled change slide.checked
    const handleCheck = (newValue, event) => {
        setSlide({value:slide.value, checked:newValue});
        console.log(slide)
        console.log(newValue)
    };



    return(
            <div className="sliderTest">
                <Checkbox className="checkBox" checked={true} onChange={handleCheck} style={{borderColor:"rgb(160, 50, 17)"}}></Checkbox>
                <Slider className="slider" disabled={!slide.checked} value={props.val} defaultValue={props.val} onChange={handleSlider} ></Slider>
                {/* <Slider className="slider" disabled={!slide.checked} value={props.val} defaultValue={props.val} color="rgb(21, 201, 21)" */}
                 {/* onChange={handleSlider}></Slider> */}
                <p className="sliderName">{props.name}</p>
            </div>
        )
}