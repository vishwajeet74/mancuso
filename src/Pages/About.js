import React, { useEffect, useState } from 'react';
import '../Style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaCompass, FaDiagramProject, FaLightbulb, FaPaperPlane, } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import avtarimg from '../images/MancusoHeadshot.webp';
import Logosslide from './LogoSlider';
import { Button, Col, Nav, Row, Tab, Container, Image } from 'react-bootstrap';
import { TestimonialItems } from './Testimonialitems';
import axios from 'axios';


function About() {

    const [theme, setTheme] = useState("");
    const [bigavtar, setBigAvtar] = useState([]);
   
    useEffect(() => {
        axios.get("https://mancuso.ai/mancusov2/wp-json/v1/main_section")
            .then((resp) => {
                console.log(`Testing API`);
                console.log(resp.data[0].settings);
                setTheme(resp.data[0].settings);
                setBigAvtar(resp.data[0].settings.image.url)
            });
    }, []);

    const [whatwedo, setWhatwedo] = useState([]);

    useEffect(() => {
        axios.get("https://mancuso.ai/mancusov2/wp-json/v1/services")
            .then((resp) => {
                console.log(`What we do API`);
                console.log(resp.data);
                setWhatwedo(resp.data);
            });
    }, []);

    const [testimonials, setTestimonials] = useState([]); 

    useEffect(() => {
        axios.get("https://mancuso.ai/mancusov2/wp-json/v1/home_testimonial")
            .then((resp) => {
                console.log(`Testimonial API`);
                console.log(resp.data[0].settings.testimonials);
                setTestimonials(resp.data[0].settings.testimonials);
            });
    }, []);

    var settings = {
        dots: false,
        arrow: true,
        infinite: true,
        // speed: 1000,
        // autoplay: true,
        // loop: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <IoIosArrowForward />,
        prevArrow: <IoIosArrowBack />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrow: true,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };

    return (
        <div className='main_Content'>
            <div className='about_sections'>
                <section className='aboutme_section'>
                    <Row>
                        <Col md={6}>
                            <div className='leftimgbox' style={{ backgroundImage: `url(${bigavtar})` }}>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='rightContetnbox text-start'>

                                {theme.subtitles && theme.subtitles.length > 0 && (
                                    <div dangerouslySetInnerHTML={{ __html: theme.subtitles[0].subtitle }} />
                                )}

                                <h2 className="hp-main-title" dangerouslySetInnerHTML={{ __html: theme.title }}></h2>
                                <div dangerouslySetInnerHTML={{ __html: theme.text }}></div>
                                {/* <p>Would you like to schedule a virtual coffee? </p>
                                <p>Within my first six months, I increased value delivery by 3x to 6x at my last three companies—achieving record teammate satisfaction—without large-scale hiring, mass layoffs, or external consultants.</p>
                                <p>Leveraging 15+ years of experience, I have perfected a recipe that consistently achieves these results in both Fortune 500 companies and emerging companies alike. It has been effective in a wide array of industries: healthcare, finance, hospitality, legal services. </p>
                                <p>My teams have launched 15+ products, balancing external initiatives for growth and internal projects for efficiency—often targeting both. Wendy's saw 13x growth in digital ordering, while SmileMD eliminated 96% of calls through self-service. My recipe creates motivated teams with a unified vision and plan; enabling every member to passionately describe our product’s future, the steps to get there, and their role in that journey. </p>
                                <p>I have managed budgets of $10M+ and led teams of 80+ members, including engineering, product, design, business intelligence, IT, and customer service. </p>
                                <p>I am looking for a technology or product leadership position that allows me to stay in Orlando, FL. I am open to on-site, hybrid, or remote roles and willing to travel frequently.</p> */}
                                <div className="hp-buttons mt-4">
                                    {theme.buttons && theme.buttons.length > 0 && (
                                        <>
                                            <a href={theme.buttons[0].url} target="yes" className="custom_btn custom-primary me-2" dangerouslySetInnerHTML={{ __html: theme.buttons[0].button_title }}></a>
                                            <a href={theme.buttons[1].url} target="" className="custom_btn custom-secondary" dangerouslySetInnerHTML={{ __html: theme.buttons[1].button_title }}></a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>


                <section className='what_iDo text-start bg-white section_padding py-5'>
                    <h3 className='heading'>What I Do</h3>
                    <Row>
                        <Col md={6}>
                            <div className='info_box d-flex gap-4 py-3 pe-3'>
                                <div className='leftIcon'>
                                    <FaCompass />
                                </div>
                                <div className='infoContent'>
                                    {whatwedo && whatwedo.length > 0 && whatwedo[0].settings && (
                                        <>
                                            <h4 className='mt-1' dangerouslySetInnerHTML={{ __html: whatwedo[0].settings.title }}></h4>
                                            <p dangerouslySetInnerHTML={{ __html: whatwedo[0].settings.description }}></p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='info_box d-flex gap-4 py-3 pe-3'>
                                <div className='leftIcon'>
                                    <FaLightbulb />
                                </div>
                                <div className='infoContent'>
                                    {whatwedo && whatwedo.length > 0 && whatwedo[1].settings && (
                                        <>
                                          <h4 className='mt-1' dangerouslySetInnerHTML={{__html: whatwedo[1].settings.title}}></h4>
                                          <p dangerouslySetInnerHTML={{__html: whatwedo[1].settings.description}}></p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='info_box d-flex gap-4 py-3 pe-3'>
                                <div className='leftIcon'>
                                    <FaDiagramProject />
                                </div>
                                <div className='infoContent'>
                                    {whatwedo && whatwedo.length > 0 && whatwedo[2].settings && (
                                        <>
                                          <h4 className='mt-1' dangerouslySetInnerHTML={{__html: whatwedo[2].settings.title}}></h4>
                                          <p dangerouslySetInnerHTML={{__html: whatwedo[2].settings.description}}></p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='info_box d-flex gap-4 py-3 pe-3'>
                                <div className='leftIcon'>
                                    <FaPaperPlane />
                                </div>
                                <div className='infoContent'>
                                    {whatwedo && whatwedo.length > 0 && whatwedo[3].settings && (
                                        <>
                                          <h4 className='mt-1' dangerouslySetInnerHTML={{__html: whatwedo[3].settings.title}}></h4>
                                          <p dangerouslySetInnerHTML={{__html: whatwedo[3].settings.description}}></p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>

                <Logosslide />

                <section className='TestimonialSlider bg-white section_padding text-start py-5'>
                    <h3 className='heading'>Testimonials</h3>
                    <div className='SliderItems pb-4 pb-sm-5'>
                        <Slider {...settings}>
                            {
                                testimonials.map((items, key) => (
                                    <div className='Slider_Item' key={key}>
                                        <div className='disc_'>
                                            <p>{items.quote}</p>
                                        </div>
                                        <div className='testimonial_credits'>
                                            <p className='avtar_name'>{items.name}</p>
                                            <a href={items.link} className='desg'>{items.company}</a>
                                            <img className='sliderAvtar_' src={items.image.url} />
                                        </div>
                                    </div>

                                ))
                            }
                        </Slider>
                    </div>
                </section>
            </div>
        </div>

    )
}

export default About