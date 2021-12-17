import React from 'react'
import Slider from 'react-slick'
import { useLocation, Link} from "react-router-dom";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

  const sliderSettings = {
    slidesToShow: 6,
    slidesToScroll: 2,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  }

const Recommendations = (props) => {

    const handleReco = () => {
        props.setFetchingReco(false);
    }
    let s = 'No Recommendations'
    if (props.movieRecommendations.results?.length != 0) {
        console.log(props.movieRecommendations)
        s = 'Recommendations'
    }
    return (
        <>
            <h3>{s}</h3>
            <Slider {...sliderSettings}>
                {props.fetchingReco && props.movieRecommendations.results?.map((movie) => {
                    return (
                        <div className="slider">
                            <div className="recommendations">
                                <Link className="link" onClick={handleReco} to={{ pathname: `/${movie.id}` }}>
                                    <h5>{movie.original_title}</h5>
                                    <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt=''></img>
                                </Link>
                            </div>
                        </div>
                    )
                })
                }
            </Slider>
        </>
    )

}

export default Recommendations;